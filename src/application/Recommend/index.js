import React, { useEffect } from 'react';
import Slider from '../../components/sliders';
import { connect } from "react-redux";
import * as actionTypes from './store/actionCreators';
import RecommendList from '../../components/list'
import Scroll from '../../baseUI/scoll';
import Loading from '../../baseUI/loading/index';

import { Content } from './style';
import { forceCheck } from 'react-lazyload';
import { renderRoutes } from 'react-router-config';

function Recommend (props){
  const { bannerList, recommendList,enterLoading,countRecommendList,currentSong} = props;


  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

  useEffect (() => {
    if (!bannerList.size){
      getBannerDataDispatch ();
    }
    if (!recommendList.size){
      getRecommendListDataDispatch ();
    }
    //eslint-disable-next-line
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS () : [];
  const recommendListJS = recommendList ? recommendList.toJS () :[];



  return (
    <Content play={currentSong.size?countRecommendList:0}>
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      {enterLoading?<Loading></Loading>:null}
      { renderRoutes (props.route.routes)}
    </Content> 
  );
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  // 不要在这里将数据 toJS
  // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  bannerList: state.getIn (['recommend', 'bannerList']),
  recommendList: state.getIn (['recommend', 'recommendList']),
  countRecommendList:state.getIn(['recommend', 'recommendList']).size,
  enterLoading: state.getIn (['recommend', 'enterLoading']),
  currentSong:state.getIn(['player','currentSong'])
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch () {
      dispatch(actionTypes.getBannerList ());
    },
    getRecommendListDataDispatch () {
      dispatch(actionTypes.getRecommendList ());
    },
    
  }
};

// 将 ui 组件包装成容器组件
export default connect (mapStateToProps, mapDispatchToProps)(React.memo (Recommend));