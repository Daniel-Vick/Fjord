import React, { Component, } from 'react'
import { View, TextInput, Text, Button, ListView, TouchableHighlight, AsyncStorage} from 'react-native'
import Song from './Song.js'
import Icon from 'react-native-vector-icons/FontAwesome';

class Search extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {AUTH: '', search: '', dataSource: ds, results: ds.cloneWithRows([""])};
  }
  
  componentDidMount() {
    AsyncStorage.getItem('AUTH_KEY').then((authStr)=>{
                                          this.setState({AUTH: (JSON.parse(authStr).auth_key)});
                                          });
  }
  
  _navigate() {
    this.props.navigator.pop();
  }
  search() {
    var that = this;
    var new_url = "https://api.spotify.com/v1/search?q="+this.state.search+"&type=playlist";
    console.log("###################################");
    console.log("###################################");
    console.log(new_url);
    console.log("###################################");
    console.log("###################################");
    return fetch(new_url, {headers: {'Accept' : 'application/json'}})
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
  render() {
    return (
      <View style={{flex: 1, backgroundColor: this.props.BG}}>
        <TouchableHighlight onPress={() => this._navigate()} style={{flexDirection: 'row', flex: 1, backgroundColor: this.props.BG, marginTop:20, marginLeft:5}}>
          <Icon
            name={"chevron-left"}
            color={"white"}
            size={20}
          />
        </TouchableHighlight>
            <TextInput style={{flex: 1, backgroundColor: this.props.BG, color: 'white', marginLeft:10}} placeholder="Type here!" onChangeText={(text) => this.setState({search: text})}/>
        <Button
            style={{flex:1, marginTop:10}}
            onPress={() => this.search()}
            title="Search"
            color="#FFFFFF"
          />
        <View style={{flex: 15, backgroundColor: this.props.BG}}>
          <ListView dataSource={this.state.results} renderRow={(rowData) => <Song name={rowData[0]} artist={rowData[1]}/>}/>
        </View>
      </View>
    )
  }
}

export default Search
