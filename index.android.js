/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions
} from 'react-native';

import SearchResults from './SearchResults.js';
import popcornImg from './popcorn.png';

export default class AwesomeProject extends Component {
  // We are setting the initial state of this.state.movie to ''.
  constructor(props) {
    super(props);
    this.state = {
      topic: "",
      searchResults: []
    };
    this.renderSearch = this.renderSearch.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }
  handleSearchSubmit(event) {
    this.setState({ topic: event.nativeEvent.text });
  }
  renderSearch() {
    if (this.state.topic) {
      return (
        <SearchResults topic={this.state.topic} />
      );
    }
    return null;
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Giphy Search
          </Text>
        </View>
        <View>
          <TextInput
            autoFocus
            style={styles.input}
            placeholderTextColor="white"
            placeholder="Search"
            // The onSubmitEditing function is run when the text is submitted.
            // It will set this.state.topic equal to the value of the text input.
            onSubmitEditing={this.handleSearchSubmit}
          />
          {/* The Search term is passed into the SearchResults component as props. */}
          <SearchResults topic={this.state.topic} searchResults={this.state.searchResults} />
        </View>
        <View style={styles.footer} />
        <Image source={popcornImg} style={styles.icon} />
      </View>
    );
  }
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: 'rgba(76,217,175,1)',
    marginBottom: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    color: 'white',
    margin: 10,
    height: 45,
    paddingLeft: 10,
    backgroundColor: 'rgba(76,217,175,1)',
    fontSize: 18,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    width: screenWidth,
    backgroundColor: 'rgba(76,217,175,1)',
  },
  icon: {
    width: 90,
    height: 90,
    position: 'absolute',
    left: (screenWidth / 2 - 45),
    bottom: 0,
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
