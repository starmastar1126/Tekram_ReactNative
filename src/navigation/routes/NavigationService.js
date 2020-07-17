import { NavigationActions } from "react-navigation";

let _navigator;
let _drawerNavigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function setTopLevelNavigatorDrawer(navigatorRef) {
  _drawerNavigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

function navigateDrawer(routeName, params) {
  _drawerNavigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

const NavigationServiceDrawer = {
  navigateDrawer,
  setTopLevelNavigatorDrawer
};

const NavigationService = {
  navigate,
  setTopLevelNavigator
};
// add other navigation functions that you need and export them
export { NavigationServiceDrawer };
export default NavigationService;
