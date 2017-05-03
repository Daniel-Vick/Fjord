import React, { Component, } from 'react'
import { View, Button, ListView, Text, TouchableHighlight, AsyncStorage } from 'react-native'
import Song from './Song.js'
import MenuBar from './MenuBar.js'
import Icon from 'react-native-vector-icons/FontAwesome';

class Playlist extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {dataSource: ds, songs: ds.cloneWithRows([""])};
  }
  _navigate() {
    this.props.navigator.pop();
  }
  addPlaylist() {
    AsyncStorage.getItem('AUTH_KEY').then((authStr)=>{
                                          this.playlistAddAPICall(JSON.parse(authStr).auth_key);
                                          });
  }
  playlistAddAPICall(auth_key) {
    var that = this;
    var data = {"public":false}
    var JSONData = JSON.stringify(data);
    var new_url = "https://api.spotify.com/v1/users/spotify/playlists/37i9dQZF1DX0XUsuxWHRQd/followers";
    fetch(new_url, {method: 'PUT', headers: {'Accept' : 'application/json', 'Authorization' : 'Bearer ' + auth_key, 'Content-Type': 'application/json'}, body: JSON.stringify({"public":false})})
    .then((response) => {
           console.log(JSON.stringify(response));
           });
  }
  componentDidMount() {
    AsyncStorage.getItem('AUTH_KEY').then((authStr)=>{
                                          console.log("##########TEST DB#############");
                                          console.log(this.getSongs(JSON.parse(authStr).auth_key));
                                          });
  }
  getSongs(auth_key) {
    var that = this;
    var new_url = "https://api.spotify.com/v1/users/"+this.props.username+"/playlists/" + this.props.id;
    return fetch(new_url, {headers: {'Accept' : 'application/json', 'Authorization' : 'Bearer ' + auth_key}})
      .then((response) => response.json()).then((responseJson) => {
        var items = responseJson.tracks.items;
        var songNames = [];
        for (i = 0; i < items.length; i++) {
          songNames.push([items[i].track.name, items[i].track.artists[0].name]);
        }
        that.setState({songs:that.state.dataSource.cloneWithRows(songNames)});
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  render() {
    return(
      <View style={{flex: 1, backgroundColor: this.props.BG}}>
        <View style={{flexDirection: 'row', flex: 1, backgroundColor: this.props.BG, marginTop: 5}}>
          <TouchableHighlight onPress={() => this._navigate()} style={{flexDirection: 'row', flex: 1, backgroundColor: this.props.BG, marginTop:20, marginLeft:5}}>
            <Icon name={"chevron-left"} color={"white"} size={20} />
          </TouchableHighlight>
          <View style={{backgroundColor:this.props.BG, flex:8, alignItems:'center', marginTop:10, marginRight:20}}>
            <Text style={{color:"white", fontWeight:'bold', fontSize:20, marginTop:5}}>{this.props.title}</Text>
          </View>
          <TouchableHighlight onPress={() => this.addPlaylist()} style={{flexDirection: 'row', flex: 1, backgroundColor: this.props.BG, marginTop:20, marginRight:5}}>
            <Icon name={"check"} color={"white"} size={20} />
          </TouchableHighlight>
        </View>
        <View style={{flex: 8, backgroundColor: this.props.BG}}>
          <ListView dataSource={this.state.songs} renderRow={(rowData) => <Song name={rowData[0]} artist={rowData[1]}/>}/>
        </View>
      </View>
    );
  }
}

export default Playlist
