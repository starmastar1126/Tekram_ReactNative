import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import Header from '../components/Header';
import ListDrivers from '../components/ListDrivers';
import Carousel from '../components/CarouselSlider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const {height, width} = Dimensions.get('window');
import {driverApi, authApi} from '../api';
import {connect} from 'react-redux';
import chatService from '../services/chat-service';
import pushNotificationService from '../services/push-notification';
import NavigationService from '../navigation/routes/NavigationService';
import {saveCurrentUserInfp} from '../actions';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    authApi
      .getUser(this.props.token, this.props.saveCurrentUserInfo)
      .then(() => {
        if (props.isDriver) NavigationService.navigate('dashboard');
      });
  }
  state = {
    drivers: [],
    activeDrivers: [],
    busyDrivers: [],
  };

  componentDidMount() {
    driverApi.getDrivers(this.refreshDriversList, this.props.token);
    chatService.fetchDialogsFromServer().then(() => {
      pushNotificationService.init(this.props.navigation);
    });
  }

  refreshDriversList = (drivers) => {
    let active = [];
    let busy = [];
    drivers.map((driver) => {
      if (driver.avaliable) active.push(driver);
      else busy.push(driver);
    });
    this.setState({
      activeDrivers: active,
      busyDrivers: busy,
    });
  };

  render() {
    return (
      <View style={{flex: 1, width, backgroundColor: Colors.$white}}>
        <Header
          title="driver"
          drawer
          leftIcon={
            <Icon
              style={{fontWeight: 'bold'}}
              name="menu"
              size={25}
              color={Colors.$primaryBlue}
            />
          }
        />
        <View style={{marginTop: 10}}>
          <ListDrivers available drivers={this.state.activeDrivers} />
          <ListDrivers drivers={this.state.busyDrivers} />
        </View>
        <View style={styles.carousel}>
          <Carousel />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carousel: {
    position: 'absolute',
    bottom: 0,
    borderTopColor: Colors.$orange,
    borderTopWidth: 0.5,
  },
});

const mapStateToProps = ({userReducer, changeDrawer}) => {
  console.log(changeDrawer);
  return {
    token: userReducer.token,
    isDriver: changeDrawer.isDriver,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserToken: (token) => dispatch(saveToken(token)),
    saveCurrentUserInfo: (user) => dispatch(saveCurrentUserInfp(user)),
  };
};

//export { HomeScreen };
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
