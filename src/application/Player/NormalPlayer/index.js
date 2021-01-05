import React, { useRef } from 'react'
import { getName } from "../../../api/until";
import { CSSTransition } from 'react-transition-group'
import animations from "create-keyframe-animation";
import { _getPosAndScale } from '../../../api/until'
import {
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,
  ProgressWrapper
} from "./style";
import { prefixStyle } from "../../../api/until";
import ProgressBar from '../../../baseUI/progressBar/index'
function NormalPlayer(props) {
  const { song, fullScreen, toggleFullScreen } = props;
  const normalPlayerRef = useRef()
  const CDWrapperRef = useRef()
  const transform = prefixStyle("transform");
  const enter = () => {
    normalPlayerRef.current.style.display = "block";
    const { x, y, scale } = _getPosAndScale();// 获取 miniPlayer 图片中心相对 normalPlayer 唱片中心的偏移
    let animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
      },
      60: {
        transform: `translate3d(0, 0, 0) scale(1.1)`
      },
      100: {
        transform: `translate3d(0, 0, 0) scale(1)`
      }
    };
    animations.registerAnimation({
      name: "move",
      animation,
      presets: {
        duration: 400,
        easing: "linear"
      }
    });
    animations.runAnimation(CDWrapperRef.current, "move");
  };
  const afterEnter = () => {
    // 进入后解绑帧动画
    const cdWrapperDom = CDWrapperRef.current;
    animations.unregisterAnimation("move");
    cdWrapperDom.style.animation = "";
  };

  const leave = () => {
    if (!CDWrapperRef.current) return;
    const cdWrapperDom = CDWrapperRef.current;
    cdWrapperDom.style.transition = "all 0.4s";
    const { x, y, scale } = _getPosAndScale();
    cdWrapperDom.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  };

  const afterLeave = () => {
    if (!CDWrapperRef.current) return;
    const cdWrapperDom = CDWrapperRef.current;
    cdWrapperDom.style.transition = "";
    cdWrapperDom.style[transform] = "";
    // 一定要注意现在要把 normalPlayer 这个 DOM 给隐藏掉，因为 CSSTransition 的工作只是把动画执行一遍 
    // 不置为 none 现在全屏播放器页面还是存在
    normalPlayerRef.current.style.display = "none";
  };

  return (
    <CSSTransition
      classNames="normal"
      in={fullScreen}
      timeout={400}
      onEnter={enter}
      onEntered={afterEnter}
      onExit={leave}
      onExited={afterLeave}

    >
      <NormalPlayerContainer ref={normalPlayerRef}>
        <div className="background">
          <img
            src={song.al.picUrl + "?param=300x300"}
            width="100%"
            height="100%"
            alt="歌曲图片"
          />
        </div>
        <div className="background layer"></div>
        <Top className="top">
          <div className="back" onClick={() => toggleFullScreen(false)}>
            <i className="iconfont icon-back">&#xe662;</i>
          </div>
          <h1 className="title">{song.name}</h1>
          <h1 className="subtitle">{getName(song.ar)}</h1>
        </Top>
        <Middle ref={CDWrapperRef}>
          <CDWrapper>
            <div className="cd">
              <img
                className="image play"
                src={song.al.picUrl + "?param=400x400"}
                alt=""
              />
            </div>
          </CDWrapper>
        </Middle>

        <Bottom className="bottom">
          <ProgressWrapper>
            <span className="time time-l">0:00</span>
            <div className="progress-bar-wrapper">
              <ProgressBar percent={0.2}></ProgressBar>
            </div>
            <div className="time time-r">4:17</div>
          </ProgressWrapper>
          <Operators>
            <div className="icon i-left" >
              <i className="iconfont">&#xe625;</i>
            </div>
            <div className="icon i-left">
              <i className="iconfont">&#xe6e1;</i>
            </div>
            <div className="icon i-center">
              <i className="iconfont">&#xe723;</i>
            </div>
            <div className="icon i-right">
              <i className="iconfont">&#xe718;</i>
            </div>
            <div className="icon i-right">
              <i className="iconfont">&#xe640;</i>
            </div>
          </Operators>
        </Bottom>
      </NormalPlayerContainer>
    </CSSTransition>

  );
}
export default React.memo(NormalPlayer);