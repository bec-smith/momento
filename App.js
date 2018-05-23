import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, Image, View, TouchableHighlight, ScrollView, Button } from 'react-native';
import { Ionicons , FontAwesome} from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';
import Timeline from 'react-native-timeline-listview'
import * as firebase from 'firebase';
import NavigationBar from 'react-native-navbar';
import Moment from 'moment';
import { Analytics, ScreenHit, Event } from 'expo-analytics';

import AddMoment from './AddMoment.js';
import ViewMoment from './ViewMoment.js';
import EditMoment from './EditMoment.js';
import Login from './Login.js';
import CreateAccount from './CreateAccount.js';
import InviteUser from './InviteUser.js';
import ViewTimelines from './ViewTimelines.js';

console.disableYellowBox = true;

global.analytics = new Analytics('UA-119318283-1');
global.data = [
  {
    id: 4,
    time: 'FAIL',
    title: 'FAIL',
    description: 'FAIL',
    imageUrl: 'https://www.atlantisbahamas.com/media/Things%20To%20Do/Water%20Park/Beaches/Hero/Experiences_Beach.jpg'
  },
]


class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    global.analytics.hit(new ScreenHit('Home'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));
  }

  componentDidMount() {
    var momentoRef = firebase.database().ref('/data/' + global.timelineName);
    momentoRef.once('value').then(function(snapshot) {
      momento = snapshot.val()
      momentos = Object.values(momento)

      if (momentos.length > 0) {
        global.data = momentos.slice(1);
        global.data.sort(
          function(moment1, moment2) {
            moment1 = Moment(moment1.time);
            moment2 = Moment(moment2.time);
            return moment2.diff(moment1);
          }
        );
      }
      else {
        global.data = [];
      }
      this.setState({
        isLoading: false
      });
     }.bind(this))
  }

  logout()
  {
    global.analytics.event(new Event('Login', 'Logout'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));
    firebase.auth().signOut();
    this.props.navigation.navigate('Login');
  }

  render() {
    if (this.state.isLoading) {
      return <View style={styles.loadContainer}><Text style={styles.loadText}>Loading...</Text></View>;
    }
    else {
      return (
        <View style={styles.navbar}>
          <NavigationBar
            rightButton = {{
              title: 'Change Timelines',
              handler: () => {
                this.props.navigation.navigate('ViewTimelines');
              },
            }}
            leftButton = {{
              title: 'Logout',
              handler: () => {this.logout()},
            }}
          />
          <View style={styles.container}>
            <View style={{alignItems: 'center',}}>
              <Text style={styles.titleText}>Momento</Text>
            </View>
            <Timeline
              style={styles.list}
              data={global.data}
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
            <View style={{
                   flex: 0.1,
                   flexDirection: 'row',
                   justifyContent: 'space-between',
                 }}>

               <View style={styles.alignLeft}>
                 <TouchableHighlight onPress={() => {this.props.navigation.navigate('InviteUser');}}   >
                    <FontAwesome
                      size={35}
                      name='user-plus'
                      color='#349DD8'
                    />
                </TouchableHighlight>
               </View>

               <View style={styles.buttons}>
                    <TouchableHighlight  onPress={() => {this.props.navigation.navigate('AddMoment');}}  >
                        <FontAwesome
                          size={40}
                          name='plus-circle'
                          color='#349DD8'
                        />
                   </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>

      );
    }
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
    CreateAccount: {
      screen: CreateAccount,
    },
    InviteUser: {
      screen: InviteUser,
    },
   ViewTimelines: {
     screen: ViewTimelines,
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
  navbar: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 28,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  titleText:{
    fontFamily: 'Baskerville',
    fontSize: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadText: {
    fontFamily: 'Baskerville',
    fontSize: 24,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  loadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userText: {
    fontSize: 20,
    color: 'blue',
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
  alignLeft: {
    alignItems: 'flex-start',
    justifyContent: 'center',
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
