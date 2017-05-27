import React, { Component, } from 'react'
import { View, TextInput, Text, Button, ListView, TouchableHighlight, Alert, AsyncStorage } from 'react-native'
import AccountPlaylist from './AccountPlaylist'
import MenuBar from './MenuBar.js'
import Icon from 'react-native-vector-icons/FontAwesome';

class Account extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {search: '', dataSource: ds, playlists: ds.cloneWithRows([""])};
  }
  _navigate() {
    this.props.navigator.pop();
  }
  getPlaylists(auth_key) {
    var that = this;
    var new_url = "https://api.spotify.com/v1/users/" + this.props.username + "/playlists";
    return fetch('https://api.spotify.com/v1/users/moonpie51/playlists', {headers: {'Accept' : 'application/json', 'Authorization' : 'Bearer ' + auth_key}})
      .then((response) => response.json()).then((responseJson) => {
        var items = responseJson.items;
        var playlistIds = [];
                                                console.log("ITEMS");
        for (i = 0; i < items.length; i++) {
          playlistIds.push([items[i].id,
                            items[i].name,
                            items[i].owner.id,
                            items[i].images[0].url
                           ]);
        }
                                                console.log(playlistIds);
        that.setState({playlists:that.state.dataSource.cloneWithRows(playlistIds)});
      })
      .catch((error) => {
        console.error(error);
      });
  }
  componentDidMount() {
    AsyncStorage.getItem('AUTH_KEY').then((authStr)=>{
                                          console.log("##########TEST DB#############");
                                          console.log(this.getPlaylists(JSON.parse(authStr).auth_key));
                                          });
  }
  render() {
    return (
      <View style={{flex: 10, backgroundColor: this.props.BG}}>
        <View style={{flex: 1, backgroundColor: "#7DC1B6", flexDirection: 'row'}}>
            <TouchableHighlight onPress={() => this._navigate()} style={{flexDirection: 'row', flex:1, marginTop: 25, paddingLeft: 5}}>
            <Icon
            name={"chevron-left"}
            color={"white"}
            size={25}
            />
            </TouchableHighlight>
            <View style={{marginTop:25, flex: 8, alignItems:'center'}}>
            <Text style={{color:'white', fontSize: 18}}>Your Playlists</Text>
            </View>
            <View style={{flex:1}}>
            </View>
        </View>
        <View style={{flex: 9, backgroundColor: this.props.BG}}>
            <ListView dataSource={this.state.playlists} renderRow={(rowData) => <AccountPlaylist firebaseApp={this.props.firebaseApp} id={rowData[0]} name={rowData[1]} user={rowData[2]} score={0} artwork={rowData[3]}/>}/>
        </View>
      </View>
    )
  }
}

export default Account
