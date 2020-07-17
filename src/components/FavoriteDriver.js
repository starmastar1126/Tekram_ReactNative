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

const {height, width} = Dimensions.get('window');

const navigateTo = (route) => {
  NavigationService.navigate(route);
};

const FavoriteDriver = ({driver, search, partners}) => {
  return (
    <TouchableOpacity onPress={() => navigateTo('driver')}>
      <View style={styles.container}>
        <View
          style={{
            marginRight: 15,
            padding: 2,
            borderColor: Colors.$lightOrange,
            borderWidth: 0.3,
            borderRadius: 50,
            //height: 75,
            //justifyContent: "center",
            //alignItems: "center"
          }}>
          <Image
            source={
              driver.avatar_url
                ? {uri: driver.avatar_url}
                : require('../../assets/driver.jpg')
            }
            style={styles.img}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.statusContainer}>
            <View style={[styles.statusIndicator]} />
            <Text style={styles.statusText}>available</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              //marginTop: 20,
              //marginBottom: 10
            }}>
            <Text style={styles.menuProp}>name:</Text>
            <Text style={styles.menuText}> john doe</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              //marginTop: 20,
              //marginBottom: 10
            }}>
            <Text style={styles.menuProp}>joining since:</Text>
            <Text style={styles.menuText}> 3 march 2020</Text>
          </View>
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
    //backgroundColor: Colors.$driverBack,
    //borderRadius: 80,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Colors.$borderGray,
    borderBottomWidth: 0.3,
    //marginHorizontal: 15,
    //marginBottom: 10
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
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: Colors.$greenConected,
  },
  statusText: {
    fontSize: 16,
    color: Colors.$gray,
    textTransform: 'uppercase',
    marginLeft: 5,
    fontWeight: '900',
  },
  statusContainer: {
    flexDirection: 'row',
    //justifyContent: "center",
    alignItems: 'center',
    //marginBottom: 15
  },
  menuProp: {
    color: Colors.$primaryBlue,
    textTransform: 'capitalize',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 7,
  },
  menuText: {
    color: Colors.$menuGray,
    textTransform: 'capitalize',
    fontSize: 14,
    fontWeight: '900',
  },
});

export default FavoriteDriver;
