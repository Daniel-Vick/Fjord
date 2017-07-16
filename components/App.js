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
  componentDidMount() {
    AsyncStorage.multiGet(['AUTH_KEY', 'REFRESH_TOKEN', 'EXPIRATION_DATE'], (err, result) => {
      console.log(result);
      //SpotifyModule.login(result[0][1]);
      //this.props.setAuth(result[0][1], result[2][1]);
      //this.setState({loggedIn: true});
    })
  }
  onButtonPress() {
    var that = this;
    SpotifyModule.authenticate(data => {
      if (data != null) {
      console.log("#################");
      console.log(data.accessToken);
      console.log(data.expirationDate);
      const AUTH_KEY = 'AUTH_KEY';
      that.props.setAuth(data.accessToken, data.expirationDate);
      //var sessionInfo = {accessToken: data.accessToken, refreshToken: data.refreshToken, expirationDate: data.expirationDate};

      //const authObj = {auth_key: auth}
      AsyncStorage.multiSet([[AUTH_KEY, data.accessToken], ['REFRESH_TOKEN', data.refreshToken], ['EXPIRATION_DATE', data.expirationDate]]);
      that.setState({loggedIn: true, auth: data.accessToken});
      } else {
        that.setState({loggedIn: true});
      }
    });
    
  }
  renderScene(route, navigator) {
   if(route.name == 'Playlist') {
     return <Playlist BG={BGColor} fauth_key={this.props.auth_key} navigator={navigator} id={route.id} username={route.username} title={route.title} url={route.url}  setPlaying={this.props.setPlaying}/>
   }
   if(route.name == 'Leaderboard') {
     return <Leaderboard test={this.props.auth_key} leaderboard={this.props.leaderboard} setLeaderboard={this.props.setLeaderboard} location={this.props.location} BG={BGColor} auth={this.state.auth} navigator={navigator} />
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
        navigationBar={<MenuBar playing={this.props.playing} setPlaying={this.props.setPlaying}/>}
        configureScene={(route, routeStack) => CustomTransitions.NONE}
        initialRoute={{ name: 'Leaderboard'}}
        renderScene={ this.renderScene.bind(this) } />
    );
    } else {
      return(
      <View style={{flex:1, paddingTop:240, alignItems:'center', backgroundColor:BGColor}}>
          <TouchableHighlight style={{backgroundColor: "#7DC1B6", paddingLeft:30, paddingRight:30, paddingTop:20,paddingBottom:20, borderRadius:5}} onPress={this.onButtonPress.bind(this)}>
            <Text style={{color:'white'}}>Login with Spotify</Text>
          </TouchableHighlight>
      </View>);
    }
  }
}

export default App
