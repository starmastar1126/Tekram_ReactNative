import axios from 'axios';

class DriverApi {
  getDrivers(refreshDriversList, token) {
    axios
      .get('/drivers', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        refreshDriversList(res.drivers);
      })
      .catch((err) => {
        console.log('error while getting the list of drivers');
        console.log(err);
      });
  }

  getDriverByName(name, token, parent) {
    axios
      .get('/driver/name/' + name, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        parent.setState({drivers: res.drivers});
      })
      .catch((err) => {
        console.log('error while getting the list of drivers');
        console.log(err);
      });
  }

  getFavoritsDrivers(token, parent) {
    axios
      .get('/user/fav-drivers', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        parent.setState({
          //drivers: res.fav_drivers,
          drivers: [],
        });
      });
  }

  sendContactUsMessage(obj) {
    return axios
      .post('/contactus', obj, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((res) => res.data);
  }

  setDriverAsFavorite(token, id, parent) {
    return axios
      .get('/user/set-fav/' + id, {
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
        },
      })
      .then((res) => res.data)
      .then((res) => {
        console.log('set as favorite succsful');
      });
  }

  unsetAsFavoris(token, id, parent) {
    return axios
      .get('/user/unset-fav/' + id, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => res.data)
      .then((res) => {
        console.log('unset as favorite succsful');
      });
  }
}

export default DriverApi;
