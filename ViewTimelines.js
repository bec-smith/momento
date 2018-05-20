import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TextInput, Image, View, Button, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { ImagePicker,Permissions } from 'expo';
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';
import { Analytics, ScreenHit } from 'expo-analytics';

import { getTimelines } from './FirebaseHelper'

class ViewTimelines extends React.Component {

  constructor() {
    super()
    global.analytics.hit(new ScreenHit('ViewTimelines'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));
  }

  _onPressButton(item)
  {
    global.timelineName = item
    this.props.navigation.navigate('Home');
  }
  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Timelines You Have Access To</Text>
          <View style={styles.container}>
          <FlatList
            data={global.allTimelineNames}
            renderItem={
              ({item}) =>
               <TouchableOpacity onPress={() => this._onPressButton(item)} >
               <View style={styles.button}>
                <Text style={styles.item}>{item}</Text>
                </View>
              </TouchableOpacity>
            }
          />
        </View>
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
  button: {
  marginBottom: 30,
  width: 260,
  alignItems: 'center',
  backgroundColor: '#2196F3'
},
item: {
  padding: 10,
  margin: 20,
  fontSize: 18,
  height: 44,
},
  titleText:{
    fontFamily: 'Baskerville',
    fontSize: 30,
    padding: 20,
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
