import {
  AppRegistry
} from 'react-native';

import App from './src/App';

console.ignoredYellowBox = [
  'Setting a timer'
];

AppRegistry.registerComponent('jccell', () => App);
