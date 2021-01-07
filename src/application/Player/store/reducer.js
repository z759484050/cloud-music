import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import {playMode} from '../../../api/config'
import { findIndex } from "../../../api/until"

const defaultState = fromJS({
  fullScreen: false,
  playing: true,
  sequencePlayList: [],
  playList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  showPlayList: false,
  currentSong: {}
})


const handleDeleteSong = (state, song) => {
  // 也可用 loadsh 库的 deepClone 方法。这里深拷贝是基于纯函数的考虑，不对参数 state 做修改
  const playList = JSON.parse (JSON.stringify (state.get ('playList').toJS ()));
  const sequenceList = JSON.parse (JSON.stringify (state.get ('sequencePlayList').toJS ()));
  let currentIndex = state.get ('currentIndex');
  // 找对应歌曲在播放列表中的索引
  const fpIndex = findIndex (song, playList);
  // 在播放列表中将其删除
  playList.splice (fpIndex, 1);
  // 如果删除的歌曲排在当前播放歌曲前面，那么 currentIndex--，让当前的歌正常播放
  if (fpIndex < currentIndex) currentIndex--;
  
  // 在 sequenceList 中直接删除歌曲即可
  const fsIndex = findIndex (song, sequenceList);
  sequenceList.splice (fsIndex, 1);

  return state.merge ({
    'playList': fromJS (playList),
    'sequencePlayList': fromJS (sequenceList),
    'currentIndex': fromJS (currentIndex),
  });
}



// eslint-disable-next-line
export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SONG:
      return state.set('currentSong', action.data)
    case actionTypes.SET_FULL_SCREEN:
      return state.set('fullScreen', action.data)
    case actionTypes.SET_PLAYING_STATE:
      return state.set('playing', action.data)
    case actionTypes.SET_SEQUECE_PLAYLIST:
      return state.set('sequencePlayList', action.data)
    case actionTypes.SET_PLAYLIST:
      return state.set('playList', action.data)
    case actionTypes.SET_PLAY_MODE:
      return state.set('mode', action.data)
    case actionTypes.SET_CURRYENT_INDEX:
      return state.set('currentIndex', action.data)
    case actionTypes.SET_SHOW_PLAYLIST:
      return state.set('showPlayList', action.data)
    case actionTypes.DELETE_SONG:
      return handleDeleteSong (state, action.data);
    default:
      return state
  }
}