import React, {useState, useEffect, Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../constants/Colors';
import {withNavigation} from 'react-navigation';
import {DrawerActions} from 'react-navigation-drawer';
import {connect} from 'react-redux';
import {toggleDrawer} from '../actions';
import NavigationService from '../navigation/routes/NavigationService';

class Header extends Component {
  state = {
    searchActive: false,
    animatedValue: new Animated.Value(100),
  };

  componentDidMount() {
    Animated.timing(this.state.animatedValue, {
      toValue: (Dimensions.get('window').width * 85) / 100,
      timing: 1500,
      useNativeDriver: false,
    }).start();
  }

  render() {
    const {
      title,
      leftIcon,
      rightIcon,
      drawer,
      navigation,
      search,
      onChangeText,
      value,
      onPressRight,
    } = this.props;
    //console.log('here is the left', leftIcon);
    return (
      <View style={styles.headerContainer}>
        {search ? (
          <View
            style={{
              width: '100%',
              paddingHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-left" size={23} color={Colors.$gray} />
            </TouchableOpacity>
            <Animated.View
              style={[
                styles.TextInputContainer,
                {width: this.state.animatedValue},
              ]}>
              <TextInput
                onChangeText={onChangeText}
                value={value}
                placeholder="type"
              />
            </Animated.View>
          </View>
        ) : (
          <>
            <View style={{width: '15%', paddingLeft: 20}}>
              {this.props.isOpened ? null : drawer ? (
                <TouchableOpacity
                  onPress={() => {
                    //navigation.dispatch(DrawerActions.openDrawer());
                    navigation.openDrawer();
                    //DrawerActions.OPEN_DRAWER
                    this.props.toggleDrawerState(true);
                  }}>
                  {leftIcon}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  //style={{backgroundColor: 'red'}}
                  onPress={() => this.props.navigation.goBack()}>
                  {leftIcon}
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                width: '60%',
                justifyContent: 'center',
                alignItems: 'center',
                //backgroundColor: 'blue',
              }}>
              {this.state.searchActive ? (
                <View style={styles.TextInputContainer}>
                  <Icon name="x" size={15} color={Colors.$textInputTextGray} />
                  <TextInput
                    style={styles.TextInput}
                    placeholder="type a name"
                  />
                </View>
              ) : (
                <Text style={styles.headerTitle}>{title}</Text>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '20%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {title === 'driver' ? (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      NavigationService.navigate('searchDriver');
                      //this.setState({ searchActive: true });
                    }}>
                    <Icon
                      style={{fontWeight: 'bold'}}
                      name="search"
                      size={22}
                      color={Colors.$primaryBlue}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      NavigationService.navigate('priceList');
                    }}>
                    <View style={styles.priceListContainer}>
                      <Text style={styles.priceList}>Price list</Text>
                    </View>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    if (onPressRight) onPressRight();
                  }}
                  style={{paddingLeft: '40%'}}>
                  {rightIcon}
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    isOpened: state.changeDrawer.drawerOpened,
  };
};

const mapDispatchToProps = (dispatch) => ({
  toggleDrawerState: (state) => dispatch(toggleDrawer(state)),
});

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: StatusBar.currentHeight + 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    //backgroundColor: "red",
    paddingVertical: 10,
    borderBottomColor: Colors.$borderHeader,
    borderBottomWidth: 0.3,
  },
  headerTitle: {
    fontSize: 20,
    color: Colors.$gray,
    textTransform: 'uppercase',
  },
  priceListContainer: {
    backgroundColor: Colors.$orange,
    borderRadius: 3,
    marginLeft: 10,
  },
  priceList: {
    color: Colors.$white,
    fontSize: 13,
    padding: 3,
  },
  TextInput: {
    //backgroundColor: Colors.$textInputGray,
    //paddingVertical: 7,
    paddingHorizontal: 15,
  },
  TextInputContainer: {
    backgroundColor: Colors.$textInputGray,
    borderRadius: 30,
    //width: "85%",
    paddingHorizontal: 20,
    marginLeft: 10,
  },
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(Header),
);
