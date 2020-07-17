import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
const {height, width} = Dimensions.get('window');

const PriceListElem = ({road}) => {
  return (
    <TouchableOpacity>
      <View style={styles.elemContainer}>
        <View
          style={{
            marginLeft: 15,
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Icon name="ios-pin" size={25} color={Colors.$primaryBlue} />
          <Text style={styles.destination}>
            {road.from} - {road.to}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{road.price}</Text>
          <Text style={styles.currency}>lbp </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  priceContainer: {
    borderLeftColor: Colors.$orange,
    borderLeftWidth: 1.2,
    alignItems: 'flex-end',
    paddingLeft: 15,
    marginRight: 15,
  },
  destination: {
    color: Colors.$destinationBlack,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  elemContainer: {
    backgroundColor: Colors.$textInputGray,
    borderColor: Colors.$borderGray,
    borderWidth: 1.5,
    borderRadius: 50,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  price: {
    color: Colors.$lightOrange,
    fontSize: 17,
    fontWeight: 'bold',
  },
  currency: {
    color: Colors.$lightOrange,
    fontSize: 15,
  },
});

export default PriceListElem;
