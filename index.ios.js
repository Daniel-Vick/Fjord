import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Navigator,
  TouchableHighlight,
  ListView,
  WebView,
  AsyncStorage,
  Button,
  NativeModules
} from 'react-native'
import ReduxApp from './containers/reduxApp'
import App from './components/App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

const store = createStore(reducer)

export default class Fjord extends Component {
  
  render() {
  
  return(
    <Provider store={store}>
      <ReduxApp />
    </Provider>
    );
  }
}


AppRegistry.registerComponent('Fjord', () => Fjord);
