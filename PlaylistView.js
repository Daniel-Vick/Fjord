import React, { Component, } from 'react'
import { View, Text, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as firebase from 'firebase'


class PlaylistView extends Component {
  constructor(props) {
    super(props);
    this.state = {score: this.props.score - this.props.score, upVoted:false, downVoted:false, upVoteColor:'white', downVoteColor:'white'}
  }
  _navigate(input1, input2, input3, input4) {
    this.props.navigator.push({
      name: 'Playlist', username:input1, id:input2, title:input3, score:input4 // Matches route.name
    })
  }
  _upVote(input1, input2, input3, input4, input5) {
    var scoreChange = 1;
    if (!(this.props.vote === 1)) {
      if (this.props.vote == -1) {
        scoreChange++;
      }
      this.props.updateLead(this.props._key, this.props.score + scoreChange, 1);
      this.props.db.database().ref(input5).update({score: this.props.score + scoreChange});
    } else {
      this.props.updateLead(this.props._key, this.props.score - 1, 0);
      this.props.db.database().ref(input5).update({score: this.props.score - 1});
    }
    
  }
  _downVote(input1, input2, input3, input4, input5) {
    var scoreChange = 1;
    console.log(this.props.vote);
    if (!(this.props.vote === -1)) {
      if (this.props.vote === 1) {
        scoreChange++;
      }
      this.props.updateLead(this.props._key, this.props.score - scoreChange, -1);
      this.props.db.database().ref(input5).update({score: this.props.score - scoreChange});
    } else {
      console.log("FUUCKKKK");
      this.props.updateLead(this.props._key, this.props.score + 1, 0);
      this.props.db.database().ref(input5).update({score: this.props.score + 1});
    }
    
  }
  render() {
    return(
         <View style={{flex: 1, flexDirection: 'row', marginLeft:10, marginRight:10}} >

           <TouchableHighlight onPress={() => this._navigate(this.props.user, this.props.id, this.props.name)} style={{flex: 9, borderBottomWidth:0.5, borderColor:"white"}}>
            <View style={{flex:1}}>
              <Text style={{flex:2, color:"white", fontWeight:'bold', fontSize:15, marginTop:5}}>{this.props.name}</Text>
              <Text style={{flex:1, color:"#EEEEEE", fontSize:12, marginBottom:5}}>{this.props.user}</Text>
            </View>
           </TouchableHighlight>

           <View style={{flex:1, paddingTop: 5, borderBottomWidth:0.5, borderColor:"white"}}>
           <TouchableHighlight onPress={() => this._upVote(this.props.user, this.props.id, this.props.name, this.props.score, this.props._key)} style={{justifyContent:'center', marginRight:10}}>
            <Icon name="chevron-up" size={15} color={'white'} />
            </TouchableHighlight>

            <TouchableHighlight onPress={() => this._downVote(this.props.user, this.props.id, this.props.name, this.props.score, this.props._key)} style={{justifyContent:'center', marginRight:10}}>
            <Icon name="chevron-down" size={15} color={'white'} />
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
