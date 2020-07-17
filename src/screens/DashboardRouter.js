import React, {Component} from 'react';
import {Text, View} from 'react-native';
import NavigationService from '../navigation/routes/NavigationService';

export default class DashboardRouter extends Component {
  constructor(props) {
    NavigationService.navigate('dashboard');
  }
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}
