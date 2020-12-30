import * as actionTypes from './constants'
import {fromJS} from 'immutable'

const defaultState =fromJS({
  singer:{},
  songsOfSinger:[],
  loading:true
})
// eslint-disable-next-line
export default (state=defaultState,action)=>{
  switch (action.type) {
    case actionTypes.CHANGE_SINGER:
      return state.set('singer',action.data)
    case actionTypes.CHANGE_SONGS_OF_SINGER:
      return state.set('songsOfSinger',action.data)
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('loading',action.data) 
    default:
      return state
  }
}