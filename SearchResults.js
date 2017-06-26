// Similar to movie search, a search for nytimes articles.

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native';

class SearchResults extends Component {

  // We are setting the initial state of this.state.movie to ''.
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
    fetch('https://api.giphy.com/v1/gifs/search?q=" + topic  + "&limit=5&api_key=dc6zaTOxFJmzC')
    .then(response => response.json())
    .then((responseData) => {
      console.log("Response data: " + responseData);
      var giphyArray = responseData.data
      console.log("The array of giphs: " + giphyArray);
      this.setState({ searchResults: giphyArray });
    })
    .catch(err => console.log(err));
  }

  render() {

    const giphyList = this.state.searchResults.map((data) => {})

    // If we have recieved search results, display this:
    if (this.state.searchResults != "") {
      return (
        <View style={styles.item}>
          <Image
            style={{width: 50, height: 50}}
            source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
          />
          <Text style={styles.txt}>
            <Text style={{ fontWeight: 'bold' }}>
              Title:
            </Text>
              {this.state.searchResults[0].url}
            {"\n"}
          </Text>
          <Text style={styles.txt}>
            <Text style={{ fontWeight: 'bold'}}>
              Year:
            </Text>
              {this.state.searchResults[0].rating}
            {"\n"}
          </Text>
        </View>
      );

      // If the user hasn't searched for anything yet, display this:
    }
    return (
      <View style={styles.item}>
        <Text style={styles.txt}>
          <Text style={{
            fontWeight: 'bold',
            color: 'white',
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
  txt: {
    fontSize: 16,
    color: 'white'
  },
  item: {
    margin: 10,
    backgroundColor: 'rgba(76,217,175,1)',
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