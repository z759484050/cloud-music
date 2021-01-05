import React,{useEffect} from 'react';
import {connect} from 'react-redux'
import {getRankList} from './store/index'
import { filterIndex} from '../../api/until';
import Scroll from '../../baseUI/scoll/index'
import {
  List, 
  ListItem,
  SongList,
  Container,
  EnterLoading
} from './style';
import Loading from '../../baseUI/loading/index'
import { renderRoutes } from 'react-router-config';
function Rank (props) {
  const { rankList:list, loading } = props;

  const { getRankListDataDispatch } = props;



  let rankList = list ? list.toJS() : [];

  useEffect(() => {
    if(!rankList.length){
      getRankListDataDispatch();
    }
    // eslint-disable-next-line
  }, []);

  let globalStartIndex = filterIndex(rankList);
  let officialList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex);
  


const enterDetail = (detail) => {
  props.history.push (`/rank/${detail.id}`)
}
const renderSongList = (list) => {
  return list.length ? (
    <SongList>
      {
        list.map((item, index) => {
          return <li key={index}>{index+1}. {item.first} - {item.second}</li>
        })
      }
    </SongList>
  ) : null;
}
const renderRankList = (list, global) => {
  return (
    <List globalRank={global}>
     {
      list.map((item,index) => {
        return (
          <ListItem key={index} tracks={item.tracks} onClick={() => enterDetail(item)}>
            <div className="img_wrapper">
              <img src={item.coverImgUrl} alt=""/>
              <div className="decorate"></div>
              <span className="update_frequecy">{item.updateFrequency}</span>
            </div>
            { renderSongList(item.tracks)  }
          </ListItem>
        )
     })
    } 
    </List>
  )
}

let displayStyle = loading ? {"display":"none"}:  {"display": ""};
return (
  <Container>
    <Scroll>
      <div>
        <h1 className="offical" style={displayStyle}>官方榜</h1>
          { renderRankList(officialList) }
        <h1 className="global" style={displayStyle}>全球榜</h1>
          { renderRankList(globalList, true) }
        { loading ? <EnterLoading><Loading></Loading></EnterLoading> : null }
      </div>
    </Scroll> 
    {renderRoutes(props.route.routes)}
  </Container>
  );
}




const mapStateToProps = (state) => {
  return {
    rankList: state.getIn (['rank', 'rankList']),
    loading: state.getIn (['rank', 'loading']),
  };
  
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDataDispatch () {
      dispatch (getRankList ());
    }
  }
};

export default connect (mapStateToProps, mapDispatchToProps)(React.memo (Rank));