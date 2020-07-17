import React, {Component} from 'react';
import {View,Image,Text,StyleSheet} from 'react-native';
import Images from '../../constants/Images';
import Colors from '../../constants/Colors';


class ItemName extends Component {
  render() {
    let {item} = this.props
    return (
      <View style={$.containerView}>
        <View style={$.subContainerView}>
          <View>
            { item.image ? (
              //article.user.profile_image == null ? (
              <Image source={Images.user}
                     style={{width: 40, height: 40, borderRadius: 500}}
                     resizeMode={'stretch'} />
            ) : (
              <Image
                source={Images.user}
                style={{width: 40, height: 40, borderRadius: 500}}
                resizeMode={'stretch'}
              />
            )}
          </View>
          <View >
            <Text style={$.textStyle}>{item.name}</Text>
          </View>
        </View>
      </View>

    );
  }
}

const $ = StyleSheet.create({
  containerView :{backgroundColor: Colors.$primaryBlue,borderWidth : 0.2, borderColor : Colors.$white},
  subContainerView:{marginVertical : 15,flexDirection : "row",marginLeft : 20,alignItems : "center"},
  textStyle:{paddingLeft : 20,fontWeight:"bold",fontSize:16,color:Colors.$white}
})
export default ItemName;