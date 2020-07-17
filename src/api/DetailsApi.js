import axios from 'axios';

export default class DetailsApi {
  getPriceList(token, parent) {
    axios
      .get('/price', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        parent.setState({prices: res.prices});
      });
  }
}
