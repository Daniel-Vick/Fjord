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
  Button
} from 'react-native'
import MenuBar from './MenuBar.js'
import Playlist from './Playlist.js'
import Login from './Login.js'
import Leaderboard from './Leaderboard.js'
import Search from './Search.js'
import Account from './Account.js'
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC0NxB0xu_72-N5hRLkpP3lM4un2uXUlOw",
  authDomain: "fjord-a2881.firebaseapp.com",
  databaseURL: "https://fjord-a2881.firebaseio.com",
  storageBucket: "fjord-a2881.appspot.com",
  messagingSenderId: "633173718439"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const BGColor = "#313C4F";
//const BGColor = 'white';

var auth = "BQBrwwulEww6b13nXXWxGX4TTgdgR7AFy_pSyApJyIex3ShNTZmfvWAEPH_D2OVU8pk-2Qarkc0dv8bZaJvyGCbxkp518d4GAunrTTaCe--zVfsZ-F_LEh5b8eRD1nLeElXBbkM8CRX-f_pkbDLpx9zKK_N9Ep1nRsUF1ssE-g";

export default class Fjord extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', playlist: '', auth:'', loggedIn: false}
  }
  
  setAuth(input) {
    this.setState({auth: input});
    console.log("########################");
    console.log(this.state.auth);
  }
  
  renderScene(route, navigator) {
   if(route.name == 'Playlist') {
     return <Playlist BG={BGColor} auth={auth} navigator={navigator} id={route.id} username={route.username} title={route.title} url={route.url}/>
   }
   if(route.name == 'Leaderboard') {
     return <Leaderboard BG={BGColor} firebaseApp={firebaseApp} auth={auth} navigator={navigator} />
   }
    if(route.name == 'Search') {
     return <Search BG={BGColor} auth={auth} navigator={navigator} />
   }
    if(route.name == 'Account') {
     return <Account BG={BGColor} firebaseApp={firebaseApp} username="moonpie51" auth={this.auth} navigator={navigator} />
   }
    if(route.name == 'Login') {
      return <Login navigator={navigator}/>
    }
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
      this.setState({loggedIn: true});
    }
    
  }
  render() {
    if (this.state.loggedIn) {
    return (
      <Navigator
        navigationBar={<MenuBar />}
        initialRoute={{ name: 'Leaderboard'}}
        renderScene={ this.renderScene.bind(this) } />
    );
    } else {
      return(
             <WebView
             source={{uri: 'http://192.241.219.250:8888/'}}
             onNavigationStateChange={this.onNavigationStateChange}
             style={{marginTop: 20}}
             />
             );
    }
  }
}


AppRegistry.registerComponent('Fjord', () => Fjord);
