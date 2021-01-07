import {SET_CURRYENT_INDEX,SET_CURRENT_SONG,SET_PLAYING_STATE,SET_FULL_SCREEN,SET_PLAYLIST,SET_PLAY_MODE,SET_SEQUECE_PLAYLIST,SET_SHOW_PLAYLIST,DELETE_SONG} from './constants'
import {fromJS} from 'immutable'


export const changeCurrentSong = (data) => ({
  type: SET_CURRENT_SONG,
  data: fromJS (data)
});

export const changeFullScreen =  (data) => ({
  type: SET_FULL_SCREEN,
  data
});

export const changePlayingState = (data) => ({
  type: SET_PLAYING_STATE,
  data
});

export const changeSequecePlayList = (data) => ({
  type: SET_SEQUECE_PLAYLIST,
  data: fromJS (data)
});

export const changePlayList  = (data) => ({
  type: SET_PLAYLIST,
  data: fromJS (data)
});

export const changePlayMode = (data) => ({
  type: SET_PLAY_MODE,
  data
});

export const changeCurrentIndex = (data) => ({
  type: SET_CURRYENT_INDEX,
  data
});

export const changeShowPlayList = (data) => ({
  type: SET_SHOW_PLAYLIST,
  data
});

export const deleteSong=(data)=>({
  type:DELETE_SONG,
  data
})