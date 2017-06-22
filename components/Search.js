import NavigationBar from 'react-native-navbar'
import React, { Component, } from 'react'
import { View, TextInput, Text, Button, ListView, TouchableHighlight, AsyncStorage, StyleSheet} from 'react-native'
import Song from './Song.js';
import SearchBar from './SearchBar.js';
import Icon from 'react-native-vector-icons/FontAwesome';
var MapView = require('react-native-maps');

class Search extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {AUTH: '', search: '', dataSource: ds, results: ds.cloneWithRows([""])};
  }
  
  componentDidMount() {
    console.log("STARTPROPS");
    console.log(this.props.auth_key);
    AsyncStorage.getItem('AUTH_KEY').then((authStr)=>{
                                          this.setState({AUTH: authStr});
                                          });
  }
  
  search() {
    var that = this;
    var new_url = "https://api.spotify.com/v1/search?q="+this.state.search+"&type=playlist";
    return fetch(new_url, {headers: {'Accept' : 'application/json', 'Authorization' : 'Bearer ' + this.state.AUTH}})
      .then((response) => response.json()).then((responseJson) => {
                                                console.log(JSON.stringify(responseJson));
        var items = responseJson.playlists.items;
        var songNames = [];
        for (i = 0; i < items.length; i++) {
          songNames.push([items[i].name, items[i].owner.id]);
        }
        that.setState({results:that.state.dataSource.cloneWithRows(songNames)});
      })
      .catch((error) => {
        console.error(error);
      });
  }
  /*
  <View style={{flex: 7, backgroundColor: this.props.BG}}>
          <ListView dataSource={this.state.results} renderRow={(rowData) => <Song name={rowData[0]} artist={rowData[1]}/>}/>
        </View>
        
        
        <View style={{flex: 1, backgroundColor: "#7DC1B6", flexDirection: 'row'}}>
            <View style={{marginTop:25, flex: 8, alignItems:'center'}}>
            <Text style={{color:'white', fontSize: 18}}>Explore</Text>
            </View>
        </View>
  */
  render() {
    return (
      <View style={{flex: 10, backgroundColor: this.props.BG}}>
        <View style={{flex: 1, backgroundColor: "#7DC1B6", flexDirection: 'row'}}>
            <View style={{marginTop:25, flex: 8, alignItems:'center'}}>
            <Text style={{color:'white', fontSize: 18}}>Explore</Text>
            </View>
        </View>
        
        <View style={{flex: 9, backgroundColor: this.props.BG}}>
          <SearchBar setLoc={this.props.setLocation}BG={this.props.BG}/>
          <MapView style={styles.map}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  map: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
});

export default Search
