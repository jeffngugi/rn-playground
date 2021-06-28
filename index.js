/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
// import App from './Apps/galleryView/App'//gallery view application is here
import App from './Apps/firabaseAuth/App'//firebase phone authentication is here

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
