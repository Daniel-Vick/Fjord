import React, { Component, } from 'react'
import { View, 
        Text,
        Image,
        TouchableHighlight
       } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';




class MenuBar extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }
  _navigate(input1) {
    var routes = this.props.navigator.getCurrentRoutes();
    var currentRoute = routes[routes.length -1].name;
    if (input1 == "Search" && currentRoute != "Search") {
      this.props.navigator.push({
        name: 'Search'// Matches route.name
      })
    } else if (input1 == "Account" && currentRoute != "Account") {
      this.props.navigator.push({
        name: 'Account'// Matches route.name
      })
    }
  }
  _home() {
    this.props.navigator.popToTop()
  }
  render() {
    return (
            <View style={{height:60,flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableHighlight style={{flex:1, flexDirection: 'row', backgroundColor:"#7DC1B6", alignItems:'center', justifyContent:'center'}} onPress={() => this._home()}>
            <Icon name="home" size={30} color={"white"}>
            </Icon></TouchableHighlight>
            <TouchableHighlight style={{flex:1, flexDirection: 'row', backgroundColor:"#7DC1B6", alignItems:'center', justifyContent:'center'}} onPress={() => this._navigate("Search")}>
            <Icon name="search" size={30} color={"white"}>
            </Icon></TouchableHighlight>
            <TouchableHighlight style={{flex:1, flexDirection: 'row', backgroundColor:"#7DC1B6", alignItems:'center', justifyContent:'center'}} onPress={() => this._navigate("Account")}>
            <Icon name="user" size={30} color={"white"}>
            </Icon></TouchableHighlight>
            <TouchableHighlight style={{flex:1, flexDirection: 'row', backgroundColor:"#7DC1B6", alignItems:'center', justifyContent:'center'}} onPress={() => this._home()}>
            <Icon name="gear" size={30} color={"white"}>
            </Icon></TouchableHighlight>
      </View>
    )
  }
}

export default MenuBar
