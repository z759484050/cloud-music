import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import {
  changeCurrentIndex,
  changeCurrentSong,
  changeFullScreen,
  changePlayList,
  changePlayMode,
  changePlayingState,
  changeShowPlayList,
} from './store/actionCreators'
import MiniPlayer from './MIniPlayer/index'
import NormalPlayer from './NormalPlayer/index'
import { getSongUrl, isEmptyObject, shuffle, findIndex } from '../../api/until'
import Toast from "./../../baseUI/Toast/index";
import { playMode } from '../../api/config'
import PlayList from '../../components/playList/index'
import Lyric from '../../api/lyric'
import { getLyricRequest } from '../../api/request'

function Player(props) {
  const { fullScreen, playing, currentIndex, currentSong: immutableCurrentSong, playList: myplaylist, sequencePlayList: immutableSequencePlayList, mode } = props
  const { changeCurrentIndexDispatch, changeCurrentDispatch, togglePlayingDispatch, toggleFullScreenDispatch, changePlayListDispatch, changeModeDispatch, togglePlayListDispatch } = props
  const playList = myplaylist ? myplaylist.toJS() : []
  const sequencePlayList = immutableSequencePlayList ? immutableSequencePlayList.toJS() : []
  const currentSong = immutableCurrentSong.toJS();
  const audioRef = useRef();
  const [preSong, setPreSong] = useState({});
  //目前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  //歌曲总时长

  const [duration, setDuration] = useState(0);
  //歌曲播放进度
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;


  const [modeText, setModeText] = useState("");
  const toastRef = useRef()




  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id ||
      !songReady
    )
      return;
    let current = playList[currentIndex];
    setPreSong(current);
    setSongReady(false);
    changeCurrentDispatch(current);//赋值currentSong
    audioRef.current.src = getSongUrl(current.id);
    setTimeout(() => {
      audioRef.current.play().then(() => {
        setSongReady(true);
      });
    });
    togglePlayingDispatch(true);//播放状态
    getLyric(current.id);
    setCurrentTime(0);//从头开始播放
    setDuration((current.dt / 1000) | 0);//时长
    // eslint-disable-next-line
  }, [playList, currentIndex]);


  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);
  const updatetime = e => {
    setCurrentTime(e.target.currentTime)
  }
  const onProgressChange = curPercent => {
    const newTime = curPercent * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    if (!playing) {
      togglePlayingDispatch(true);
    }
    if (currentLyric.current) {
      currentLyric.current.seek(newTime * 1000);
    }
  };


  //一首歌循环
  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    togglePlayingDispatch(true);
    audioRef.current.play();
  };

  const handlePrev = () => {
    //播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex - 1;
    if (index < 0) index = playList.length - 1;
    if (!playing) togglePlayingDispatch(true);
    changeCurrentIndexDispatch(index);
  };

  const handleNext = () => {
    //播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex + 1;
    if (index === playList.length) index = 0;
    if (!playing) togglePlayingDispatch(true);
    changeCurrentIndexDispatch(index);

  };


  const changeMode = () => {
    console.log(mode);
    let newMode = (mode + 1) % 3;
    console.log(newMode);
    if (newMode === 0) {
      //顺序模式
      changePlayListDispatch(sequencePlayList);
      let index = findIndex(currentSong, sequencePlayList);
      changeCurrentIndexDispatch(index);
      setModeText("顺序循环");
    } else if (newMode === 1) {
      //单曲循环
      changePlayListDispatch(sequencePlayList);
      setModeText("单曲循环");

    } else if (newMode === 2) {
      //随机播放
      let newList = shuffle(sequencePlayList);
      let index = findIndex(currentSong, newList);
      changePlayListDispatch(newList);
      changeCurrentIndexDispatch(index);
      setModeText("随机播放");
    }
    changeModeDispatch(newMode);
    toastRef.current.show();
  };
  //播放结束
  const handleEnd = () => {
    if (mode === playMode.loop) {
      handleLoop()
    } else {
      handleNext()
    }
  }
  //点击事件
  const clickPlaying = (e, data) => {
    e.stopPropagation();
    togglePlayingDispatch(data)
    if (currentLyric.current) {
      currentLyric.current.togglePlay(currentTime * 1000);
    }
  }



  //获取歌词
  const currentLyric = useRef();
  const [currentPlayingLyric, setPlayingLyric] = useState("");
  const currentLineNum = useRef(0);
  const [songReady, setSongReady] = useState(true);

  const handleLyric = ({ lineNum, txt }) => {
    if (!currentLyric.current) return;
    currentLineNum.current = lineNum;
    setPlayingLyric(txt);
  };

  const getLyric = id => {
    let lyric = "";
    if (currentLyric.current) {
      currentLyric.current.stop();
    }
    // 避免 songReady 恒为 false 的情况
    getLyricRequest(id)
      .then(data => {
        lyric = data.lrc.lyric;
        if (!lyric) {
          currentLyric.current = null;
          return;
        }
        currentLyric.current = new Lyric(lyric, handleLyric);
        currentLyric.current.play();
        currentLineNum.current = 0;
        currentLyric.current.seek(0);
      })
      .catch(() => {
        songReady.current = true;
        audioRef.current.play();
      });
  };






  return (
    <div>
      {isEmptyObject(currentSong) ? null :
        <MiniPlayer
          song={currentSong}
          fullScreen={fullScreen}
          playing={playing}
          toggleFullScreen={toggleFullScreenDispatch}
          clickPlaying={clickPlaying}
          togglePlayList={togglePlayListDispatch}
          percent={percent}></MiniPlayer>}
      {isEmptyObject(currentSong) ? null :
        <NormalPlayer
          song={currentSong}
          percent={percent}
          fullScreen={fullScreen}
          playing={playing}
          toggleFullScreen={toggleFullScreenDispatch}
          clickPlaying={clickPlaying}
          duration={duration}
          currentTime={currentTime}
          onProgressChange={onProgressChange}
          handlePrev={handlePrev}
          handleNext={handleNext}
          mode={mode}
          changeMode={changeMode}
          togglePlayList={togglePlayListDispatch}
          currentLyric={currentLyric.current}
          currentPlayingLyric={currentPlayingLyric}
          currentLineNum={currentLineNum.current}

        ></NormalPlayer>}

      <audio ref={audioRef} onTimeUpdate={updatetime} onEnded={handleEnd}></audio>
      <Toast text={modeText} ref={toastRef}></Toast>
      <PlayList></PlayList>
    </div>
  )
}

const mapStateToProps = state => ({
  fullScreen: state.getIn(["player", "fullScreen"]),
  playing: state.getIn(["player", "playing"]),
  currentSong: state.getIn(["player", "currentSong"]),
  showPlayList: state.getIn(["player", "showPlayList"]),
  mode: state.getIn(["player", "mode"]),
  currentIndex: state.getIn(["player", "currentIndex"]),
  playList: state.getIn(["player", "playList"]),
  sequencePlayList: state.getIn(["player", "sequencePlayList"])
});


const mapDispatchToProps = dispatch => {
  return {
    togglePlayingDispatch(data) {
      dispatch(changePlayingState(data));
    },
    toggleFullScreenDispatch(data) {
      dispatch(changeFullScreen(data));
    },
    togglePlayListDispatch(data) {
      dispatch(changeShowPlayList(data));
    },
    changeCurrentIndexDispatch(index) {
      dispatch(changeCurrentIndex(index));
    },
    changeCurrentDispatch(data) {
      dispatch(changeCurrentSong(data));
    },
    changeModeDispatch(data) {
      dispatch(changePlayMode(data));
    },
    changePlayListDispatch(data) {
      dispatch(changePlayList(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Player));