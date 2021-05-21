import React, { useState, useEffect, useCallback,useRef} from 'react'
import { CSSTransition } from 'react-transition-group'
import { Container, ShortcutWrapper, HotKey,List, ListItem,SongItem } from './style'
import SearchBox from './search-box/index'
import { connect } from 'react-redux';
import { getHotKeyWords, changeEnterLoading, getSuggestList } from './store/actionCreators';
import {getSongDetail} from '../Player/store/actionCreators'
import Scroll from '../../baseUI/scoll/index'
import Loading from '../../baseUI/loading/index';
import LazyLoad, {forceCheck} from 'react-lazyload';
import {getName } from '../../api/until'
import MusicalNote from '../../baseUI/music-note/index';

function Search(props) {
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState('');
  const { hotList, enterLoading, songsCount, suggestList: immutableSuggestList,songsList: immutableSongsList,getHotKeyWordsDispatch, changeEnterLoadingDispatch, getSuggestListDispatch,getSongDetailDispatch} = props
  
  
  const suggestList=immutableSuggestList?immutableSuggestList.toJS():[]
  const songsList=immutableSongsList?immutableSongsList.toJS():[]

  const searchBack = useCallback(() => {
    setShow(false);
  }, []);


  //没有输入的时候
  useEffect(() => {
    setShow(true);
    if (!hotList.size)
      getHotKeyWordsDispatch();
    // eslint-disable-next-line
  }, []);
  const renderHotKey = () => {
    let list = hotList ? hotList.toJS() : [];
    return (
      <ul>
        {
          list.map(item => {
            return (
              <li className="item" key={item.first} onClick={() => setQuery(item.first)}>
                <span>{item.first}</span>
              </li>
            )
          })
        }
      </ul>
    )
  };

  //输入框有内容时
  const handleQuery = (q) => {
    setQuery(q);
    if (!q) return;
    changeEnterLoadingDispatch(true);
    getSuggestListDispatch(q);
  }
  //渲染歌手
  const renderSingers = () => { 
    let singers = suggestList.artists;
    if (!singers || !singers.length) return;
    return (
      <List>
        <h1 className="title"> 相关歌手 </h1>
        {
          singers.map ((item, index) => {
            return (
              <ListItem key={item.accountId+""+index} onClick={() => props.history.push(`/singers/${item.id}`)}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="singer"/>}>
                    <img src={item.picUrl} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                </div>
                <span className="name"> 歌手: {item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  };
  //渲染歌单

  
  const renderPlayList = () => {
    let playList = suggestList.playlists;
  if (!playList || !playList.length) return;
  return (
    <List>
      <h1 className="title"> 相关歌单 </h1>
      {
        playList.map ((item, index) => {
          return (
            <ListItem key={item.accountId+""+index} onClick={() => props.history.push(`/recommend/${item.id}`)}>
              <div className="img_wrapper">
                <LazyLoad placeholder={<img width="100%" height="100%" src={require('./music.png')} alt="music"/>}>
                  <img src={item.coverImgUrl} width="100%" height="100%" alt="music"/>
                </LazyLoad>
              </div>
              <span className="name"> 歌单: {item.name}</span>
            </ListItem>
          )
        })
      }
    </List>
  )

   };
  //渲染歌曲&&下坠音符

const musicNoteRef = useRef ();
  const selectItem = (e, id) => {
    getSongDetailDispatch(id)
    musicNoteRef.current.startAnimation({x:e.nativeEvent.clientX, y:e.nativeEvent.clientY});
  }

  
  const renderSongs = () => {
    return (
      <SongItem style={{paddingLeft: "20px"}}> 
        {
          songsList.map (item => {
            return (
              <li key={item.id} onClick={(e) => selectItem (e, item.id)}>
                <div className="info">
                  <span>{item.name}</span>
                  <span>
                    { getName (item.artists) } - { item.album.name }
                  </span>
                </div>
              </li>
            )
          })
        }
      </SongItem>
  )
   };





  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames='fly'
      unmountOnExit
      onExited={() => props.history.goBack()}

    >
      <Container play={songsCount}>
        <div className="search_box_wrapper">
          <SearchBox back={searchBack} newQuery={query} handleQuery={handleQuery}></SearchBox>
        </div>
        <ShortcutWrapper show={!query}>
          <Scroll>
            <div>
              <HotKey>
                <h1 className="title"> 热门搜索 </h1>
                {renderHotKey()}
              </HotKey>
            </div>
          </Scroll>
        </ShortcutWrapper>
        <ShortcutWrapper show={query}>
          <Scroll onScorll={forceCheck}>
            <div>
              {renderSingers()}
              {renderPlayList()}
              {renderSongs()}
            </div>
          </Scroll>
        </ShortcutWrapper>
        {enterLoading ? <Loading></Loading> : null}
        <MusicalNote ref={musicNoteRef}></MusicalNote>
      </Container>

    </CSSTransition>
  )
}

const mapStateToProps = (state) => ({
  hotList: state.getIn(['search', 'hotList']),
  enterLoading: state.getIn(['search', 'enterLoading']),
  suggestList: state.getIn(['search', 'suggestList']),
  songsCount: state.getIn(['player', 'playList']).size,
  songsList: state.getIn(['search', 'songsList'])
});

// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getHotKeyWordsDispatch() {
      dispatch(getHotKeyWords());
    },
    changeEnterLoadingDispatch(data) {
      dispatch(changeEnterLoading(data))
    },
    getSuggestListDispatch(data) {
      dispatch(getSuggestList(data));
    },
    getSongDetailDispatch (id) {
      dispatch (getSongDetail (id));
    }
  }
};
// 将 ui 组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Search));