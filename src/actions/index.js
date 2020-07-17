import {
  CHANGE_DRAWER,
  SAVE_PHONE,
  SAVE_CITIES,
  SAVE_TOKEN,
  SAVE_CURRENT_DRAWER,
  IS_DRIVER,
  SAVE_CURRENT_USER_INFO,
} from './types';

export const toggleDrawer = (state) => ({
  type: CHANGE_DRAWER,
  payload: state,
});

export const savePhone = (phone) => ({
  type: SAVE_PHONE,
  payload: phone,
});

export const saveCities = (cities) => ({
  type: SAVE_CITIES,
  payload: cities,
});

export const saveToken = (token) => ({
  type: SAVE_TOKEN,
  payload: token,
});

export const saveCurrentDrawer = (current) => ({
  type: SAVE_CURRENT_DRAWER,
  payload: current,
});

export const saveIsDriver = (is) => ({
  type: IS_DRIVER,
  payload: is,
});

export const saveCurrentUserInfp = (is) => ({
  type: SAVE_CURRENT_USER_INFO,
  payload: is,
});
