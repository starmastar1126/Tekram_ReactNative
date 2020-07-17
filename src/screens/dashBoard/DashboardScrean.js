import React, {Component} from 'react';
import {View,Text,StyleSheet} from "react-native";
import {SafeAreaContext, SafeAreaView} from "react-native-safe-area-context";
import {_} from '../../config/i18n/i18n';
import Colors from '../../constants/Colors';
import Switches from 'react-native-switches';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../../components/Header';
import CButton from '../../components/CButton';
import ModalDashboard from './ModalDashboard';

class DashboardScrean extends Component {
    //state
    state = {
        available : false,
      refresh : false,
      modalVisible : false
    };

    //functon
    _handleChangeAvailability(val){
      console.log(val);
      this.setState({
        available : !val
      })
    }
    _onEndReached(){

    }
    _onRefresh(){

    }

    render() {
        return (
            <SafeAreaView style={$.containerMain}>
              <Header
                title={_("dashboard.title")}
                leftIcon={<Icon name="menu" size={25} color={Colors.$primaryBlue} />}
                drawer
                //rightIcon={<Icon name="search" size={22} color={Colors.$primaryBlue} />}
              />
              <View style={$.viewContainer}>
                <View style={$.viewTextContainer}>
                  <Text style={$.styleTextAvailibal}>{_("dashboard.availabilityText")}</Text>
                </View>
                <View style={$.viewSwitchContainer}>
                  <Switches
                    shape={'pill'}
                    onChange={(val)=>{this._handleChangeAvailability(this.state.available)}}
                    value={this.state.available}
                    textOn={_("dashboard.activeText")}
                    textOff={_("dashboard.inActiveText")}
                    sliderWidth={120}
                    textSize={12}
                    colorTextOff={Colors.$destinationBlack}
                    colorTextOn={Colors.$destinationBlack}
                    colorSwitchOn={Colors.$white}
                    colorSwitchOff={Colors.$white}
                    buttonColor={this.state.available ? Colors.$greenConected : Colors.$redBusy}
                    animationDuration={10}
                  />
                </View>
                <View style={$.viewTextContainer}>
                  <View style={$.viewButtonContainer}>
                    <CButton style={$.loginBtn}
                             color="{Colors.$primaryBlue}"
                             title={_('dashboard.newOrder')}
                             onPress={()=>{this.setState({
                               modalVisible : true
                             })}}
                    />
                  </View>
                  <View style={$.viewTextContainer}>
                    <CButton style={$.loginBtn}
                             color="{Colors.$primaryBlue}"
                             title={_('dashboard.accountStatement')}
                             onPress={()=>{this.props.navigation.navigate("accountStatement")}}
                    />
                  </View>
                </View>
              </View>
              <ModalDashboard
                isModalVisible={this.state.modalVisible}
                onBackPress={()=>{this.setState({
                  modalVisible : false
                })}}
                onBackButtonPress={()=>{this.setState({
                  modalVisible : false
                })}}
                _onEndReached={this._onEndReached()}
                _onRefresh={this._onRefresh()}
                refresh={this.state.refresh}
                Parent={this}
              />
            </SafeAreaView>

        );
    }
}


const $ = StyleSheet.create({
  containerMain:{flex : 1},
  viewContainer:{flex : 1,justifyContent : "center",alignItems:"center",backgroundColor : Colors.$white},
  styleTextAvailibal:{fontWeight : "bold",fontSize:16,color : Colors.$gray},
  viewTextContainer:{marginBottom : 40},
  viewSwitchContainer:{marginBottom : 80},
  viewButtonContainer:{marginBottom: 20},
  loginBtn: { backgroundColor: Colors.$primaryBlue, color: 'white'},
});

export default DashboardScrean;