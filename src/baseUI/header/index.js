import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import style from '../../assets/global-style'

const HeaderContainer =styled.div`
  position:fixed;
  padding:10px 10px 5px 10px;
  height:40px;
  width:100%;
  display:flex;
  z-index:100;
  line-height:40px;
  color:${style['font-color-light']};
  .back{
    margin-right:5px;
    font-size:20px;
    width:20px;
  }
  .filter {
      position: absolute;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.2);
    }
  >h1{
    font-size:${style['font-size-l']};
    font-weight:700
  }
  .Marquee {
 width: 100%;
 height: 35px;
 overflow: hidden;
 position: relative;
 white-space: nowrap;
 }
 .text {
 position: absolute;
 animation: marquee 10s linear infinite;
 }
 @keyframes marquee {
 from {
 left: 100%;
 }
 to {
 left: -100%
 }
 }
 @keyframes marquee {
 from {
 transform: translateX(100%);
 }
 to {
 transform: translateX(-100%);
 }
 }


`

const Header =React.forwardRef((props,ref)=>{
  const { handleClick, title, isMarquee} = props;
  return(
    <HeaderContainer ref={ref}>
      <i className="iconfont back" onClick={handleClick}>&#xe655;</i>
      {isMarquee ? <div className='Marquee'><h1 className='text'>{title}</h1></div>:<h1>{title}</h1>}
      {isMarquee ? <div className='filter'></div>:null}
      
    </HeaderContainer>
  )


})


Header.defaultProps ={
  handleClick:()=>{},
  title:'标题',
  isMarquee: false
};


Header.propTypes={
  handleClick:PropTypes.func,
  title:PropTypes.string,
  isMarquee: PropTypes.bool
}

export default React.memo (Header);