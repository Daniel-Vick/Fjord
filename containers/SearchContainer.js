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
import Search from '../components/Search.js'


class SearchContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
      console.log(this.props);
      return(
        <Search BG={this.props.BG} test={this.props}/>
      );
    }
  }



function mapStateToProps(state) {
  console.log("################################");
  console.log("mapStateToProps SearchContainer");
  console.log(state);
  console.log("################################");
  return {
    auth_key: state.authFlow.auth_key,
    logged_in: state.authFlow.logged_in,
    location: state.locationFlow.location,
    leaderboard: state.locationFlow.leaderboard,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

