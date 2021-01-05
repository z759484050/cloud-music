import React,{useState,useEffect,useRef} from 'react'
import {connect} from 'react-redux'
import {
  changeCurrentIndex,
  changeCurrentSong,
  changeFullScreen,
  changePlayList,
  changePlayMode,
  changePlayingState,
  // changeSequecePlayList,
  changeShowPlayList,
} from './store/actionCreators'
import MiniPlayer from './MIniPlayer/index'
import NormalPlayer from './NormalPlayer/index'
import { playList } from '../../api/config'
import {getSongUrl,isEmptyObject} from '../../api/until'



function Player(props) {
  // eslint-disable-next-line
const {fullScreen,playing,currentIndex, currentSong:immutableCurrentSong}=props
const {changeCurrentIndexDispatch, changeCurrentDispatch,togglePlayingDispatch,toggleFullScreenDispatch}=props
const audioRef = useRef();
  //目前播放时间
const [currentTime, setCurrentTime] = useState(0);
//歌曲总时长
const [duration, setDuration] = useState(0);
//歌曲播放进度
let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

let currentSong = immutableCurrentSong.toJS();


useEffect(()=>{
  if(!currentSong) return;
  changeCurrentIndexDispatch(0);
  let current =playList[0];
  changeCurrentDispatch(current);
  audioRef.current.src = getSongUrl(current.id);
  setTimeout(() => {
    audioRef.current.play();
  });
  togglePlayingDispatch(true);//播放状态
  setCurrentTime(0);//从头开始播放
  setDuration((current.dt / 1000) | 0);//时长
  // eslint-disable-next-line
},[])
  return (
    <div>
      {isEmptyObject(currentSong)?null:
      <MiniPlayer song={currentSong} 
      fullScreen={fullScreen}
      playing={playing} 
      toggleFullScreen={toggleFullScreenDispatch}
       togglePlaying={togglePlayingDispatch}
       percent={percent}></MiniPlayer>}
      {isEmptyObject(currentSong)?null:
      <NormalPlayer song={currentSong}
      percent={percent} 
      fullScreen={fullScreen}
      playing={playing}  
      toggleFullScreen={toggleFullScreenDispatch}
      togglePlaying={togglePlayingDispatch}
      ></NormalPlayer>}
      
      <audio ref={audioRef}></audio>
    </div>
  )
}

const mapStateToProps = state => ({
  fullScreen: state.getIn (["player", "fullScreen"]),
  playing: state.getIn (["player", "playing"]),
  currentSong: state.getIn (["player", "currentSong"]),
  showPlayList: state.getIn (["player", "showPlayList"]),
  mode: state.getIn (["player", "mode"]),
  currentIndex: state.getIn (["player", "currentIndex"]),
  playList: state.getIn (["player", "playList"]),
  sequencePlayList: state.getIn (["player", "sequencePlayList"])
});

const mapDispatchToProps = dispatch => {
  return {
    togglePlayingDispatch (data) {
      dispatch (changePlayingState (data));
    },
    toggleFullScreenDispatch (data) {
      dispatch (changeFullScreen (data));
    },
    togglePlayListDispatch (data) {
      dispatch (changeShowPlayList (data));
    },
    changeCurrentIndexDispatch (index) {
      dispatch (changeCurrentIndex (index));
    },
    changeCurrentDispatch (data) {
      dispatch (changeCurrentSong (data));
    },
    changeModeDispatch (data) {
      dispatch (changePlayMode (data));
    },
    changePlayListDispatch (data) {
      dispatch (changePlayList (data));
    }
  };
};

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(React.memo (Player));