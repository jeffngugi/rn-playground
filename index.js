/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
// import App from './Apps/galleryView/App'//gallery view application is here
// import App from './Apps/firabaseAuth/App'//firebase phone authentication is here
// import App from './Apps/Otp/App'//otp application is here is here
// import App from './Apps/Carousel/App'//otp application is here is here
// import App from './Apps/LoadMore/App'//otp application is here is here
// import App from './Apps/Notifications/App' //push and local notification application is here is here
import App from './Apps/SqlLiteDb/App' //sqlite localstorage application is here is here
import PushNotification from "react-native-push-notification";
import {name as appName} from './app.json';

PushNotification.configure({
  onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
  },
  requestPermissions: Platform.OS === 'ios'
});

AppRegistry.registerComponent(appName, () => App);
