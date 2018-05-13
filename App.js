import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, Image, View, TouchableHighlight, ScrollView, Button } from 'react-native';
import { Ionicons , FontAwesome} from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';
import Timeline from 'react-native-timeline-listview'

import AddMoment from './AddMoment.js';
import ViewMoment from './ViewMoment.js';
import EditMoment from './EditMoment.js';
import Login from './Login.js';

console.disableYellowBox = true;

global.nextMomentID = 5

global.data = [
  {
    id: 4,
    time: 'Apr 28, 2018',
    title: 'Beach Day!',
    description: 'Day trip to Santa Cruz :) 🏖🌊',
    imageUrl: 'https://www.atlantisbahamas.com/media/Things%20To%20Do/Water%20Park/Beaches/Hero/Experiences_Beach.jpg'
  },
  {
    id: 3,
    time: 'Apr 26, 2018',
    title: 'Anniversary Dinner🍴😍',
    description: 'Dinner at Alexander\'s Steakhouse for 3 year anniversary!',
    imageUrl: 'http://www.goldcoastrealty-chicago.com/images/19399927_s_450.jpg'
  },
  {
    id: 2,
    time: 'Feb 14, 2018',
    title: 'Valentine\'s Day 💕💘',
    description: 'We saw a movie and had dinner',
    imageUrl: 'https://hips.hearstapps.com/wdy.h-cdn.co/assets/18/02/3200x2133/gallery-1515434402-valentinesdayfacts.jpg?resize=980:*'
  },
  {
    id: 1,
    time: 'Jan 1, 2018',
    title: 'New Years Party 🎉',
    description: 'We kissed under the stars',
    imageUrl: 'http://huntsvilleadventures.com/wp-content/uploads/2017/09/Fireworks.jpg'
  }
]

class HomeScreen extends React.Component {

  constructor() {
    super()
    this.state = {
      data: global.data
    }
  }

  render() {
    const { params } = this.props.navigation.state;
    const user = params ? params.user : null;
    const momentos = params ? params.momentos : null;

    return (
      <View style={styles.container}>
      <View style={{
        alignItems: 'center',
      }}>
      <Text style={styles.titleText}>Momento</Text>
      <Text style={styles.titleText}>{user}</Text>
      <Text style={styles.titleText}>{JSON.stringify(momentos)}</Text>


      </View>
        <Timeline
          style={styles.list}
          data={this.state.data}
          circleSize={20}
          circleColor='rgb(45,156,219)'
          lineColor='rgb(45,156,219)'
          timeContainerStyle={{minWidth: 100, marginTop: -5}}
          timeStyle={{textAlign: 'center', backgroundColor:'#349DD8', color:'white', padding:5, borderRadius:13}}
          descriptionStyle={{color:'gray'}}
          onEventPress={(event) => {
            this.props.navigation.navigate('ViewMoment', {
              id: event.id,
              title: event.title,
              time: event.time,
              description: event.description,
              imageUrl: event.imageUrl,
            });
          }}
          options={{
            style:{paddingTop:5}
          }}
        />

        <View style={styles.buttons}>
          <TouchableHighlight
            onPress={() => {this.props.navigation.navigate('AddMoment');}}
            style = {styles.button}
          >
           <FontAwesome
             size={30}
             name='plus-circle'
             color='#349DD8'
           />

         </TouchableHighlight>
        </View>

      </View>
    );
  }

}

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    AddMoment: {
      screen: AddMoment,
    },
    Login: {
      screen: Login,
    },
    ViewMoment: {
      screen: ViewMoment,
    },
    EditMoment: {
      screen: EditMoment,
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    mode: 'modal', //makes screen slide up

  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 65,
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
  title: {
     fontSize:16,
     fontWeight: 'bold'
   },
   descriptionContainer: {
     flexDirection: 'row',
     paddingRight: 50
   },
   image: {
     width: 50,
     height: 50,
     borderRadius: 25
   },
   textDescription: {
     marginLeft: 10,
     color: 'gray'
   },
});
