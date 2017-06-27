// Search for giphs.

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';

class SearchResults extends Component {

  // We are setting the initial state of this.state.topic to ''.
  constructor(props) {
    super(props);
    this.state = {
      topic: "",
      searchResults: []
    };
  }

  // When the component receives new props (e.g., when the user searches)...
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);

    // We will run the fetchData() function with the topic as an argument.
    this.fetchData(nextProps.topic);

  }

  // The fetchData function makes an AJAX call to Giphy API.
  fetchData(topic) {
    // We pass the topic the user entered in into the URL for the API call.
    fetch('https://api.giphy.com/v1/gifs/search?q=" + topic  + "&limit=5&api_key=dc6zaTOxFJmzC&rating=g')
    .then(response => response.json())
    .then((responseData) => {
      console.log("Response data: " + responseData);
      var giphyArray = responseData.data
      console.log("The array of giphs: " + giphyArray);
      console.log("Show me image url: " + giphyArray[0].images.fixed_width_small.url);
      this.setState({ searchResults: giphyArray });
    })
    .catch(err => console.log(err));
  }

  viewGiphyImages() {
    return this.state.searchResults.map(function(result, i) {
      return (
        <View style={styles.horizontal} key={i}>
          <Image
            style={styles.stretch}
            source={{uri: result.images.fixed_width.url}}>
          </Image>
        </View>
      );
    });
  }

  render() {

    // If we have recieved search results, display this:
    if (this.state.searchResults != "") {

      return (
        <View>
          {this.viewGiphyImages()}
        </View>
      );

      // If the user hasn't searched for anything yet, display this:
    }
    return (
      <View style={styles.item}>
        <Text style={styles.txt}>
          <Text style={{
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'center',
            fontSize: 18
          }}
          >
            Search for Giphy topic to begin!
          </Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  horizontal: {
    flexDirection: 'row'
  },
  stretch: {
    width: 300,
    height: 300,
    margin: 5
  },
  txt: {
    fontSize: 16,
    color: 'white'
  },
  item: {
    margin: 10,
    backgroundColor: 'rgba(0,0,0,0)',
    padding: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  }
});

export default SearchResults;