import React, { Component, } from 'react'
import { View, Text, TouchableHighlight, NativeModules, StyleSheet } from 'react-native'
const SpotifyModule = NativeModules.SpotifyModule;

var styles = StyleSheet.create({
                               title: {flex:2, color:"white", fontWeight:'bold', fontSize:18, marginTop:5},
                               user:  {flex:1, color:"white", fontSize:15, marginBottom:5}
                               
});

class Song extends Component {
 constructor(props) {
    super(props);
  }
  playSong() {
    console.log("Playing: " + this.props.uri);
    SpotifyModule.playSong(this.props.uri);
  }
  render() {
    return(
      <TouchableHighlight onPress={() => this.playSong()}>
        <View style={{borderBottomWidth:0.5, marginLeft:10, marginRight:10, borderColor:"white"}}>
          <Text style={styles.title}>{this.props.name}</Text>
          <Text style={styles.user}>{this.props.artist}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default Song
