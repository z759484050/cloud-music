import styled from'styled-components';
import style from '../../assets/global-style';

export const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 10px;
  margin: 10px;
  border-radius: 10px;
  background-color: #ffffff;
  &>span {
    line-height: 40px;
    color: #f1f1f1;
    font-size: 20px;
    &.iconfont {
      font-size: 25px;
    }
  }
`
export const Tab=styled.div`
  height:44px;
  display:flex;
  justify-content:space-around;
  background-color: #ffffff;
  line-height: 39px;
  padding: 5px 10px;
  margin: 10px;
  border-radius: 10px;
  a{
    /* flex:1;
    padding:2px 0;
    font-size:14px; */
    color:#e4e4e4;
    &.active{
      span{
        padding:3px 0;
        font-weight:700;
        color:#f1f1f1;
        border-bottom:2px solid #f1f1f1;
      }
    }
  }
// `
// export const TabItem = styled.div`
//   height: 100%;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
// `