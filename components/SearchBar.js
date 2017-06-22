import React, { Component, } from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import SearchBox from 'react-native-search-box'
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');

var styles = StyleSheet.create({
                               title: {flex:2, color:"white", fontWeight:'bold', fontSize:18, marginTop:5},
                               user:  {flex:1, color:"white", fontSize:15, marginBottom:5}
                               
});

const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

class SearchBar extends Component {
 constructor(props) {
    super(props);
  }
  test() {
    console.log("Button Pressed!");
  }
  /*
    <TouchableHighlight onPress={() => this.test()} style={{marginLeft:40, marginRight: 40, marginTop: 25, backgroundColor:this.props.BG}}><Text>Search</Text></TouchableHighlight>
    backgroundColor="#7DC1B6"
    
    AIzaSyCanpgLmdaH21GZEWSHwuLlIzBoy1ddBww
 */
 setLoc(loc) {
  console.log("SearchProps");
  console.log(this.props);
  this.props.setLoc(loc);
 }
  render() {
    return(
      <View style={{flex:1, backgroundColor:this.props.BG}}>
        <TouchableHighlight onPress={() => this.setLoc("TestLoc")}>
          <Text>Test Button</Text>
        </TouchableHighlight>
        <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed='auto'    // true/false/undefined
        fetchDetails={true}
        renderDescription={(row) => row.description} // custom description render
        onPress={(data, details = null) => {
          console.log("Test");// 'details' is provided when fetchDetails = true
          console.log(data);
          console.log(details);
        }}
        getDefaultValue={() => {
          return ''; // text input default value
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyCanpgLmdaH21GZEWSHwuLlIzBoy1ddBww',
          language: 'en', // language of the results
        }}
        styles={{
          description: {
            fontWeight: 'bold',
            color: 'white',
          },
          predefinedPlacesDescription: {
            color: 'white',
          },
        }}

        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'food',
        }}


        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

        predefinedPlaces={[homePlace, workPlace]}

        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />
    </View>
    );
  }
}
/*
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');

const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

var SearchBar = React.createClass({
  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed='auto'    // true/false/undefined
        fetchDetails={true}
        renderDescription={(row) => row.description} // custom description render
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          console.log(data);
          console.log(details);
        }}
        getDefaultValue={() => {
          return ''; // text input default value
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyCanpgLmdaH21GZEWSHwuLlIzBoy1ddBww',
          language: 'en', // language of the results
        }}
        styles={{
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}

        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'food',
        }}


        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

        predefinedPlaces={[homePlace, workPlace]}

        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.

      />
    );
  }
});*/

export default SearchBar
