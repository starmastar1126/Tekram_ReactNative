import React, {Component} from 'react';
import {View, Text, Dimensions, StyleSheet, FlatList} from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../constants/Colors';
import PriceListElem from '../components/PriceListElem';
import {detailsApi} from '../api';
import {connect} from 'react-redux';

const {height, width} = Dimensions.get('window');

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

class PriceList extends Component {
  state = {
    prices: [],
  };

  componentDidMount() {
    detailsApi.getPriceList(this.props.token, this);
  }

  render() {
    return (
      <View style={{flex: 1, width, backgroundColor: Colors.$white}}>
        <Header
          title="price list"
          leftIcon={<Icon name="menu" size={25} color={Colors.$primaryBlue} />}
          drawer
          //rightIcon={<Icon name="search" size={22} color={Colors.$primaryBlue} />}
        />
        <View style={styles.flatContainer}>
          <FlatList
            alwaysBounceVertical
            bounces
            style={{paddingVertical: 15, paddingHorizontal: 20}}
            data={this.state.prices}
            renderItem={({item}) => <PriceListElem road={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flatContainer: {
    marginTop: 35,
    //marginho: 20,
    marginBottom: 20,
    height: '80%',
  },
});

const mapStateToProps = ({userReducer}) => {
  //console.log(userReducer);
  return {
    token: userReducer.token,
  };
};

export default connect(mapStateToProps, null)(PriceList);
//export { PriceList };
