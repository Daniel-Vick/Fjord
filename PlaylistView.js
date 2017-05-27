import React, { Component, } from 'react'
import { View, Text, TouchableHighlight, Image, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as firebase from 'firebase'

var styles = StyleSheet.create({
                               title: {flex:2, color:"white", fontWeight:'bold', fontSize:18, marginTop:5},
                               user:  {flex:1, color:"white", fontSize:15, marginBottom:5}
                               
                               
                               });

var ip = 'http://192.168.1.90';

class PlaylistView extends Component {
  constructor(props) {
    super(props);
    this.state = {score: this.props.score - this.props.score, upVoted:false, downVoted:false, upVoteColor:["white", "white", "#7DC1B6"], downVoteColor:["#7DC1B6", "white", "white"]}
  }
  _navigate(input1, input2, input3, input4) {
    this.props.navigator.push({
      name: 'Playlist', username:input1, id:input2, title:input3, score:input4 // Matches route.name
    })
  }
  upvoteAdd(data) {
    fetch(ip+':8888/AddUpvote', {method: 'PUT', headers: {'Accept' : 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(data)})
    .then((response) => console.log(response))
    
    .catch((error) => {
           console.error(error);
           });
  }
  upvoteRemove(data) {
    fetch(ip+':8888/RemoveUpvote', {method: 'PUT', headers: {'Accept' : 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(data)})
    .then((response) => console.log(response))
    
    .catch((error) => {
           console.error(error);
           });
  }
  downvoteAdd(data) {
    fetch(ip+':8888/AddDownvote', {method: 'PUT', headers: {'Accept' : 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(data)})
    .then((response) => console.log(response))
    
    .catch((error) => {
           console.error(error);
           });
  }
  downvoteRemove(data) {
    fetch(ip+':8888/RemoveDownvote', {method: 'PUT', headers: {'Accept' : 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(data)})
    .then((response) => console.log(response))
    
    .catch((error) => {
           console.error(error);
           });
  }
  _upVote(input1, input2, input3, input4, input5) {
    var scoreChange = 1;
    var data = { playlistId: this.props.id, userId: this.props.user, score: 0};
    if (!(this.props.vote === 1)) {
      if (this.props.vote == -1) {
        scoreChange++;
      }
      //this.props.db.database().ref(input5+'/upvotes').push({Username: input1});
      data.score = this.props.score + scoreChange;
      this.upvoteAdd(data);
      if (scoreChange > 1) this.downvoteRemove(data);
      
      this.props.updateLead(this.props._key, this.props.score + scoreChange, 1);
      //this.props.db.database().ref(input5).update({score: this.props.score + scoreChange});
    } else {
            data.score = this.props.score -1;
      this.upvoteRemove(data)
      this.props.updateLead(this.props._key, this.props.score - 1, 0);
      //this.props.db.database().ref(input5).update({score: this.props.score - 1});
    }
    
  }
  _downVote(input1, input2, input3, input4, input5) {
    var scoreChange = 1;
    var data = { playlistId: this.props.id, userId: this.props.user };
    console.log(this.props.vote);
    if (!(this.props.vote === -1)) {
      if (this.props.vote === 1) {
        scoreChange++;
      }
      data.score = this.props.score - scoreChange;
      this.downvoteAdd(data);
      if (scoreChange > 1) this.upvoteRemove(data);
      //this.props.db.database().ref(input5+'/downvotes').push({Username: input1});
      this.props.updateLead(this.props._key, this.props.score - scoreChange, -1);
      //this.props.db.database().ref(input5).update({score: this.props.score - scoreChange});
    } else {
            data.score = this.props.score + 1;
      this.downvoteRemove(data);
      this.props.updateLead(this.props._key, this.props.score + 1, 0);
      //this.props.db.database().ref(input5).update({score: this.props.score + 1});
    }
    
  }

  render() {
    return(
           <View style={{flex: 1, flexDirection: 'row', marginLeft:10, marginRight:10}} >

           <TouchableHighlight onPress={() => this._navigate(this.props.user, this.props.id, this.props.name)} style={{flex: 9, borderBottomWidth:0.5, borderColor:"white"}}>
           <View style={{flex:1, flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
           <Image style={{width: 50, height: 50}} source={{uri: this.props.artwork}}/>
           <View style={{marginLeft: 10}}>
              <Text style={styles.title}>{this.props.name}</Text>
              <Text style={styles.user}>{this.props.user}</Text>
              </View>
            </View>
           </TouchableHighlight>

           <View style={{flex:1, paddingTop:10, paddingBottom:10, borderBottomWidth:0.5, borderColor:"white"}}>
           <TouchableHighlight onPress={() => this._upVote(this.props.user, this.props.id, this.props.name, this.props.score, this.props._key)} style={{justifyContent:'center', marginRight:10}}>
            <Icon name="chevron-up" size={25} color={this.state.upVoteColor[this.props.vote + 1]} />
            </TouchableHighlight>

            <TouchableHighlight onPress={() => this._downVote(this.props.user, this.props.id, this.props.name, this.props.score, this.props._key)} style={{justifyContent:'center', marginRight:10}}>
            <Icon name="chevron-down" size={25} color={this.state.downVoteColor[this.props.vote + 1]} />
            </TouchableHighlight>

           </View>
           <View style={{flex:1, borderBottomWidth:0.5, borderColor:"white", flexDirection:'row', alignItems:'center'}}>
            <Text style={{color:"white", fontSize:15, fontWeight:'bold'}}>{this.props.score}</Text>
           </View>
           
         </View>
    );
  }
}

export default PlaylistView
