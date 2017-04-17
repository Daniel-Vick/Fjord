import React, { Component, } from 'react'
import { View, TextInput, Text, Button, ListView, TouchableHighlight, Alert } from 'react-native'
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
  getPlaylists() {
    var that = this;
    var new_url = "https://api.spotify.com/v1/users/" + this.props.username + "/playlists";
    return fetch('https://api.spotify.com/v1/users/moonpie51/playlists', {headers: {'Accept' : 'application/json', 'Authorization' : 'Bearer ' + "BQC7ezRJ0vGKEYQM9NCrjI76JPWLfWiYKH7GBXDwh4loMFusHpvUDo92ceschG58g953DJUQhs_4MkZB_HAgZIUWFhmDjJy0PuVAAR81wyqX7Bifq2mJdSGGUZ9Jcozq9K4pEqpCMEyU160vptw1KjpZmHZLS8RVSnlA3InzkagJxoiI0HKylrVq0GSUxe9LEOpndJQxT44IEKyZfDxK5aY-mEcbLMdh2M7D2bzyRaIH_NJTcT3AyWn1cw"}})
      .then((response) => response.json()).then((responseJson) => {
        var items = responseJson.items;
        var playlistIds = [];
        for (i = 0; i < items.length; i++) {
          playlistIds.push([items[i].id, items[i].name, items[i].owner.id]);
        }
        that.setState({playlists:that.state.dataSource.cloneWithRows(playlistIds)});
      })
      .catch((error) => {
        console.error(error);
      });
  }
  componentDidMount() {
    this.getPlaylists();
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: this.props.BG}}>
            <TouchableHighlight onPress={() => this._navigate()} style={{flexDirection: 'row', flex: 0.5, backgroundColor: this.props.BG, marginTop:20, marginLeft:5}}>
            <Icon
            name={"chevron-left"}
            color={"white"}
            size={20}
            />
            </TouchableHighlight>
        <View style={{flex: 7.5, backgroundColor: this.props.BG}}>
            <ListView dataSource={this.state.playlists} renderRow={(rowData) => <AccountPlaylist firebaseApp={this.props.firebaseApp} id={rowData[0]} name={rowData[1]} user={rowData[2]} score={0}/>}/>
        </View>
      </View>
    )
  }
}

export default Account
