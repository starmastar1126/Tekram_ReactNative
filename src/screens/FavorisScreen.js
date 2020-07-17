import React, {Component} from 'react';
import {View, Text, Dimensions, StyleSheet, FlatList} from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../constants/Colors';
import PriceListElem from '../components/PriceListElem';
import Driver from '../components/Driver';
import FavoriteDriver from '../components/FavoriteDriver';
import {driverApi} from '../api';
import {connect} from 'react-redux';

const {height, width} = Dimensions.get('window');

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

class FavorisScreen extends Component {
  state = {
    text: '',
    drivers: [],
  };

  componentDidMount() {
    driverApi.getFavoritsDrivers(this.props.token, this);
  }

  render() {
    return (
      <View style={{flex: 1, width, backgroundColor: Colors.$white}}>
        <Header
          title="favorits"
          leftIcon={<Icon name="menu" size={25} color={Colors.$primaryBlue} />}
          //rightIcon={<Icon name="search" size={22} color={Colors.$primaryBlue} />}
          //search
          drawer
        />
        <View style={styles.flatContainer}>
          <FlatList
            alwaysBounceVertical
            bounces
            style={{paddingBottom: 60}}
            data={this.state.drivers}
            renderItem={({item}) => <FavoriteDriver driver={item} search />}
            keyExtractor={(item) => item.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flatContainer: {
    //marginTop: 10,
    //marginHorizontal: 20,
    marginBottom: 20,
    height: '88%',
  },
});

const mapStateToProps = ({userReducer}) => {
  console.log(userReducer);
  return {
    token: userReducer.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserToken: (token) => dispatch(saveToken(token)),
  };
};

export default connect(mapStateToProps, null)(FavorisScreen);
//export { SearchDriverScreen };
