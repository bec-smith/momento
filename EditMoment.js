import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TextInput, Image, View, Button, ScrollView } from 'react-native';
import { ImagePicker,Permissions } from 'expo';
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';
import NavigationBar from 'react-native-navbar';
import { Analytics, ScreenHit, Event } from 'expo-analytics';
import * as firebase from 'firebase';

import { pushMomento, deleteMomento } from './FirebaseHelper'

class EditMoment extends React.Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      id: params ? params.id : null,
      title: params ? params.title : null,
      time: params ? params.time : null,
      description: params ? params.description : null,
      imageUrl: params.imageUrl ? params.imageUrl : null,
      imageUri: null,
      BGColor: 'white',
    }
    global.analytics.hit(new ScreenHit('EditMoment'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));
  }

  render() {
    const BLUE = '#2196F3';
    const WHITE = '#FFFFFF';
    const GREY = '#BDBDBD';
    const BLACK = '#424242';
    const LIGHT_GREY = '#F5F5F5';

    let imageSource = this.state.imageUri ? this.state.imageUri : this.state.imageUrl

    return (
      <View style={styles.navbarContainer}>
        <ScrollView>
          <NavigationBar
            title = {{
              title: 'Edit Moment',
            }}
            rightButton = {{
              title: 'Done',
              handler: () => {
                if (typeof this.state.time === 'string') {
                  this.editMoment();
                }
                else if (this.state.time != null) {
                  this.setState({time: this.state.time.format("MMM D, YYYY").toString()}, function() {
                    this.editMoment();
                  })
                }
              },
            }}
            leftButton = {{
              title: 'Cancel',
              handler: () => {this.props.navigation.goBack();},
            }}
          />
          <View style={[styles.container, {backgroundColor: this.state.BGColor}]}>
            <TextInput
              style={styles.smallInput}
              value={this.state.title}
              onChangeText={title => this.setState({title})}
              placeholder="Title"
              multiline = {true}
              numberOfLines = {4}
              returnKeyType="next"
              blurOnSubmit={true}
            />
            <Calendar
              onChange={(time) =>
              {
                this.setState({time})
              }}
              selected={this.state.time}
              minDate={Moment().subtract(10, 'years').startOf('day')}
              maxDate={Moment().startOf('day')}
              showArrows = {true}

              style={{
                 borderWidth: 1,
                 borderColor: GREY,
                 borderRadius: 5,
               }}
               barView={{
                 backgroundColor: BLUE,
                 padding: 10,
               }}
               barText={{
                 fontWeight: 'bold',
                 color: WHITE,
               }}
               stageView={{
                 padding: 0,
               }}
               // Day selector styling
               dayHeaderView={{
                 backgroundColor: LIGHT_GREY,
                 borderBottomColor: GREY,
               }}
               dayHeaderText={{
                 fontWeight: 'bold',
                 color: BLACK,
               }}
               dayRowView={{
                 borderColor: LIGHT_GREY,
                 height: 40,
               }}
               dayText={{
                 color: BLACK,
               }}
               dayDisabledText={{
                 color: GREY,
               }}
               dayTodayText={{
                 fontWeight: 'bold',
                 color: BLUE,
               }}
               daySelectedText={{
                 fontWeight: 'bold',
                 backgroundColor: BLUE,
                 color: WHITE,
                 borderRadius: 15,
                 borderColor: "transparent",
                 overflow: 'hidden',
               }}
               // Styling month selector.
               monthText={{
                 color: BLACK,
                 borderColor: BLACK,
               }}
               monthDisabledText={{
                 color: GREY,
                 borderColor: GREY,
               }}
               monthSelectedText={{
                 fontWeight: 'bold',
                 backgroundColor: BLUE,
                 color: WHITE,
                 overflow: 'hidden',
               }}
               // Styling year selector.
               yearMinTintColor={BLUE}
               yearMaxTintColor={GREY}
               yearText={{
                 color: BLACK,
               }}
            />
            <TextInput
              style={styles.largeInput}
              value={this.state.description}
              onChangeText={description => this.setState({description})}
              placeholder="Description"
              multiline = {true}
              numberOfLines = {4}
              returnKeyType="done"
              blurOnSubmit={true}

            />
            <View>
              <Button
                title="Delete Moment"
                onPress={() => {
                  this.deleteMoment();
                }}
              />
            </View>
            <View style={{ paddingTop: 20 }}>
              <Button
                title="Pick image from camera roll"
                onPress={this.pickFromGallery}
              />
            </View>
            {imageSource && <Image source={{ uri: imageSource }} style={{ width: 200, height: 200, alignSelf: 'center'}} />}
          </View>
        </ScrollView>
      </View>
    );
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ imageUri: result.uri });
    }
  };

  pickFromGallery = async () => {
    const permissions = Permissions.CAMERA_ROLL;
    const { status } = await Permissions.askAsync(permissions);
    global.analytics.event(new Event('Image', 'Edit'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));

    if(status === 'granted') {
      this._pickImage()
    }
  }

  editMoment() {
    global.analytics.event(new Event('Moment', 'Edit', this.state.title))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));
    deleteMomento(global.timelineName, this.state.id);
    if (this.state.imageUri) {
      this.setState({BGColor: 'darkgray'})
      this.uploadImageAndPushMomento(this.state.imageUri);
    } else {
      pushMomento(this.state.title,
        this.state.description,
        this.state.imageUrl,
        this.state.time,
        global.timelineName);
      this.props.navigation.navigate('ViewMoment', {
        id: this.state.id,
        title: this.state.title,
        time: this.state.time,
        description: this.state.description,
        imageUrl: this.state.imageUrl,
      });
    }
  }

  deleteMoment() {
    deleteMomento(global.timelineName, this.state.id);
    global.analytics.event(new Event('Moment', 'Delete', this.state.title))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));
    this.props.navigation.navigate('Home');
  }

  uploadImageAndPushMomento = async (uri) => {

      console.log("uploadAsFile", uri)
      const response = await fetch(uri);
      const blob = await response.blob();

      var metadata = {
        contentType: 'image/jpeg',
      };
      let name = new Date().getTime() + "-media.jpg"
      const ref = firebase
        .storage()
        .ref()
        .child('assets/' + name)

      return new Promise((resolve, reject) => {

          const task = ref.put(blob, metadata);

          task.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');

          }, function(error) {
            // Handle unsuccessful uploads
          }, function() {
            // Handle successful uploads on complete
            task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              console.log('File available at', downloadURL);
              this.setState({ imageUrl: downloadURL }, function() {
                pushMomento(this.state.title,
                  this.state.description,
                  this.state.imageUrl,
                  this.state.time,
                  global.timelineName);
                this.props.navigation.navigate('ViewMoment', {
                  id: this.state.id,
                  title: this.state.title,
                  time: this.state.time,
                  description: this.state.description,
                  imageUrl: this.state.imageUrl,
                });
              });
            }.bind(this));
          }.bind(this));
      })
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
    paddingHorizontal: 12,
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
  largeInput: {
    marginVertical: 20,
    height: 80,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
});

export default EditMoment;
