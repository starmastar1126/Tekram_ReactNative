import React, {Component} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import {_} from '../../../config/i18n/i18n';
import lodash from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../../constants/Colors';
import {StyleSheet,View,Text,FlatList} from 'react-native'
import AccountItem from './component/AccountItem';
import Pagination from 'react-native-pagination';
class AccountStatememnt extends Component {
  //state
  state = {
    items : items,
    refresh : false
  };
  //functions
  _renderItem = ({item})=> <AccountItem item={item}/>;
  //map to some od. We use the "id" attribute of each item in our list created in our MockPersonList
  _keyExtractor = (item, index) => item.id;

  _onEndReached(){

  }
  _onRefresh(){

  }
  // REQUIRED for ReactNativePagination to work correctly
  onViewableItemsChanged = ({ viewableItems, changed }) =>this.setState({viewableItems})
  //rendre
  render() {
    return (
      <SafeAreaView style={$.containerView} >
        <Header
          title={_("accountStatment.title")}
          leftIcon={<Icon name="angle-left" size={25} color={Colors.$primaryBlue} />}
          //rightIcon={<Icon name="search" size={22} color={Colors.$primaryBlue} />}
        />
        <View style={$.containerView}>
          <View style={$.containerList}>
            <FlatList
              data={this.state.items}
              ref={r=>this.refs=r}//create refrence point to enable scrolling
              keyExtractor={this._keyExtractor}//map your keys to whatever unique ids the have (mine is a "id" prop)
              renderItem={this._renderItem}//render each item
              onEndReached={()=>this._onEndReached()}
              onRefresh={()=>this._onRefresh()}
              refreshing={this.state.refresh}
            />
          </View>
          <View style={$.containerBottom}>
            <Text style={$.styleTextAmount}><Text style={$.styleTextGreenAmount}>{_("accountStatment.total_amount")}</Text></Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

//Mock data
let items = new lodash.times(4,(i)=>{
  return{
    id : i,
    index : i,
    number : 1,
    amount : 15,
    name : "islem"
  }
});

const $ = StyleSheet.create({
  containerView:{flex : 1},
  containerList:{flex : 0.8},
  containerBottom:{flex : 0.2,borderWidth: 0.3,alignItems : "center"},
  styleTextAmount:{paddingTop :30,fontSize : 20,fontWeight : "bold",color : Colors.$gray},
  styleTextGreenAmount:{color : Colors.$driversBlue}
});

export default AccountStatememnt;