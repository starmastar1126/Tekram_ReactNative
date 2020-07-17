import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {ContactUsScreen, AboutUs} from '../screens';
import HomeScreen from '../screens/HomeScreen';
import MyDrawer from '../components/MyDrawer';
import PriceList from '../screens/PriceList';
import FavorisScreen from '../screens/FavorisScreen';
import DashboardScreen from '../screens/dashBoard/DashboardScrean';
import ourPartners from '../screens/OurPartnersScreen';

const DrawerNavigator = createDrawerNavigator(
  {
    home: {
      screen: HomeScreen,
    },
    priceList: {
      screen: PriceList,
    },
    contactus: {
      screen: ContactUsScreen,
    },
    aboutus: {
      screen: AboutUs,
    },
    favoris: {
      screen: FavorisScreen,
    },
    ourPartners: {
      screen: ourPartners,
    },
    dashboard: {
      screen: DashboardScreen,
    },
  },
  {
    //initialRouteName: 'dashboard',
    drawerType: 'slide',
    drawerWidth: '60%',
    edgeWidth: 20,
    overlayColor: 'transparent',
    unmountInactiveRoutes: true,
    defaultNavigationOptions: {
      //                                                                                     drawerLockMode: "locked-closed",
    },

    // defaultNavigationOptions: {
    //   ...TransitionPresets.SlideFromRightIOS,
    //   gestureEnabled: true
    // }
    contentComponent: (props) => <MyDrawer {...props} />,
  },
);

export default DrawerNavigator;
