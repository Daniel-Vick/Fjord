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
  getPlaylists(auth_key, id) {
    console.log(id);
    var that = this;
    var new_url = "https://api.spotify.com/v1/users/" + id + "/playlists";
    return fetch(new_url, {headers: {'Accept' : 'application/json', 'Authorization' : 'Bearer ' + this.props.auth}})
      .then((response) => response.json()).then((responseJson) => {
        var items = responseJson.items;
        var playlistIds = [];
        for (i = 0; i < items.length; i++) {
          playlistIds.push([items[i].id,
                            items[i].name,
                            items[i].owner.id,
                            items[i].images[0].url
                           ]);
        }
        that.setState({playlists:that.state.dataSource.cloneWithRows(playlistIds)});
      })
      .catch((error) => {
        console.error(error);
      });
  }
  componentDidMount() {
    var that = this;
    var url = 'https://api.spotify.com/v1/me';
    fetch(url, {headers: {'Accept' : 'application/json', 'Authorization' : 'Bearer ' + this.props.auth}})
    .then((response) => response.json()).then((responseJson) => {
                                              console.log(responseJson);
                                              AsyncStorage.setItem('USER_INFO', responseJson.id)
            })
    .then(() => {AsyncStorage.multiGet(['AUTH_KEY', 'USER_INFO'], (err, res) => {
                                                            console.log(res)
                                                            that.getPlaylists(res[0][1], res[1][1])})})
    .catch((error) => {
           console.error(error);
           });
    AsyncStorage.multiGet(['AUTH_KEY', 'USER_INFO'], (err, res) => {
                          console.log(res)
                          that.getPlaylists(res[0][1], res[1][1])});
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
