import React, { Component, } from 'react'
import { View, Text, TouchableHighlight, Image} from 'react-native'
import * as firebase from 'firebase';

//           <TouchableHighlight onPress={() => this._add(this.props.user, this.props.id, this.props.name, this.props.score)} style={{flex:1, borderBottomWidth:0.5, marginLeft:10, marginRight:10, borderColor:"white"}}>
//192.241.219.250
var ip = 'http://192.241.219.250';

class AccountPlaylist extends Component {
  constructor(props) {
    super(props);
    this.itemsRef = this.props.firebaseApp.database().ref();
  }
  _add(input1, input2, input3, input4) {
    this.itemsRef.push({ username: input1, id: input2, name: input3, score: input4})
  }
  addPlaylist() {
    //Get geolocation
    navigator.geolocation.getCurrentPosition(
      (position) => {
                      var data = { playlistName: this.props.name,
                                   playlistId: this.props.id,
                                   userId: this.props.user,
                                   artwork: this.props.artwork,
                                   geolocation: position };
                      console.log(data);
                      return fetch(ip+':8888/AddPlaylist', {method: 'PUT', headers: {'Accept' : 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(data)})
                      .catch((error) => {
                        console.error(error);
                        });
                      },
      (error) => alert(JSON.stringify(error)),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }
  componentDidMount() {
  }
  render() {
    return(
           <TouchableHighlight onPress={() => this.addPlaylist()} style={{flex:1, borderBottomWidth:0.5, marginLeft:10, marginRight:10, borderColor:"white"}}>
           <View style={{flex:1, flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
              <Image style={{width: 50, height: 50}} source={{uri: this.props.artwork}}/>
              <View style={{marginLeft:10}}>
                <Text style={{flex:2, color:"white", fontWeight:'bold', fontSize:18, marginTop:5}}>
                  {this.props.name}
                </Text>
                <Text style={{flex:1, color:"#BBBBBB", fontSize:15, marginBottom:5}}>
                  {this.props.user}
                </Text>
              </View>
            </View>
           </TouchableHighlight>
    );
  }
}

export default AccountPlaylist
