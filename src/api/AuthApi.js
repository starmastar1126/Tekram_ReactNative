import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import authService from '../services/AuthChat-service';
import chatService from '../services/chat-service';

class AuthApi {
  SignIn({phone, password}, remember_me, saveUserTokenAndDate) {
    let remember = remember_me ? 1 : 0;
    return axios
      .post(
        '/auth/login',
        {password, remember_me: remember, phone_number: phone},
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        },
      )
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        if (res.message === 'Phone number not verified') {
          return 'verify';
        } else if (res.message === 'Unauthorized') return 'Unauthorized';
        const dataUser = {login: phone, password: password};
        return authService
          .signIn(dataUser)
          .then(() => {
            console.log('siggned in chat succesful hohoooooo');
            chatService.setUpListeners();
            saveUserTokenAndDate(res);
            this.StoreToken(res);
            return true;
          })
          .catch((error) => {
            console.log(`Error in sign in chat.\n\n${JSON.stringify(error)}`);
            return false;
          });
      })
      .catch((err) => {
        console.log('error in sign in');
        console.log(err.response);
        return err.response.data;
      });
  }

  SignUp(
    {name, phone, fullAdress, password, confirmPass},
    city,
    remember_me,
    parent,
  ) {
    console.log(city);
    const dataUser = {full_name: name, login: phone, password: password};
    axios
      .post(
        '/auth/signup',
        {
          name,
          phone_number: phone,
          city,
          full_address: fullAdress,
          password,
          password_confirmation: confirmPass,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        },
      )
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        authService
          .SignUp(dataUser)
          .then(() => {
            chatService.setUpListeners();
            console.log('signed up succesfulll');
          })
          .catch((error) => {
            console.log(`Error in signup chat.\n\n${JSON.stringify(error)}`);
          });
        parent.savePhoneFromApi(res.phone_number);
      })
      .catch((err) => {
        console.log('error in signing in ');
        console.log(err);
      });
  }

  reSendPasswordSms(phone_number, operation) {
    return axios
      .post(
        '/auth/resend-code',
        {phone_number, operation},
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        },
      )
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        return true;
      })
      .catch((err) => {
        console.log('error in re sent msg');
        console.log(err);
        return false;
      });
  }

  verifySms(phone_number, verification_code) {
    console.log(phone_number, verification_code);
    return axios
      .post(
        '/auth/verify',
        {phone_number, verification_code},
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        },
      )
      .then((res) => res.data)
      .then((res) => {
        return true;
      })
      .catch((err) => {
        console.log('error in the verification');
        console.log(err);
        return false;
      });
  }

  getCeties(saveCities) {
    axios
      .get('/cities')
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        saveCities(res.cities);
      });
  }

  async StoreToken(token) {
    await AsyncStorage.setItem('user_token', token.access_token);
    await AsyncStorage.setItem('token_experation', token.expires_at);
  }

  async Logout() {
    await AsyncStorage.removeItem('user_token');
    await AsyncStorage.removeItem('token_experation');
  }

  getUser(token, savecurrentuserinfo) {
    return axios
      .get('/user', {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        savecurrentuserinfo(res);
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err);
        alert('error when getting user');
      });
  }
}

export default AuthApi;
