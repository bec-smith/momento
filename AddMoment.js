import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, Image, View, Button, ScrollView } from 'react-native';
import { ImagePicker,Permissions } from 'expo';
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';
import NavigationBar from 'react-native-navbar';
import CameraRollPicker from 'react-native-camera-roll-picker';

import ChooseImages from './ChooseImages.js';
import ImageGrid from './ImageGrid.js';

class AddMoment extends React.Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      id: params ? params.id : null,
      title: params ? params.title : null,
      time: params ? params.time : Moment().startOf('day'),
      description: params ? params.description : null,
      images: params ? params.images : [],
    };
  }

  render() {
    let { images } = this.state;
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
              title: 'Add Moment',
            }}
            rightButton = {{
              title: 'Done',
              handler: () => {
                if (this.state.time != null) {
                  this.setState({time: this.state.time.format("MMM D, YYYY").toString()}, function() {
                    this.addMoment();
                    global.nextMomentID += 1;
                    this.props.navigation.navigate('Home');
                  })
                }
              },
            }}
            leftButton = {{
              title: 'Cancel',
              handler: () => {this.props.navigation.navigate('Home');},
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
            <View style={{ paddingTop: 20 }}>
              <Button
                title="Upload images"
                onPress={() => {this.props.navigation.navigate('ChooseImages', {
                  id: this.state.id,
                  title: this.state.title,
                  time: this.state.time,
                  description: this.state.description,
                  images: this.state.images,
                  num: this.state.images ? this.state.images.length : 0,
                  screenFrom: 'AddMoment',
                });}}
              />
            </View>
          </View>
          <ImageGrid images={this.state.images} />
        </ScrollView>
      </View>
    );
  }

  getSelectedImages(images, current) {
    var num = images.length;
    this.setState({
      num: num,
      selected: images,
    });
    if (num == global.max) {
     console.log(this.state.selected);
    }
  }

  addMoment() {
    newMomentDate = Moment(this.state.time);
    for (let i = 0; i < global.data.length; i++) {
      curMoment = global.data[i];
      curDate = Moment(curMoment.time)
      if (newMomentDate.isSameOrAfter(curDate)) {
        global.data.splice(i, 0, this.state);
        return;
      }
    }
    global.data.push(this.state);
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
  title: {
    alignSelf: 'center',
    fontSize: 16,
  },
});

export default AddMoment;
