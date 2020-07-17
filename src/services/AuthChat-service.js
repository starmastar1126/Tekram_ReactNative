import ConnectyCube from 'react-native-connectycube';
import appConfig from '../../config.json';
import AsyncStorage from '@react-native-community/async-storage';
import User from '../models/user';
import store from '../store';
import {LogOut} from '../reducers/index';
import {setCurrentUser, updateCurrentUser} from '../actions/currentUser';
import {preparationUploadImg, getImageLinkFromUID} from '../helpers/file';

class AuthService {
  static CURRENT_USER_SESSION_KEY = 'CURRENT_USER_SESSION_KEY';
  static DEVICE_TOKEN_KEY = 'DEVICE_TOKEN_KEY';

  async init() {
    console.log('lunching connecty');
    await ConnectyCube.init(...appConfig.connectyCubeConfig);
    console.log('lunching connecty over');
    return this.autologin();
  }

  async updateCurrentUser({image, full_name, login}) {
    const updateData = {};
    if (full_name) {
      updateData.full_name = full_name;
    }
    if (login) {
      updateData.login = login;
    }
    if (image) {
      const file = preparationUploadImg(image);
      const resultUploadImg = await ConnectyCube.storage.createAndUpload({
        file,
      });
      updateData.avatar = resultUploadImg.uid;
    }
    const responseUpdateUser = await ConnectyCube.users.update(updateData);
    const prewSession = await this.getUserSession();
    responseUpdateUser.user.avatar = getImageLinkFromUID(
      responseUpdateUser.user.avatar,
    );
    const newSession = Object.assign(
      JSON.parse(prewSession),
      responseUpdateUser.user,
    );
    await this.setUserSession(newSession);
    store.dispatch(updateCurrentUser(responseUpdateUser.user));
  }

  async autologin() {
    const checkUserSessionFromStore = await this.getUserSession();
    if (checkUserSessionFromStore) {
      const data = JSON.parse(checkUserSessionFromStore);
      await this.signIn({login: data.login, password: data.password});
      console.log('here is found token');
      return 'Dialogs';
    } else {
      console.log('didnt find token');
      return 'Auth';
    }
    return 'Auth';
  }

  async signIn(params) {
    console.log(params);
    let data = {login: 'anis', password: 'anisanis'};
    const session = await ConnectyCube.createSession(data);
    const currentUser = new User(session.user);
    session.user.avatar = getImageLinkFromUID(session.user.avatar);
    store.dispatch(setCurrentUser(session));
    const customSession = Object.assign({}, currentUser, {
      password: data.password,
      //password: params.password,
    });
    this.setUserSession(customSession);
    this.connect(customSession.id, customSession.password);
  }

  async signUp(params) {
    await ConnectyCube.createSession();
    await ConnectyCube.users.signup(params);
    return this.signIn(params);
  }

  async setUserSession(userSession) {
    return AsyncStorage.setItem(
      AuthService.CURRENT_USER_SESSION_KEY,
      JSON.stringify(userSession),
    );
  }

  async getUserSession() {
    return await AsyncStorage.getItem(AuthService.CURRENT_USER_SESSION_KEY);
  }

  async unsubscribePushNotifications() {
    const token = await this.getStoreToken();
    ConnectyCube.pushnotifications.subscriptions.delete(token);
  }

  async getStoreToken() {
    return await AsyncStorage.getItem(AuthService.DEVICE_TOKEN_KEY);
  }

  async logout() {
    await this.unsubscribePushNotifications();
    await AsyncStorage.clear();
    await ConnectyCube.logout();
    store.dispatch(LogOut());
  }

  async connect(userId, password) {
    await ConnectyCube.chat.connect({userId, password});
  }

  get currentUser() {
    return store.getState().currentUser;
  }
}

const authService = new AuthService();

Object.freeze(authService);

export default authService;
