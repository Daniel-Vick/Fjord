import React, { Component, } from 'react'
import { Text,
  View,
  StyleSheet,
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

var styles = StyleSheet.create({
    tabInactive: {
       flex:1, flexDirection: 'row', backgroundColor: "#313C4F", alignItems:'center', justifyContent:'center', borderWidth: 2, borderColor: "#7DC1B6"
    },
    tabActive: {
       flex:1, flexDirection: 'row', backgroundColor:"#7DC1B6", alignItems:'center', justifyContent:'center', borderWidth: 2, borderColor: "#7DC1B6"
    },
    tabFont: {
      color: 'white', fontWeight: 'bold', fontSize: 15
    }

});

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.itemsRef = this.props.firebaseApp.database().ref();
    //this.state = {text: 'moonpie51', dataSource: ds, playlists: ds.cloneWithRows([""])};
    this.state = {
    dataSourceTop: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
    dataSourceNew: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    lead: "Top",
    activeTab: 0,
    tabStyles: [styles.tabActive, styles.tabInactive, styles.tabInactive]
  };
  }
  switchDataSource(source) {
    if (source == "Top") {
      this.setState({activeTab: 0, tabStyles: [styles.tabActive, styles.tabInactive, styles.tabInactive],lead: "Top"});
      
    } else if (source == "New") {
      this.setState({activeTab: 0, tabStyles: [styles.tabInactive, styles.tabActive, styles.tabInactive],lead: "New"});
    } else {
      this.setState({activeTab: 0, tabStyles: [styles.tabInactive, styles.tabInactive, styles.tabActive],lead: "New"});
    }
  }
  listenForItems(itemsRef) {
    itemsRef.orderByChild("score").once('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          _key: child.key,
          id: child.val().id,
          name: child.val().name,
          username: child.val().username,
          score: child.val().score,
          type1: "Top"
        });
      });
      items = items.reverse();

      this.setState({
        dataSourceTop: this.state.dataSourceTop.cloneWithRows(items)
      });
    });
    itemsRef.once('value', (snap) => {
      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          _key: child.key,
          id: child.val().id,
          name: child.val().name,
          username: child.val().username,
          score: child.val().score,
          type2: "New"
        });
      });
      items = items.reverse();
                                        
      this.setState({
        dataSourceNew: this.state.dataSourceNew.cloneWithRows(items)
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
  test(input) {
    if (input == "Top") {
      return (<ListView dataSource={this.state.dataSourceTop} renderRow={(rowData) => <PlaylistView db={this.props.firebaseApp} navigator={this.props.navigator} id={rowData.id} name={rowData.name} user={rowData.username} score={rowData.score} _key={rowData._key}/>}/>);
    } else if (input == "New") {
      return (<ListView dataSource={this.state.dataSourceNew} renderRow={(rowData1) => <PlaylistView db={this.props.firebaseApp} navigator={this.props.navigator} id={rowData1.id} name={rowData1.name} user={rowData1.username} score={rowData1.score + 1} _key={rowData1._key}/>}/>);
    }
  }
  render() {
    return(
      <View style={{flex: 8, backgroundColor:this.props.BG}}>
        <View style={{flex:1, backgroundColor: this.props.BG, flexDirection: 'row', alignItems:'center', justifyContent:'center', marginLeft:50, marginRight:50}}>
           <TouchableHighlight  style={this.state.tabStyles[0]} onPress={() => this.switchDataSource("Top")}>
           <Text style={styles.tabFont}>Top</Text>
           </TouchableHighlight>
           <TouchableHighlight style={this.state.tabStyles[1]} onPress={() => this.switchDataSource("New")}>
           <Text style={styles.tabFont}>New</Text>
           </TouchableHighlight>
           <TouchableHighlight style={this.state.tabStyles[2]} onPress={() => this.switchDataSource("Friends")}>
           <Text style={styles.tabFont}>Friends</Text>
           </TouchableHighlight>
        </View>
        <View style={{flex: 7, backgroundColor: this.props.BG}}>
           {this.test(this.state.lead)}
        </View>
      </View>
    );
  }  
}

export default Leaderboard
