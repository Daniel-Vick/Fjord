import React, { Component, } from 'react'
import { View, Text} from 'react-native'

class Song extends Component {
 constructor(props) {
    super(props);
  }
  render() {
    return(
      <View style={{borderBottomWidth:0.5, marginLeft:10, marginRight:10, borderColor:"white"}}>
        <Text style={{flex:2, color:"white", fontWeight:'bold', fontSize:15}}>{this.props.name}</Text>
        <Text style={{flex:1, color:"#BBBBBB", fontSize:12}}>{this.props.artist}</Text>
      </View>
    );
  }
}

export default Song