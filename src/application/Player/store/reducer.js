import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import {playMode} from '../../../api/config'
import {playList} from '../../../api/config'

const defaultState = fromJS({
  fullScreen: false,
  playing: true,
  sequencePlayList: playList,
  playList: playList,
  mode: playMode.sequence,
  currentIndex: -1,
  showPlayList: false,
  currentSong: {}
})
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
    default:
      return state
  }
}