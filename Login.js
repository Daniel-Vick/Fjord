import React, { Component, } from 'react'
import { View, Button, ListView, Text, Navigator, WebView, AsyncStorage} from 'react-native'


class Login extends Component {
  constructor(props) {
    super(props);
  }
  _navigate() {
    this.props.navigator.pop();
  }
  onNavigationStateChange = async (navState) => {
    if (navState.url.substring(0,42) === 'http://192.241.219.250:8888/#access_token=') {
      var i = 43;
      
      while (i < navState.url.length && navState.url.substring(i,i+1) != '&') {
        i++;
      }
      
      var auth = navState.url.substring(42, i);
      console.log(auth);
      const AUTH_KEY = 'AUTH_KEY'
      const authObj = {auth_key: auth}
      AsyncStorage.setItem(AUTH_KEY, JSON.stringify(authObj));

      this.props.navigator.replace({name: 'Leaderboard', auth: auth});
    }
    
  }
  render() {
    return(
           <WebView
           source={{uri: 'http://192.241.219.250:8888/'}}
           onNavigationStateChange={this.onNavigationStateChange}
           style={{marginTop: 20}}
           />
           );
  }
}

export default Login
