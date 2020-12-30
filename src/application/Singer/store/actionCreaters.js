import { CHANGE_SINGER, CHANGE_SONGS_OF_SINGER, CHANGE_ENTER_LOADING } from './constants';
import { fromJS } from 'immutable';
import { getSingerInfoRequest } from '../../../api/request';

const changeSinger=(data)=>({
  type:CHANGE_SINGER,
  data:fromJS(data)
})


const changeSongs=(data)=>({
  type:CHANGE_SONGS_OF_SINGER,
  data:fromJS(data)
})

export const changeEnterLoading=(data)=>({
  type:CHANGE_ENTER_LOADING,
  data:fromJS(data)
})


export const getSingerInfo =(id)=>{
  return dispatch=>{
    getSingerInfoRequest(id).then(res=>{
      console.log(res);
      dispatch(changeSinger(res.artist));
      dispatch (changeSongs (res.hotSongs));
      dispatch (changeEnterLoading (false));
    })
  }
}