import {combineReducers} from 'redux';
import {
  SAVE_PHONE,
  SAVE_TOKEN,
  SAVE_CITIES,
  SAVE_CURRENT_USER_INFO,
} from '../actions/types';

const INITIAL_STATE = {token: null, phone: '', cities: [], currentUserInfo: {}};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_PHONE:
      return {
        ...state,
        phone: action.payload,
      };
      break;
    case SAVE_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SAVE_CITIES:
      return {
        ...state,
        cities: action.payload,
      };
    case SAVE_CURRENT_USER_INFO:
      return {
        ...state,
        currentUserInfo: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
