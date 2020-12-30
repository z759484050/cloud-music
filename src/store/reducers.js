import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../application/Recommend/store/index';
import { reducer as singersReducer } from '../application/Singers/store/index';
import { reducer as rankReducer} from '../application/Rank/store/index'
import { reducer as albumReducer } from '../application/PlayList/store/index';
import {reducer as singerInfoReducer } from '../application/Singer/store/index'
export default combineReducers ({
  // eslint-disable-next-line 
  recommend: recommendReducer,
  singer:singersReducer,
  rank:rankReducer,
  playlist:albumReducer,
  singerInfo: singerInfoReducer
});