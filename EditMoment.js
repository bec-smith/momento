import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TextInput, Image, View, Button, ScrollView } from 'react-native';
import { ImagePicker,Permissions } from 'expo';
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';
import NavigationBar from 'react-native-navbar';

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
      imageUrl: params ? params.imageUrl : null,
    }
  }

  render() {
    const BLUE = '#2196F3';
    const WHITE = '#FFFFFF';
    const GREY = '#BDBDBD';
    const BLACK = '#424242';
    const LIGHT_GREY = '#F5F5F5';

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
                  this.props.navigation.navigate('ViewMoment', {
                    id: this.state.id,
                    title: this.state.title,
                    time: this.state.time,
                    description: this.state.description,
                    imageUrl: this.state.imageUrl,
                  });
                }
                else if (this.state.time != null) {
                  this.setState({time: this.state.time.format("MMM D, YYYY").toString()}, function() {
                    this.editMoment();
                    this.props.navigation.navigate('ViewMoment', {
                      id: this.state.id,
                      title: this.state.title,
                      time: this.state.time,
                      description: this.state.description,
                      imageUrl: this.state.imageUrl,
                    });
                  })
                }
              },
            }}
            leftButton = {{
              title: 'Cancel',
              handler: () => {this.props.navigation.goBack();},
            }}
          />
          <View style={styles.container}>
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
            {this.state.imageUrl && <Image source={{ uri: this.state.imageUrl }} style={{ width: 200, height: 200, alignSelf: 'center'}} />}
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
      // console.log(result) returns only height, width, type, cancelled(t/f), and uri available
      this.setState({ imageUrl: result.uri });
    }
  };

  pickFromGallery = async () => {
    const permissions = Permissions.CAMERA_ROLL;
    const { status } = await Permissions.askAsync(permissions);

    if(status === 'granted') {
      this._pickImage()
    }
  }

  editMoment() {
    // curID = this.state.id;
    // for (let i = 0; i < global.data.length; i++) {
    //   if (curID === global.data[i].id) {
    //     global.data.splice(i, 1);
    //     break;
    //   }
    // }
    // newMomentDate = Moment(this.state.time);
    // for (let i = 0; i < global.data.length; i++) {
    //   curMoment = global.data[i];
    //   curDate = Moment(curMoment.time)
    //   if (newMomentDate.isSameOrAfter(curDate)) {
    //     global.data.splice(i, 0, this.state);
    //     return;
    //   }
    // }
    // global.data.push(this.state);
    deleteMomento(global.timelineName, this.state.id);
    pushMomento(this.state.title,
      this.state.description,
      this.state.imageUrl,
      this.state.time,
      global.timelineName);
  }

  deleteMoment() {
  // console.log(global.timelineName)
  // console.log(this.state.id)
    deleteMomento(global.timelineName, this.state.id);
    this.props.navigation.navigate('Home');
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
