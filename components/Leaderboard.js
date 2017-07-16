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
  RefreshControl,
  Button } from 'react-native'
import PlaylistView from './PlaylistView'
import MenuBar from './MenuBar.js'
import { LeaderboardStyle } from './Styles'

//var ip = 'http://192.241.219.250';
var ip = 'http://10.1.10.171';

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.updateLead = this.updateLead.bind(this);
    var dsTop = new ListView.DataSource({
                                        rowHasChanged: (row1, row2) => row1 !== row2,
                                        });
    var dsNew = new ListView.DataSource({
                                        rowHasChanged: (row1, row2) => row1 !== row2,
                                        })
    this.state = {
    refreshing: false,
    dataSourceTop: dsTop,
    dataSourceNew: dsNew,
    dbArrayTop: null,
    dbArrayNew: null,
    lead: "Top",
    activeTab: 0,
    tabStyles: [LeaderboardStyle.tabActive, LeaderboardStyle.tabFontActive,  LeaderboardStyle.tabInactive, LeaderboardStyle.tabFontInactive, LeaderboardStyle.tabInactive, LeaderboardStyle.tabFontInactive]
  };
  }
  switchDataSource(source) {
    this.props.setLeaderboard(source);
    if (source == "Top") {
      this.setState({activeTab: 0, tabStyles: [LeaderboardStyle.tabActive, LeaderboardStyle.tabFontActive, LeaderboardStyle.tabInactive, LeaderboardStyle.tabFontInactive, LeaderboardStyle.tabInactive, LeaderboardStyle.tabFontInactive],lead: "Top"});
      
    } else if (source == "New") {
      this.setState({activeTab: 0, tabStyles: [LeaderboardStyle.tabInactive, LeaderboardStyle.tabFontInactive, LeaderboardStyle.tabActive, LeaderboardStyle.tabFontActive, LeaderboardStyle.tabInactive, LeaderboardStyle.tabFontInactive],lead: "New"});
    } else {
      this.setState({activeTab: 0, tabStyles: [LeaderboardStyle.tabInactive, LeaderboardStyle.tabFontInactive, LeaderboardStyle.tabInactive, LeaderboardStyle.tabFontInactive, LeaderboardStyle.tabActive, LeaderboardStyle.tabFontActive],lead: "New"});
    }
  }
  addToLeaderBoard(res) {
    var itemsTop = [];
    var itemsNew = [];
    for (var i = 0; i < res.top.length; i++) {
      itemsTop.push({
                  _key: res.top[i]._id,
                  id: res.top[i].playlistId,
                  name: res.top[i].playlistName,
                  username: res.top[i].userId,
                  artwork: res.top[i].artwork,
                  score: res.top[i].score,
                  type1: "Top",
                  vote: res.top[i].vote
                  });
    }
    for (var i = 0; i < res.newSort.length; i++) {
      itemsNew.push({
                  _key: res.newSort[i]._id,
                  id: res.newSort[i].playlistId,
                  name: res.newSort[i].playlistName,
                  username: res.newSort[i].userId,
                  artwork: res.newSort[i].artwork,
                  score: res.newSort[i].score,
                  type1: "Top",
                  vote: res.newSort[i].vote
                  });
    }

    this.setState({
                  dbArrayTop: itemsTop,
                  dataSourceTop: this.state.dataSourceTop.cloneWithRows(itemsTop)
                  });
    this.setState({
                  dbArrayNew: itemsNew,
                  dataSourceNew: this.state.dataSourceNew.cloneWithRows(itemsNew)
                  });
    this.setState({refreshing: false});
  }
  listenFjord() {
    var that;
    var data = { playlistName: this.props.name, playlistId: this.props.id, userId: this.props.user };
    navigator.geolocation.getCurrentPosition(
      (position) => {
                      console.log("Cur pos");
                      console.log(position);
                      var data = {'position': this.props.location};
                      return fetch(ip+':8888/Top', {method: 'POST', headers: {'Accept' : 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(data)}).then((response) => response.json()).then((responseJSON) => this.addToLeaderBoard(responseJSON))
                          .catch((error) => {
                            console.error(error);
                          });
                      },
      (error) => alert(JSON.stringify(error)),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    
    
    
  }
  updateLead(key, val, vote) {
    var updatedNew = this.state.dbArrayNew.slice();
    var updatedTop = this.state.dbArrayTop.slice();
    for (var i = 0; i < this.state.dbArrayNew.length; i++) {
      if (key == this.state.dbArrayNew[i]._key) {
        updatedNew[i] = {_key: key,
                         id: updatedNew[i].id,
                         name: updatedNew[i].name,
                         username: updatedNew[i].username,
                         artwork: updatedNew[i].artwork,
                         score: val,
                         type2: "New",
                         vote: vote}

      } else {
        updatedNew[i] = {_key: updatedNew[i]._key,
                         id: updatedNew[i].id,
                         name: updatedNew[i].name,
                         username: updatedNew[i].username,
                         artwork: updatedNew[i].artwork,
                         score: updatedNew[i].score,
                         type2: "New",
                         vote: updatedNew[i].vote}
      }
    }
    for (var i = 0; i < this.state.dbArrayTop.length; i++) {
      if (key == this.state.dbArrayTop[i]._key) {

        updatedTop[i] = {_key: key,
                         id: updatedTop[i].id,
                         name: updatedTop[i].name,
                         username: updatedTop[i].username,
                         artwork: updatedTop[i].artwork,
                         score: val,
                         type1: "Top",
                         vote: vote}
      } else {
        updatedTop[i] = {_key: updatedTop[i]._key,
                         id: updatedTop[i].id,
                         name: updatedTop[i].name,
                         username: updatedTop[i].username,
                         artwork: updatedTop[i].artwork,
                         score: updatedTop[i].score,
                         type1: "Top",
                         vote: updatedTop[i].vote}
      }
    }

    this.setState({dataSourceNew: this.state.dataSourceNew.cloneWithRows(updatedNew), dataSourceTop: this.state.dataSourceTop.cloneWithRows(updatedTop), dbArrayTop: updatedTop, dbArrayNew: updatedNew});
  }
  _navigate(input1, input2) {
    this.props.navigator.push({
      name: 'Playlist', url: 'test.com', username:input1, id:input2// Matches route.name
    })
  }
  _onRefresh() {
    var that = this;
    this.setState({refreshing: true});
    this.listenFjord();
  }
  componentDidMount() {
    this.listenFjord();
  }
  switchTab(input, loc) {
    console.log("Dis da remix");
    console.log(loc);
    
    if (input == "Top") {
      return (<ListView refreshControl={
              <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              />
              } dataSource={this.state.dataSourceTop} renderRow={(rowData) => <PlaylistView navigator={this.props.navigator} id={rowData.id} name={rowData.name} user={rowData.username} score={rowData.score} _key={rowData._key} updateLead={this.updateLead} vote={rowData.vote} artwork={rowData.artwork}/>}/>);
    } else if (input == "New") {
      return (<ListView refreshControl={
              <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              />
              } dataSource={this.state.dataSourceNew} renderRow={(rowData1) => <PlaylistView navigator={this.props.navigator} id={rowData1.id} name={rowData1.name} user={rowData1.username} score={rowData1.score} _key={rowData1._key} updateLead={this.updateLead} vote={rowData1.vote} artwork={rowData1.artwork}/>}/>);
    }
  }
  test
  render() {
    return(
      <View style={LeaderboardStyle.topView}>
        <View style={LeaderboardStyle.navView}>
           
           <TouchableHighlight style={this.state.tabStyles[2]} onPress={() => this.switchDataSource("New")}>
           <Text style={this.state.tabStyles[3]}>New</Text>
           </TouchableHighlight>
           <TouchableHighlight  style={this.state.tabStyles[0]} onPress={() => this.switchDataSource("Top")}>
           <Text style={this.state.tabStyles[1]}>Top</Text>
           </TouchableHighlight>
           <TouchableHighlight style={this.state.tabStyles[4]} onPress={() => this.switchDataSource("Friends")}>
           <Text style={this.state.tabStyles[5]}>Friends</Text>
           </TouchableHighlight>
        </View>
        <View style={LeaderboardStyle.listView}>
           {this.switchTab(this.props.leaderboard, this.props.location)}
        </View>
      </View>
    );
  }  
}

export default Leaderboard
