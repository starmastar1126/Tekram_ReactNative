import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList} from 'react-native';
import Modal from "react-native-modal";
import Colors from '../../constants/Colors';
import Autocomplete from 'react-native-autocomplete-input';
import lodash from 'lodash';
import {_} from '../../config/i18n/i18n';
import ItemName from './ItemName';

let listItem = new lodash.times(7, (i) => {
  return {
    id: i,
    index: i,
    image: true,
    name: 'islem',
  };
});

class ModalDashboard extends Component {
  //state
  state={
    name : "",
    price : null
  };

  //function


  _renderItem = ({item})=> <ItemName item={item}/>;
  //map to some od. We use the "id" attribute of each item in our list created in our MockPersonList
  _keyExtractor = (item, index) => item.id;

  onChangeText(text){
    // get by name

  }
  //rendreing
  render() {
    let {isModalVisible,onBackPress,onBackButtonPress,_onEndReached,_onRefresh,refresh,Parent} = this.props;
    return (
      <Modal
        isVisible={isModalVisible}
        onBackdropPress = {onBackPress}
        onBackButtonPress={onBackButtonPress}
      >
        <View style={$.containerInput}>
          <View style={$.containerName}>
            <View style={$.styleInput}>
              <TextInput
                style={$.textInputStyle}
                placeholder={_("dashboard.inputName")}
                value={this.state.name}
                onChangeText={text => this.onChangeText(text)}
              />
            </View>
            {
              listItem.size === 0 ? null : (
                <FlatList
                  style={$.listStyle}
                  data={listItem}
                  ref={r=>Parent.refs=r}//create refrence point to enable scrolling
                  keyExtractor={this._keyExtractor}//map your keys to whatever unique ids the have (mine is a "id" prop)
                  renderItem={this._renderItem}//render each item
                  //onEndReached={()=>_onEndReached()}
                  //onRefresh={()=>_onRefresh()}
                  refreshing={refresh}
                />)
            }
          </View>
          <View style={[$.containerName,$.containerPrice]}>
            <View style={$.styleInput}>
              <TextInput
                style={$.textInputStyle}
                placeholder={_("dashboard.inputPrice")}
                value={""}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}


const $ = StyleSheet.create({
  containerInput:{ justifyContent:"center", alignItems:"center", backgroundColor:Colors.$white, height : "70%", borderRadius : 10},
  listStyle:{zIndex : 5,height: "40%"},
  containerName:{width : "70%"},
  styleInput:{borderWidth : 1.5,borderColor : Colors.$borderGray,borderRadius: 50,marginBottom : 2,backgroundColor: Colors.$textInputGray},
  textInputStyle:{marginHorizontal : 20,height : 60},
  containerPrice : {marginTop : 40}

});
export default ModalDashboard;