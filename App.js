import React, {Component} from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import Root from './src/navigation/Root';
import NavigationService from './src/navigation/routes/NavigationService';
import {Provider, connect} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import AppReducers from './src/reducers';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {authApi} from './src/api';
import {saveCities, saveToken, saveIsDriver} from './src/actions';
import store from './src/store';
import authService from './src/services/AuthChat-service';
import chatService from './src/services/chat-service';

axios.defaults.baseURL = 'http://tkramdelivery.com/api';

axios.defaults.timeout = 3000;

axios.interceptors.request.use((request) => {
  console.log('starting request', request.url);
  return request;
});

// const fetchFonts = ()=> {
//   return FontFaceObserver.loadAsync
// }
//const store = createStore(AppReducers, applyMiddleware(ReduxThunk));

export default class App extends Component {
  state = {
    getToken: false,
    initial: 'signIn',
  };

  constructor(props) {
    super(props);
    this.store = store;
    //SplashScreen.preventAutoHide();
  }

  initChatUser = async () => {
    await authService.init();
    chatService.setUpListeners();
  };

  saveCitiesToStore = (cities) => {
    this.store.dispatch(saveCities(cities));
  };

  saveTokenToStore = (token) => {
    this.store.dispatch(saveToken(token));
  };

  saveTypeofuserToStore = (type) => {
    this.store.dispatch(saveIsDriver(type));
  };

  async componentDidMount() {
    //SecureStore.deleteItemAsync("user_token");
    console.log('dadazdazd');
    await this.initChatUser();
    authApi.getCeties(this.saveCitiesToStore);
    AsyncStorage.getItem('user_token').then((res) => {
      console.log(res);

      if (res === null) {
        this.setState({
          initial: 'signIn',
          getToken: true,
        });
      } else {
        // check the validety oof the token before !!!
        AsyncStorage.getItem('token_experation').then(async (result) => {
          if (result !== null) {
            let tokenDate = new Date(result);
            let currentDate = new Date();
            console.log(tokenDate, currentDate);
            console.log(tokenDate > currentDate);
            console.log(tokenDate <= currentDate);
            let typeOfUser = await AsyncStorage.getItem('type_of_user');
            this.saveTypeofuserToStore(typeOfUser === 'driver' ? true : false);
            if (tokenDate > currentDate) {
              this.saveTokenToStore(res);
              this.setState({
                initial: 'main',
                getToken: true,
              });
            } else {
              this.setState({
                initial: 'signIn',
                getToken: true,
              });
            }
          } else {
            this.setState({
              initial: 'signIn',
              getToken: true,
            });
          }
        });
      }
      //SplashScreen.hide();
    });
  }

  render() {
    if (!this.state.getToken) {
      return null;
    }
    return (
      <Provider store={this.store}>
        <View style={styles.container}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          <Root theme="light" initial={this.state.initial} />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
