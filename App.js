import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Platform, Text, TextInput, Image, View, TouchableHighlight, ScrollView, Button } from 'react-native';
import { Ionicons , FontAwesome} from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';
import { Font } from 'expo';
import Timeline from 'react-native-timeline-listview'
import * as firebase from 'firebase';
import NavigationBar from 'react-native-navbar';
import Moment from 'moment';
import { Analytics, ScreenHit, Event } from 'expo-analytics';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
      isLoading: true,
    };
    global.analytics.hit(new ScreenHit('Home'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));
  }

  componentDidMount() {

    Font.loadAsync({
      'MaterialIcons': require('./assets/fonts/MaterialIcons-Regular.ttf'),
    });

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

        /*
        <View style={styles.navbar}>
          <Image source={require('./img/icon.png')} style={{ width: 98, height: 22 }} />

          <View style={styles.rightNav}>
            <TouchableOpacity>
            <Icon style={styles.navItem} name="search" size={25} />
          </TouchableOpacity>
            <TouchableOpacity>
            <Icon style={styles.navItem} name="account-circle" size={25} />
            </TouchableOpacity>
        </View>
        */

         

          
          
    
            







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
       




/*
<View style={styles.tabBar}>
<TouchableOpacity style={styles.tabItem}>
  <Icon name="home" size={25}/>
  <Text style={styles.tabTitle}>Home</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.tabItem}>
  <Icon name="whatshot" size={25} />
  <Text style={styles.tabTitle}>Trending</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.tabItem}>
  <Icon name="subscriptions" size={25} />
  <Text style={styles.tabTitle}>Subscriptions</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.tabItem}>
  <Icon name="folder" size={25} />
  <Text style={styles.tabTitle}>Library</Text>
</TouchableOpacity>
</View>
*/

 //</View>

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
    //flex: 1,
    //height: 75,
    //backgroundColor: 'white',
    paddingTop: 28,
    //paddingHorizontal: 10,

    //height: 55,
    backgroundColor: 'white',
    elevation: 10,
    paddingHorizontal: 15
    //flexDirection: 'row',
   // alignItems: 'center',
    //justifyContent: 'space-between'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  rightNav: {
    flexDirection: 'row'
  },
  navItem: {
    marginLeft: 25
  },

  titleText:{
    ...Platform.select({
      ios: {
        fontFamily: 'Bakersville',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
    fontSize: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadText: {
    ...Platform.select({
      ios: {
        fontFamily: 'Bakersville',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
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



  tabBar: {
    backgroundColor: 'white',
    height: 60,
    borderTopWidth: 0.5,
    borderColor: '#E5E5E5',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabTitle: {
    fontSize: 11,
    color: '#3c3c3c',
    paddingTop: 4
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
