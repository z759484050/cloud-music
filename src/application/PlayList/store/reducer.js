import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS ({
  currentList: {},
  enterLoading: false,
})

// eslint-disable-next-line
export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_PLAYLIST:
      return state.set ('currentList', action.data);
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set ('enterLoading', action.data);
    default:
      return state;
  }
};