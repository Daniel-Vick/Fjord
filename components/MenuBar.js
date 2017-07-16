import React, { Component, } from 'react'
import { View, 
        Text,
        Image,
        TouchableOpacity,
        StyleSheet,
        NativeModules
       } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
const SpotifyModule = NativeModules.SpotifyModule;





class MenuBar extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {active: [40,30,30,30], paused: false, playingIcon: 'pause'}
  }
  _navigate(input1) {
    var routes = this.props.navigator.getCurrentRoutes();
    var currentRoute = routes[routes.length -1].name;
    if (input1 == "Search" && currentRoute != "Search") {
      this.setState({active:[30,40,30,30]});
      this.props.navigator.push({
        name: 'Search'// Matches route.name
      })
    } else if (input1 == "Account" && currentRoute != "Account") {
      this.setState({active:[30,30,40,30]});
      this.props.navigator.push({
        name: 'Account'// Matches route.name
      })
    }
  }
  _home() {
    this.setState({active:[40,30,30,30]});
    this.props.navigator.popToTop()
  }
  setPaused() {
    if (this.state.paused) {
      SpotifyModule.play();
      this.setState({paused: false, playingIcon: 'pause'});
    } else {
      SpotifyModule.pause();
      this.setState({paused: true, playingIcon: 'play'});
    }
  
  }
  skipForward() {
    SpotifyModule.skipForward();
  }
  skipBackward() {
    SpotifyModule.skipBackward();
  }
  showPlayer(show) {
    if (show) {
      return(
            <View style={{height:40, backgroundColor:"#7DC1B6", borderTopWidth:0.5, borderBottomWidth: 0.5, borderColor: 'white', flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity style={{flex:1, flexDirection: 'row', backgroundColor:"#7DC1B6", alignItems:'center', justifyContent:'center'}} onPress={this.skipBackward.bind(this)}>
              <Icon name="step-backward" size={25} color={"white"}>
              </Icon></TouchableOpacity>
              <TouchableOpacity style={{flex:1, flexDirection: 'row', backgroundColor:"#7DC1B6", alignItems:'center', justifyContent:'center'}} onPress={this.setPaused.bind(this)}>
              <Icon name={this.state.playingIcon} size={25} color={"white"}>
              </Icon></TouchableOpacity>
              <TouchableOpacity style={{flex:1, flexDirection: 'row', backgroundColor:"#7DC1B6", alignItems:'center', justifyContent:'center'}} onPress={this.skipForward.bind(this)}>
              <Icon name="step-forward" size={25} color={"white"}>
              </Icon></TouchableOpacity>
            </View>
      );
    }
  }
  render() {
    return (
      <View>
            {this.showPlayer(this.props.playing)}
            <View style={{height:60,flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity style={{flex:1, flexDirection: 'row', backgroundColor:"#7DC1B6", alignItems:'center', justifyContent:'center'}} onPress={() => this._home()}>
              <Icon name="home" size={this.state.active[0]} color={"white"}>
              </Icon></TouchableOpacity>
              <TouchableOpacity style={{flex:1, flexDirection: 'row', backgroundColor:"#7DC1B6", alignItems:'center', justifyContent:'center'}} onPress={() => this._navigate("Search")}>
              <Icon name="search" size={this.state.active[1]} color={"white"}>
              </Icon></TouchableOpacity>
              <TouchableOpacity style={{flex:1, flexDirection: 'row', backgroundColor:"#7DC1B6", alignItems:'center', justifyContent:'center'}} onPress={() => this._navigate("Account")}>
              <Icon name="user" size={this.state.active[2]} color={"white"}>
              </Icon></TouchableOpacity>
            </View>
      </View>
    )
  }
}



export default MenuBar
