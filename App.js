import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, Image, View, Alert, TouchableHighlight, ScrollView, Button } from 'react-native';
import { Ionicons , FontAwesome} from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';
import Timeline from 'react-native-timeline-listview'
import {  ImagePicker,Permissions } from 'expo';


class HomeScreen extends React.Component {
  constructor() {
    super()

    this.state =
      {
        data:
          [
              {time: '09:00', title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ', circleColor: '#009688',lineColor:'#009688'},
              {time: '10:45', title: 'Play Badminton', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.'},
              {time: '12:00', title: 'Lunch'},
              {time: '14:00', title: 'Watch Soccer', description: 'Team sport played between two teams of eleven players with a spherical ball. ',lineColor:'#009688'},
              {time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', circleColor: '#009688'}
          ]
     }
  }


  insertNewTime (time) =>{
    this.setState({ data: [...this.state.data, time] })
  }

  render() {
    const { params } = this.props.navigation.state;
    const eventParam = params ? params.eventParam : null; //if (params) params.otherParam,  else null
    const content = eventParam !== null ? (eventParam) =>  this.insertNewTime(eventParam) : null //supposed to auto add new event
    return (

      <View style={styles.container}>
      <Text>otherParam: {JSON.stringify(eventParam)}</Text> //shows user inputted moment as json
      <View style={{
        alignItems: 'center',
      }}>
      <Text style={styles.titleText}>Momento</Text>
      </View>
        <Timeline
          style={styles.list}
          data={this.state.data}
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
            onPress={() => {this.insertNewTime(eventParam)  }}
            style={styles.button}
          >
            <FontAwesome
              size={20}
              name='calendar'
              color='#f50'
            />
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => {this.props.navigation.navigate('Details');}}
            style = {styles.button}
          >
           <FontAwesome
             size={20}
             name='plus-circle'
             color='#f50'
           />

         </TouchableHighlight>
        </View>

      </View>
    );
  }

}


//DetailsScreen AKA make a moment screen
class DetailsScreen extends React.Component {
  state = {
     title: '',
     time: '',
     description: '',
     imageUrl: null,

   };

  render() {
    let { imageUrl } = this.state;

    let momentObject = {time:"10:45", title:'newEvent', description:'the description'};

    return (

      <View style={createMomentStyles.container}>

        <TextInput
         style={createMomentStyles.input}
         value={this.state.title}
         onChangeText={title => this.setState({title})}
         placeholder="Title"
         autoFocus={true}
         multiline = {true}
         numberOfLines = {4}
         returnKeyType="next"
         blurOnSubmit={false}
        />
         <TextInput
         style={createMomentStyles.input}
         value={this.state.time}
         onChangeText={time => this.setState({time})}
         placeholder="Date"
         autoFocus={true}
         returnKeyType="next"
         blurOnSubmit={false}
        />
         <TextInput
         style={createMomentStyles.input}
         value={this.state.description}
         onChangeText={description => this.setState({description})}
         placeholder="Description"
         autoFocus={true}
         multiline = {true}
         numberOfLines = {4}
         returnKeyType="done"
         blurOnSubmit={false}
        />

        <Button
         title="Pick an image from camera roll"
         onPress={this.pickFromGallery}
        />
        {imageUrl &&
         <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />}

        <Button
          title="Go back"
          onPress={() => {
            this.props.navigation.navigate('Home', {
              eventParam: this.state, //everything you fill in on the create moment page gets transferred over
            });
          }}
        />
      </View>

    );
  }
  _pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });

  if (!result.cancelled) {
    this.setState({ imageUrl: result.uri });
  }
};

pickFromGallery = async () => {
  const permissions = Permissions.CAMERA_ROLL;
  const { status } = await Permissions.askAsync(permissions);

  console.log(permissions, status);
  if(status === 'granted') {
    this._pickImage()
  }
}


}

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title:{
     fontSize:16,
     fontWeight: 'bold'
   },
   descriptionContainer:{
     flexDirection: 'row',
     paddingRight: 50
   },
   image:{
     width: 50,
     height: 50,
     borderRadius: 25
   },
   textDescription: {
     marginLeft: 10,
     color: 'gray'
   },
});

const createMomentStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 20,
    paddingTop:65,
  },
  input: {
    margin: 20,
    marginBottom: 0,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
});
