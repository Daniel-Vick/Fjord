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
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import MenuBar from '../components/MenuBar.js'
import Playlist from '../components/Playlist.js'
import Login from '../components/Login.js'
import Leaderboard from '../components/Leaderboard.js'
import Search from '../components/Search.js'
import Account from '../components/Account.js'
import CustomTransitions from '../components/CustomTransitions';
import App from '../components/App.js';

const firebaseApp = {};

const SpotifyModule = NativeModules.SpotifyModule;



const BGColor = "#313C4F";

var auth = "BQBrwwulEww6b13nXXWxGX4TTgdgR7AFy_pSyApJyIex3ShNTZmfvWAEPH_D2OVU8pk-2Qarkc0dv8bZaJvyGCbxkp518d4GAunrTTaCe--zVfsZ-F_LEh5b8eRD1nLeElXBbkM8CRX-f_pkbDLpx9zKK_N9Ep1nRsUF1ssE-g";



class reduxApp extends Component {
  constructor(props) {
  
    super(props);
  }
  render() {
      console.log(this.props);
      return(
        <App test={this.props}/>
      );
    }
  }



function mapStateToProps(state) {
  console.log("################################");
  console.log("mapStateToProps reduxApp");
  console.log(state);
  console.log("################################");
  return {
    auth_key: state.authFlow.auth_key,
    logged_in: state.authFlow.logged_in,
    location: state.locationFlow.location,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

