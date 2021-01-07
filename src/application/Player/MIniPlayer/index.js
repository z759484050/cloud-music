import React,{useRef}from 'react'
import {MiniPlayerContainer} from './style'
import {getName} from '../../../api/until'
import {CSSTransition} from 'react-transition-group'
import ProgressCircle from '../../../baseUI/progress-circle'
function MiniPlayer(props){
  const { song,fullScreen,toggleFullScreen,togglePlaying,playing,percent,togglePlayList} = props;
  const miniPlayerRef = useRef();
  const handleTogglePlayList = (e) => {
  
    togglePlayList(true);
    e.stopPropagation ();
  };
  return(
    <CSSTransition
    in={!fullScreen} 
    timeout={400} 
    classNames="mini"
    onEnter={() => {
      miniPlayerRef.current.style.display = "flex";
    }}
    onExited={() => {
      miniPlayerRef.current.style.display = "none";
    }}> 
      <MiniPlayerContainer ref={miniPlayerRef} >
    <div className="icon" onClick={()=>toggleFullScreen(true)}>
      <div className="imgWrapper">
        <img className={`play ${playing ? "": "pause"}`} src={song.al.picUrl} width="40" height="40" alt="img"/>
      </div>
    </div>
    <div className="text">
      <h2 className="name">{song.name}</h2>
      <p className="desc">{getName(song.ar)}</p>
    </div>
    <div className="control">
    <ProgressCircle radius={32} percent={percent}>
    { playing ? 
    <i className="icon-mini iconfont icon-pause" onClick={() => togglePlaying(false)}>&#xe650;</i>
    :
    <i className="icon-mini iconfont icon-play" onClick={() => togglePlaying(true)}>&#xe61e;</i> 
  }
    </ProgressCircle>
    </div>
    <div className="control" onClick={handleTogglePlayList}>
      <i className="iconfont">&#xe640;</i>
    </div>
  </MiniPlayerContainer>

    </CSSTransition>
    
  )
}

export default React.memo(MiniPlayer)