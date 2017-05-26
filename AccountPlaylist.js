import React, { Component, } from 'react'
import { View, Text, TouchableHighlight} from 'react-native'
import * as firebase from 'firebase';

//           <TouchableHighlight onPress={() => this._add(this.props.user, this.props.id, this.props.name, this.props.score)} style={{flex:1, borderBottomWidth:0.5, marginLeft:10, marginRight:10, borderColor:"white"}}>
//192.241.219.250
var ip = 'http://192.168.1.90';

class AccountPlaylist extends Component {
  constructor(props) {
    super(props);
    this.itemsRef = this.props.firebaseApp.database().ref();
  }
  _add(input1, input2, input3, input4) {
    this.itemsRef.push({ username: input1, id: input2, name: input3, score: input4})
  }
  test() {
    var data = { playlistName: this.props.name, playlistId: this.props.id, userId: this.props.user };
    console.log("#####################TEST##############");
    console.log(this.props.name + " " + this.props.id + " " + this.props.user);
    return fetch(ip+':8888/Insert', {method: 'PUT', headers: {'Accept' : 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(data)})
    .then((response) => console.log(response))
    
    .catch((error) => {
           console.error(error);
           });
  }
  render() {
    return(
           <TouchableHighlight onPress={() => this.test()} style={{flex:1, borderBottomWidth:0.5, marginLeft:10, marginRight:10, borderColor:"white"}}>
           <View style={{flex:1}}>
           <Text style={{flex:2, color:"white", fontWeight:'bold', fontSize:15, marginTop:5}}>{this.props.name}</Text>
           <Text style={{flex:1, color:"#BBBBBB", fontSize:12, marginBottom:5}}>{this.props.user}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default AccountPlaylist
