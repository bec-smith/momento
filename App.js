import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, Image, View, Alert, TouchableHighlight, ScrollView, Button } from 'react-native';
import { Ionicons , FontAwesome} from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';
import Timeline from 'react-native-timeline-listview'
import {  ImagePicker,Permissions } from 'expo';

global.data = [
  {
    time: 'Apr. 26, 2018',
    title: 'Beach Day!',
    description: 'Day trip to Santa Cruz :)',
  },
  {
    time: 'Apr 28, 2018',
    title: 'Anniversary Dinner',
    description: 'Dinner at Alexander\'s Steakhouse for 3 year anniversary!'
  }
]

class HomeScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      data: global.data
    }
  }

  // insertNewTime= (time) => {
  //   this.setState({ data: [...this.state.data, time]});
  //   global.data.push(time);
  // }

  render() {
    const { params } = this.props.navigation.state;
    const eventParam = params ? params.eventParam : null; //if (params) params.otherParam,  else null
    // const content = eventParam !== null ? (eventParam) =>  this.insertNewTime(eventParam) : null //supposed to auto add new event
    return (

      <View style={styles.container}>
      {/* <Text>otherParam: {JSON.stringify(eventParam)}</Text> //shows user inputted moment as json */}
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
          timeContainerStyle={{minWidth: 100, marginTop: -5}}
          timeStyle={{textAlign: 'center', backgroundColor:'#349DD8', color:'white', padding:5, borderRadius:13}}
          descriptionStyle={{color:'gray'}}
          onEventPress={(event) => {
            this.props.navigation.navigate('Moment', {
              title: event.title,
              date: event.time,
              description: event.description,
              imgUrl: event.imageUrl,
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


//DetailsScreen AKA make a moment screen
class AddMomentScreen extends React.Component {
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
        <Text style={createMomentStyles.titleText}>
          Add a moment!
        </Text>
        <TextInput
           style={createMomentStyles.input}
           value={this.state.title}
           onChangeText={title => this.setState({title})}
           placeholder="Title"
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
           returnKeyType="next"
           blurOnSubmit={false}
        />
         <TextInput
           style={createMomentStyles.input}
           value={this.state.description}
           onChangeText={description => this.setState({description})}
           placeholder="Description"
           multiline = {true}
           numberOfLines = {4}
           returnKeyType="done"
           blurOnSubmit={false}
        />
        <View style={{ paddingTop: 20 }}>
          <Button
            title="Pick an image from camera roll"
            onPress={this.pickFromGallery}
          />
        </View>
        {imageUrl && <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200, alignSelf: 'center'}} />}
        <View style={{ paddingTop: 20 }}>
          <Button
            title="Done"
            onPress={() => {
              global.data.unshift(this.state);
              this.props.navigation.navigate('Home', {
                eventParam: this.state, //everything you fill in on the create moment page gets transferred over
              });
            }}
          />
        </View>
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

class MomentScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { params } = this.props.navigation.state;
    const title = params ? params.title : null;
    const date = params ? params.date : null;
    const description = params ? params.description : null;
    const imgUrl = params ? params.imgUrl : null;
    return (
      <View style = {styles.momentContainer}>
        <FontAwesome
          style = {{ alignSelf: 'center' }}
          size={30}
          name='angle-down'
          color='#000000'
        />
        <Text style = {styles.momentTitleText}>{title}</Text>
        <Text>{date}</Text>
        <Text style = {styles.momentDescriptionText}>{description}</Text>
        <View style = {styles.imageGrid}>
          {imgUrl && <Image source={{ uri: imgUrl }} style={styles.momentImage} />}
          {/* <Image style = {styles.momentImage} source = {require('./img/sample.jpg')}/> */}
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
      screen: AddMomentScreen,
    },
    Moment: {
      screen: MomentScreen,
    }
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
  momentTitleText: {
    fontSize: 40,
  },
  momentDescriptionText: {
    paddingTop: 20,
  },
  momentContainer: {
    padding: 20,
    paddingTop: 20,
  },
  imageGrid: {
    flexDirection: 'row',
    paddingTop: 50,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  momentImage: {
    width: 400,
    height: 400,
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
    paddingTop: 65,
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
  titleText: {
    fontSize: 40,
    alignSelf: 'center',
  },
});
