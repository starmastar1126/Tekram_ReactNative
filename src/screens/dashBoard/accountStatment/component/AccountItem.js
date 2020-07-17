import React, {Component} from 'react';
import {Text, View,StyleSheet} from 'react-native';
import {_} from '../../../../config/i18n/i18n';
import Colors from '../../../../constants/Colors';

class AccountItem extends Component {
  render() {
    let item = this.props.item;
    return (
      <View style={$.containerItem}>
        <View style={$.subContainerItem}>
          <ItemText title={_("accountStatment.order_number")} value={item.number}/>
          <ItemText title={_("accountStatment.order_amount")} value={item.amount}/>
          <ItemText title={_("accountStatment.client_name")} value={item.name}/>
        </View>
      </View>
    );
  }
}

class ItemText extends Component {
  render() {
    let title = this.props.title;
    let value = this.props.value;
    return (
      <Text style={$.styleTextAmount}><Text style={$.styleTextGreenAmount}>{title}</Text>{value}</Text>
    );
  }
}

const $ = StyleSheet.create({
  containerItem:{borderBottomWidth : 0.3,justifyContent : "center"},
  subContainerItem:{marginVertical : 20,marginLeft : 50},
  styleTextAmount:{fontSize : 16,fontWeight : "bold",color : Colors.$gray},
  styleTextGreenAmount:{color : Colors.$driversBlue}
});

export default AccountItem;