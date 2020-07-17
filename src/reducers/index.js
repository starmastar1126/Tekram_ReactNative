import {combineReducers} from 'redux';
import userReducer from './userReducer';
import {CHANGE_DRAWER, SAVE_CURRENT_DRAWER, IS_DRIVER} from '../actions/types';
import currentUser from './currentUser';
import dialogs from './dialogs';
import messages from './messages';
import connection from './connection';
import users from './users';
import selectedDialog from './selectedDialog';

const INITIAL_STATE = {
  drawerOpened: false,
  drawercurrent: 'home',
  isDriver: false,
};

const changeDrawer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_DRAWER:
      return {
        ...state,
        drawerOpened: action.payload,
      };
    case SAVE_CURRENT_DRAWER:
      return {
        ...state,
        drawercurrent: action.payload,
      };
    case IS_DRIVER:
      return {
        ...state,
        isDriver: action.payload,
      };
    default:
      return state;
  }
};

const reducers = combineReducers({
  changeDrawer,
  userReducer,
  currentUser,
  dialogs,
  messages,
  connection,
  users,
  selectedDialog,
});

export const LogOut = () => ({type: 'RESSET_STORE'});

const rootReducer = (state, action) => {
  if (action.type === 'RESSET_STORE') {
    state = {};
  }
  return reducers(state, action);
};

export default rootReducer;
