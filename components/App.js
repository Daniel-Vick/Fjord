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
import MenuBar from './MenuBar.js'
import Playlist from './Playlist.js'
import Login from './Login.js'
import Leaderboard from './Leaderboard.js'
import Search from './Search.js'
import SearchContainer from '../containers/SearchContainer'
import Account from './Account.js'
import CustomTransitions from './CustomTransitions';
const SpotifyModule = NativeModules.SpotifyModule;


const BGColor = "#313C4F";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', playlist: '', auth:'', loggedIn: false, location: "currentLocation"}
  }
  onButtonPress() {
    var that = this;
    SpotifyModule.authenticate(data => {
      console.log("#################");
      console.log(data.accessToken);
      const AUTH_KEY = 'AUTH_KEY';
      that.props.setAuth(data.accessToken);

      //const authObj = {auth_key: auth}
      AsyncStorage.setItem(AUTH_KEY, data.accessToken);
      that.setState({loggedIn: true, auth: data.accessToken});
    });
    
  }
  renderScene(route, navigator) {
   if(route.name == 'Playlist') {
     return <Playlist BG={BGColor} auth_key={this.props.auth_key} navigator={navigator} id={route.id} username={route.username} title={route.title} url={route.url}/>
   }
   if(route.name == 'Leaderboard') {
     return <Leaderboard test={this.props.auth_key} BG={BGColor} auth={this.state.auth} navigator={navigator} />
   }
    if(route.name == 'Search') {
     return <SearchContainer BG={BGColor} auth={this.props.auth_key} navigator={navigator} />
   }
    if(route.name == 'Account') {
     return <Account BG={BGColor} auth={this.props.auth_key} navigator={navigator} />
   }
    if(route.name == 'Login') {
      return <Login navigator={navigator}/>
    }
  }
  render() {
    /*console.log("TESTAPP");
    if (this.props.update) {
      console.log("LOC DIFF");
      this.props.updateLocation();
    }*/
    if (this.state.loggedIn) {
    return (
      <Navigator
        navigationBar={<MenuBar />}
        configureScene={(route, routeStack) => CustomTransitions.NONE}
        initialRoute={{ name: 'Leaderboard'}}
        renderScene={ this.renderScene.bind(this) } />
    );
    } else {
      return(
      <View style={{paddingTop:40}}>
        <TouchableHighlight onPress={this.onButtonPress.bind(this)}>
          <Text>Spotify Auth</Text>
        </TouchableHighlight>
      </View>);
    }
  }
}

export default App
