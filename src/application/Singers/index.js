import React, {useEffect,useContext} from 'react';
import Horizen from '../../baseUI/horizen-item';
import {renderRoutes} from 'react-router-config'
import { categoryTypes, alphaTypes,categoryArea} from '../../api/config';
import { 
  NavContainer,
  ListContainer,
  List,
  ListItem,
} from "./style";
import { 
  getSingerList, 
  getHotSingerList, 
  changeEnterLoading, 
  changePageCount, 
  refreshMoreSingerList, 
  changePullUpLoading, 
  changePullDownLoading, 
  refreshMoreHotSingerList 
} from './store/actionCreators';
import Scroll from './../../baseUI/scoll/index';
import {connect} from 'react-redux';
import Loading from '../../baseUI/loading/index'
import LazyLoad,{forceCheck}from 'react-lazyload';
import { CHANGE_ALPHA, CHANGE_CATEGORY,CHANGE_AREA,SingerListContext } from './data';

function Singers (props) {

  const {enterLoading, pullUpLoading, pullDownLoading, pageCount } = props;

  const { getHotSingerDispatch, updateDispatch, pullDownRefreshDispatch, pullUpRefreshDispatch } = props;
  let {singerList}=props
  singerList = singerList ? singerList.toJS () : [];

  const {data,dispatch}=useContext(SingerListContext)
  const {category,area,alpha}=data.toJS()

  useEffect(() => {
    
    if(!singerList.length){

      getHotSingerDispatch()
    }
    
    

    // eslint-disable-next-line  
  },[])

  let handleUpdateCatetory = (val) => {
    dispatch({type:CHANGE_CATEGORY,data:val})
    updateDispatch(val,area,alpha);
  };
    let handleUpdateArea = (val) => {
  dispatch({type:CHANGE_AREA,data:val})
    updateDispatch(category,val,alpha);
  };
  let handleUpdateAlpha = (val) => {
    dispatch({type:CHANGE_ALPHA,data:val})
    updateDispatch(category,area,val);
  };
  


  



const handlePullUp = () => {
  pullUpRefreshDispatch (category,area,alpha,category === '', pageCount);
};

const handlePullDown = () => {
  pullDownRefreshDispatch (category,area,alpha);
};


const enterDeail=(id)=>{
  props.history.push (`/singers/${id}`);
}
  const renderSingerList = () => {
    return (
      <List>
        {
          singerList.map ((item, index) => {
            return (
              <ListItem key={item.accountId+""+index} onClick={()=>enterDeail(item.id)}>
                <div className="img_wrapper">
                <LazyLoad placeholder={<img width="100%" height="100%" src={require ('./singer.png').default} alt="music"/>}>
                  <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                </div>
                <span className="name">{item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  };
  return (
    <div>
      <NavContainer>
        <Horizen 
          list={categoryTypes} 
          title={"分类 (默认热门):"} 
          handleClick={(val) => handleUpdateCatetory (val)} 
          oldVal={category}></Horizen>
        <Horizen 
          list={categoryArea} 
          handleClick={(val) => handleUpdateArea (val)} 
          oldVal={area}></Horizen>
        <Horizen 
          list={alphaTypes} 
          title={"首字母:"} 
          handleClick={val => handleUpdateAlpha (val)} 
          oldVal={alpha}></Horizen>
      </NavContainer> 
      <ListContainer>
      {enterLoading?<Loading></Loading>:null}
        <Scroll
        onScroll={forceCheck}
        pullUp={ handlePullUp }
        pullDown = { handlePullDown }
        pullUpLoading = { pullUpLoading }
        pullDownLoading = { pullDownLoading }>
          { renderSingerList () }
        </Scroll>
      </ListContainer>

      { renderRoutes (props.route.routes) }
    </div>
  )
}
const mapStateToProps = (state) => {

 return ({
    singerList: state.getIn(["singer", "singerList"]),
    enterLoading: state.getIn(["singer", 'enterLoading']),
    pullUpLoading: state.getIn(['singer', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singer', 'pullDownLoading']),
    pageCount: state.getIn(['singer', 'pageCount'])
  });
}

const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    updateDispatch(category,area,alpha) {
      dispatch(changePageCount(0));//由于改变了分类，所以pageCount清零
      dispatch(changeEnterLoading(true));//loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
      dispatch(getSingerList(category,area,alpha));
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(category,area,alpha, hot, count) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count+1));
      if(hot){
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category,area,alpha));
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category,area,alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0));//属于重新获取数据
      if(category === '' && alpha === ''){
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(category,area,alpha));
      }
    }
  }
};   
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));