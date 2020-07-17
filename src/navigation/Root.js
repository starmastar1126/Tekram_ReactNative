import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPresets,
} from 'react-navigation-stack';
import {PartnersScreen, ContactUsScreen, AboutUs} from '../screens';
import DriverScreen from '../screens/DriverScreen';
import PriceList from '../screens/PriceList';
import SearchDriverScreen from '../screens/SearchDriverScreen';
import SignUpScreen from '../screens/SignUpScreen';
import VerifCodeScreen from '../screens/VerifCodeScreen';
import SignInScreen from '../screens/SignInScreen';
import React from 'react';
import {createAppContainer} from 'react-navigation';
import DrawerNavigator from './DrawerNavigator';
import NavigationService from './routes/NavigationService';
import Chat from '../screens/chat';
import Video from '../screens/VideoScreen';

import DashboardScreen from '../screens/dashBoard/DashboardScrean';
import AccountStatememnt from '../screens/dashBoard/accountStatment/AccountStatememnt';
const AppNavigatorWrapper = (props) => {
  const AppNavigator = createAppContainer(
    createStackNavigator(
      {
        signIn: {
          screen: SignInScreen,
        },
        signUp: {
          screen: SignUpScreen,
        },
        verificationCode: {
          screen: VerifCodeScreen,
        },
        main: DrawerNavigator,
        driver: {
          screen: DriverScreen,
        },
        partners: {
          screen: PartnersScreen,
        },
        contactus: {
          screen: ContactUsScreen,
        },
        aboutus: {
          screen: AboutUs,
        },
        searchDriver: {
          screen: SearchDriverScreen,
        },
        priceList: {
          screen: PriceList,
        },
        chat: {
          screen: Chat,
        },
        video: {
          screen: Video,
        },
        // dashboard: {
        //   screen: DashboardScreen,
        // },
        accountStatement: {
          screen: AccountStatememnt,
        },
      }, //props.initial
      {
        initialRouteName: props.initial,
        //props.initial,
        headerMode: 'none',
        mode: 'card',
        defaultNavigationOptions: {
          ...TransitionPresets.SlideFromRightIOS,
          gestureEnabled: false,
        },
      },
    ),
  );
  return (
    <AppNavigator
      ref={(navigationRef) => {
        NavigationService.setTopLevelNavigator(navigationRef);
      }}
      theme={props.theme}
    />
  );
};

export default AppNavigatorWrapper;
