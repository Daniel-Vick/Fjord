import React, { Component, } from 'react'
import { View, Button, ListView, Text, TouchableHighlight } from 'react-native'
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
  componentDidMount() {
    this.getSongs();
  }
  getSongs() {
    var that = this;
    var new_url = "https://api.spotify.com/v1/users/"+this.props.username+"/playlists/" + this.props.id;
    return fetch(new_url, {headers: {'Accept' : 'application/json', 'Authorization' : 'Bearer ' + this.props.auth}})
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
            <Text style={{color:"white", fontWeight:'bold', fontSize:15, marginTop:5}}>{this.props.title}</Text>
          </View>
        </View>
        <View style={{flex: 8, backgroundColor: this.props.BG}}>
          <ListView dataSource={this.state.songs} renderRow={(rowData) => <Song name={rowData[0]} artist={rowData[1]}/>}/>
        </View>
      </View>
    );
  }
}

export default Playlist
