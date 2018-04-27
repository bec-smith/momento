import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, TouchableHighlight } from 'react-native';
import { Ionicons , FontAwesome} from '@expo/vector-icons';
import Timeline from 'react-native-timeline-listview'

export default class App extends React.Component {
  constructor(){
    super()
    this.data = [
      {time: '09:00', title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ', circleColor: '#009688',lineColor:'#009688'},
      {time: '10:45', title: 'Play Badminton', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.'},
      {time: '12:00', title: 'Lunch'},
      {time: '14:00', title: 'Watch Soccer', description: 'Team sport played between two teams of eleven players with a spherical ball. ',lineColor:'#009688'},
      {time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', circleColor: '#009688'}
    ]
  }

  render() {
    return (
      <View style={styles.container}>

      <View style={{
      alignItems: 'center',
      }}>
      <Text style={styles.titleText}>Momento</Text>
      </View>

        <Timeline
          style={styles.list}
          data={this.data}
          circleSize={20}
          circleColor='rgb(45,156,219)'
          lineColor='rgb(45,156,219)'
          timeContainerStyle={{minWidth:52, marginTop: -5}}
          timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
          descriptionStyle={{color:'gray'}}
          options={{
            style:{paddingTop:5}
          }}
        />

        <View style={styles.buttons}>

        <TouchableHighlight
        onPress={() => Alert.alert('You clicked add!')}
        underlayColor =  "purple" //color it turns when pressed
        style = {styles.button}
        >

        <FontAwesome
          size={40}
          name='plus-circle'
          color='#f50'/>

        </TouchableHighlight>

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
    paddingTop:65,
  },
  titleText:{
    fontFamily: 'Baskerville',
    fontSize: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
list: {
  flex: 1,
  marginTop:20,
},
buttons: {
  alignItems: 'flex-end',
  justifyContent: 'center',
},
button: {
  paddingHorizontal: 20,
  paddingVertical: 10,
},
});
