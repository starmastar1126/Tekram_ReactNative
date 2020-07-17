import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Colors from '../constants/Colors';
import NavigationService from '../navigation/routes/NavigationService';
import appConfig from '../constants/AppConfig.json';
import chatService from '../services/chat-service';

const {height, width} = Dimensions.get('window');

const navigateTo = (route, param) => {
  NavigationService.navigate(route, param);
};



const Driver = ({driver, search}) => {
  //console.log(appConfig.api);
  return (
    <TouchableOpacity onPress={() => navigateTo('driver', {driver})}>
      <View style={styles.container}>
        <View style={{marginRight: 15}}>
          <Image
            source={
              driver.avatar_url
                ? {uri: appConfig.api.baseUrl + driver.avatar_url}
                : require('../../assets/driver.jpg')
            }
            style={styles.img}
            //resizeMode="center"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, search ? {color: Colors.$gray} : null]}>
            {driver.name}
          </Text>
          <Text
            style={[styles.subTitle, search ? {color: Colors.$gray} : null]}>
            {driver.description.length > 60
              ? driver.description.slice(0, 60) + '...'
              : driver.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 75,
    height: 75,
    borderRadius: 100,
  },
  container: {
    backgroundColor: Colors.$driverBack,
    borderRadius: 80,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 15,
    opacity: 1,
    width: '70%',
    //backgroundColor: "red",
    borderTopRightRadius: 80,
    borderBottomRightRadius: 80,
    paddingRight: 5,
  },
  title: {
    color: Colors.$white,
    fontSize: 17,
    textTransform: 'capitalize',
    marginTop: -10,
  },
  subTitle: {
    color: Colors.$white,
    fontSize: 13,
  },
});

export default Driver;
