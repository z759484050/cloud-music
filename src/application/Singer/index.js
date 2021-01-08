import React,{useState,useRef,useEffect,useCallback} from 'react'
import {CSSTransition} from 'react-transition-group'
import {Container,ImgWrapper,CollectButton,SongListWrapper,BgLayer} from '../Singer/style'
import Header from '../../baseUI/header/index'
import Scroll from '../../baseUI/scoll/index'
import SongsList from '../SongList/index'
import { HEADER_HEIGHT } from "./../../api/config";
import {connect} from 'react-redux'
import Loading from "./../../baseUI/loading/index";
import {changeEnterLoading,getSingerInfo} from './store/actionCreaters'
import MusicNote from "../../baseUI/music-note/index";

function Singer(props){
// const id=props.match.params.id
const musicNoteRef = useRef();
const musicAnimation = (x, y) => {
  musicNoteRef.current.startAnimation({ x, y });
};
const [showStatus, setShowStatus] = useState(true);
const collectButton = useRef();
const imageWrapper = useRef();
const songScrollWrapper = useRef();
const songScroll = useRef ();
const header = useRef ();
const layer = useRef ();
// 图片初始高度
const initialHeight = useRef(0);
// 往上偏移的尺寸，露出圆角
const OFFSET = 5;
const { 
  artist: immutableArtist, 
  songs: immutableSongs, 
  loading,
  currentSong,
  countSongs
} = props;
const { getSingerDataDispatch } = props;

const artist = immutableArtist.toJS ();
const songs = immutableSongs.toJS ();

useEffect (() => {
  let h = imageWrapper.current.offsetHeight;
  songScrollWrapper.current.style.top = `${h - OFFSET}px`;
  initialHeight.current = h;
  // 把遮罩先放在下面，以裹住歌曲列表
  layer.current.style.top = `${h - OFFSET}px`;
  songScroll.current.refresh();

  const id = props.match.params.id;
  getSingerDataDispatch (id);
  //eslint-disable-next-line
}, []);


// eslint-disable-next-line
const handleScroll = useCallback(pos => {
  let height = initialHeight.current;
  const newY = pos.y;
  const imageDOM = imageWrapper.current;
  const buttonDOM = collectButton.current;
  const headerDOM = header.current;
  const layerDOM = layer.current;
  const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;

  // 指的是滑动距离占图片高度的百分比
  const percent = Math.abs (newY /height);

  if (newY > 0) {
    imageDOM.style["transform"] = `scale(${1 + percent})`;
    buttonDOM.style["transform"] = `translate3d (0, ${newY}px, 0)`;
    layerDOM.style.top = `${height - OFFSET + newY}px`;
  }
  else if (newY >= minScrollY) {
    layerDOM.style.top = `${height - OFFSET - Math.abs (newY)}px`;
    // 这时候保证遮罩的层叠优先级比图片高，不至于被图片挡住
    layerDOM.style.zIndex = 1;
    imageDOM.style.paddingTop = "75%";
    imageDOM.style.height = 0;
    imageDOM.style.zIndex = -1;
    // 按钮跟着移动且渐渐变透明
    buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
    buttonDOM.style["opacity"] = `${1 - percent * 2}`;
  }
  else if (newY < minScrollY) {
    // 往上滑动，但是超过 Header 部分
    layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
    layerDOM.style.zIndex = 1;
    // 防止溢出的歌单内容遮住 Header
    headerDOM.style.zIndex = 100;
    // 此时图片高度与 Header 一致
    imageDOM.style.height = `${HEADER_HEIGHT}px`;
    imageDOM.style.paddingTop = 0;
    imageDOM.style.zIndex = 99;
  } 

})



  const goback=()=>{
    setShowStatus(false)
  }

  return(
    <CSSTransition
    in={showStatus}
    timeout={300}
    classNames="fly"
    appear={true}
    unmountOnExit
    onExited={() => props.history.goBack ()}
    >
<Container play={currentSong.size?countSongs:0}>
  <Header
    handleClick={goback}
    title={artist.name}
    ref={header}
  ></Header>
  <ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
    <div className="filter"></div>
  </ImgWrapper>
  <CollectButton ref={collectButton}>
    <i className="iconfont">&#xe62d;</i>
    <span className="text"> 收藏 </span>
  </CollectButton>
  <BgLayer ref={layer}></BgLayer>
  <SongListWrapper ref={songScrollWrapper}>
    <Scroll onScroll={handleScroll} ref={songScroll}>
      <SongsList
        songs={songs}
        showCollect={false}
        musicAnimation={musicAnimation}
      ></SongsList>
    </Scroll>
  </SongListWrapper>
  { loading ? (<Loading></Loading>) : null}
  <MusicNote ref={musicNoteRef}></MusicNote>
</Container>

    </CSSTransition>

   
  )
}



const mapStateToProps = state => {
  return ({
    artist: state.getIn (["singerInfo", "singer"]),
    songs: state.getIn (["singerInfo", "songsOfSinger"]),
    countSongs:state.getIn (["singerInfo", "songsOfSinger"]).size,
    loading: state.getIn (["singerInfo", "loading"]),
    currentSong:state.getIn(['player','currentSong'])
  });
}
// 映射 dispatch 到 props 上
const mapDispatchToProps = dispatch => {
  return {
    getSingerDataDispatch (id) {
      dispatch (changeEnterLoading (true));
      dispatch (getSingerInfo(id));
    }
  };
};

// 将 ui 组件包装成容器组件
export default connect (mapStateToProps,mapDispatchToProps)(React.memo (Singer));