import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TextInput, Image, View, Button, ScrollView } from 'react-native';
import { ImagePicker,Permissions } from 'expo';
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';

import { getTimelines } from './FirebaseHelper'

class ViewTimelines extends React.Component {

  render() {
    //console.log(global.allTimelineNames)
    console.log(global.timelineName)
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Timelines You Have Access To</Text>
        <ScrollView>


{/*

  // global.allTimelineNames  is an array of all the Timelines a user has access to
  // make a clickable array so that when clicked, global.timelineName is set
  // to whatever that thing is


  */}

        </ScrollView>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  navbarContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 5,
  },
  titleText:{
    fontFamily: 'Baskerville',
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallInput: {
    marginVertical: 20,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
});

export default ViewTimelines;
