import React, { Component, } from 'react'
import { Text,
  View,
  TextInput,
  ScrollView,
  Navigator,
  TouchableHighlight,
  ListView,
  AlertIOS,
  Button } from 'react-native'
import PlaylistView from './PlaylistView'
import MenuBar from './MenuBar.js'
import * as firebase from 'firebase';


class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.itemsRef = this.props.firebaseApp.database().ref();
    
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //this.state = {text: 'moonpie51', dataSource: ds, playlists: ds.cloneWithRows([""])};
    this.state = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
  };
  }
  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          _key: child.key,
          id: child.val().id,
          name: child.val().name,
          username: child.val().username,
          score: child.val().score
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }
  
  _navigate(input1, input2) {
    this.props.navigator.push({
      name: 'Playlist', url: 'test.com', username:input1, id:input2// Matches route.name
    })
  }
  componentDidMount() {
    console.log("TEst");
    this.listenForItems(this.itemsRef);
  }
  render() {
    return(
      <View style={{flex: 8}}>
        <View style={{flex: 8, backgroundColor: this.props.BG}}>
           <ListView style={{marginTop:20}} dataSource={this.state.dataSource} renderRow={(rowData) => <PlaylistView db={this.props.firebaseApp} navigator={this.props.navigator} id={rowData.id} name={rowData.name} user={rowData.username} score={rowData.score} test={rowData._key}/>}/>
        </View>
      </View>
    );
  }  
}

export default Leaderboard
