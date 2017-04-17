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

var auth = "BQC7ezRJ0vGKEYQM9NCrjI76JPWLfWiYKH7GBXDwh4loMFusHpvUDo92ceschG58g953DJUQhs_4MkZB_HAgZIUWFhmDjJy0PuVAAR81wyqX7Bifq2mJdSGGUZ9Jcozq9K4pEqpCMEyU160vptw1KjpZmHZLS8RVSnlA3InzkagJxoiI0HKylrVq0GSUxe9LEOpndJQxT44IEKyZfDxK5aY-mEcbLMdh2M7D2bzyRaIH_NJTcT3AyWn1cw";

export default class Fjord extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', playlist: ''}
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
  
  render() {
    return (
      <Navigator
        navigationBar={<MenuBar />}
        initialRoute={{ name: 'Login'}}
        renderScene={ this.renderScene.bind(this) } />
    );
  }
}


AppRegistry.registerComponent('Fjord', () => Fjord);
