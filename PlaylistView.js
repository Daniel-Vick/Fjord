import React, { Component, } from 'react'
import { View, Text, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as firebase from 'firebase'


class PlaylistView extends Component {
  constructor(props) {
    super(props);
    this.state = {score: this.props.score, upVoted:false, downVoted:false, upVoteColor:'white', downVoteColor:'white'}
  }
  _navigate(input1, input2, input3, input4) {
    this.props.navigator.push({
      name: 'Playlist', username:input1, id:input2, title:input3, score:input4 // Matches route.name
    })
  }
  _upVote(input1, input2, input3, input4, input5) {
    var scoreChange = 1;
    if (!this.state.upVoted) {
      if (this.state.downVoted) {
        scoreChange++;
        this.setState({downVoted:false, downVoteColor:'white'});
      }
      this.setState({score: this.state.score + scoreChange});
      this.props.db.database().ref(input5).set(
        {username:input1, id:input2, name:input3, score:(input4+scoreChange)});
      this.setState({upVoted:true, upVoteColor:'#7DC1B6'});
    } else {
      this.setState({score: this.state.score - 1, upVoteColor:'white', upVoted: false});
      this.props.db.database().ref(input5).set(
                                               {username:input1, id:input2, name:input3, score:(input4)});
    }
    
  }
  _downVote(input1, input2, input3, input4, input5) {
    var scoreChange = 1;
    if (!this.state.downVoted) {
      if (this.state.upVoted) {
        scoreChange++;
        this.setState({upVoted:false, upVoteColor:'white'});
      }
      this.setState({score: this.state.score - scoreChange});
      this.props.db.database().ref(input5).set(
                                               {username:input1, id:input2, name:input3, score:(input4-scoreChange)});
      this.setState({downVoted:true, downVoteColor:'#7DC1B6'});
    } else {
      this.setState({score: this.state.score + 1, downVoteColor:'white', downVoted: false});
      this.props.db.database().ref(input5).set(
                                               {username:input1, id:input2, name:input3, score:(input4)});
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
           <TouchableHighlight onPress={() => this._upVote(this.props.user, this.props.id, this.props.name, this.props.score, this.props.test)} style={{justifyContent:'center', marginRight:10}}>
            <Icon name="chevron-up" size={15} color={this.state.upVoteColor} />
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this._downVote(this.props.user, this.props.id, this.props.name, this.props.score, this.props.test)} style={{justifyContent:'center', marginRight:10}}>
            <Icon name="chevron-down" size={15} color={this.state.downVoteColor} />
            </TouchableHighlight>
           </View>
           <View style={{flex:1, borderBottomWidth:0.5, borderColor:"white", flexDirection:'row', alignItems:'center'}}>
            <Text style={{color:"white", fontSize:15, fontWeight:'bold'}}>{this.state.score}</Text>
           </View>
           </View>
    );
  }
}

export default PlaylistView
