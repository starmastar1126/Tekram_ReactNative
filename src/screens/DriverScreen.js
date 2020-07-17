import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import DriverInfo from '../components/DriverInfo';
import MotorcycleInfo from '../components/MotorcycleInfo';
import appConfig from '../constants/AppConfig.json';
import NavigationService from '../navigation/routes/NavigationService';
import chatService from '../services/chat-service';
import {driverApi} from '../api';
import {connect} from 'react-redux';

const {height, width} = Dimensions.get('window');

const initialLayout = {width};

const DriverScreen = (props) => {
  const driver = props.navigation.getParam('driver');
  console.log(driver);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'driver info'},
    {key: 'second', title: 'motorcycle info'},
  ]);
  const FirstRoute = () => <DriverInfo driver={driver} />;

  const SecondRoute = () => <MotorcycleInfo driver={driver} />;

  const selecteDriverToTalk = (driver) => {
    // need to add name or id for the driver
    //driver.id
    return chatService.createPrivateDialog('1244324').then((newDialog) => {
      NavigationService.navigate('chat', {dialog: newDialog, driver: driver});
    });
  };
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: Colors.$lightOrange}}
      style={{backgroundColor: Colors.$tabbarGray}}
      renderLabel={renderLabel}
    />
  );

  const renderLabel = ({route, focused, color}) => (
    <Text
      style={{color: Colors.$gray, fontSize: 15, textTransform: 'uppercase'}}>
      {route.title}
    </Text>
  );

  const rightPress = (token, driver) => {
    driverApi.setDriverAsFavorite(token, driver.id);
  };

  return (
    <View style={{flex: 1, width, backgroundColor: Colors.$white}}>
      <Header
        title="profile"
        leftIcon={
          <Icon name="angle-left" size={25} color={Colors.$primaryBlue} />
        }
        rightIcon={<Icon name="star" size={22} color={Colors.$starOrange} />}
        onPressRight={() => rightPress(props.token, driver)}
      />
      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={
              driver.avatar_url
                ? {uri: appConfig.api.baseUrl + driver.avatar_url}
                : require('../../assets/driver.jpg')
            }
            style={styles.img}
          />
        </View>
      </View>
      <View style={styles.statusContainer}>
        <View style={[styles.statusIndicator]} />
        <Text style={styles.statusText}>available</Text>
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => selecteDriverToTalk(driver)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Start Order</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, marginTop: 20}}>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: width / 2,
    height: width / 2,
    borderRadius: 100,
  },
  imageWrapper: {
    padding: 5,
    borderRadius: 100,
    borderColor: Colors.$lightOrange,
    borderWidth: 0.3,
    width: width / 2 + 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: Colors.$greenConected,
  },
  statusText: {
    fontSize: 18,
    color: Colors.$gray,
    textTransform: 'uppercase',
    marginLeft: 5,
    fontWeight: '900',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: Colors.$primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    paddingHorizontal: 25,
    width: '50%',
  },
  buttonText: {
    color: Colors.$white,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 7,
    textTransform: 'capitalize',
  },
  scene: {
    flex: 1,
  },
});

const mapStateToProps = ({userReducer, changeDrawer}) => {
  //console.log(changeDrawer);
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

export default connect(mapStateToProps, mapDispatchToProps)(DriverScreen);
export {DriverScreen};
