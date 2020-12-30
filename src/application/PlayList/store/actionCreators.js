import { CHANGE_CURRENT_PLAYLIST, CHANGE_ENTER_LOADING } from './constants';
import { getPlayListRequest } from '../../../api/request';
import { fromJS } from 'immutable';

const changePlayList = (data) => ({
  type: CHANGE_CURRENT_PLAYLIST,
  data: fromJS (data)
});

export const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  data
});

export const getPlayList = (id) => {
  return dispatch => {
    getPlayListRequest (id).then (res => {
      let data = res.playlist;
      dispatch (changePlayList (data));
      dispatch (changeEnterLoading (false));
    }).catch (() => {
      console.log ("获取歌单数据失败！")
    });
  }
};