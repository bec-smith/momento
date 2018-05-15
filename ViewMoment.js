import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, Button, ScrollView } from 'react-native';
import { Ionicons , FontAwesome} from '@expo/vector-icons';
import NavigationBar from 'react-native-navbar';

import ImageGrid from './ImageGrid.js'

class ViewMoment extends React.Component {

  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  };

  render() {
    const { params } = this.props.navigation.state;
    const id = params ? params.id : null;
    const title = params ? params.title : null;
    const time = params ? params.time : null;
    const description = params ? params.description : null;
    const images = params ? params.images : null;
    return (
      <View style = {styles.navbarContainer}>
        <ScrollView>
          <NavigationBar
            rightButton = {{
              title: 'Edit',
              handler: () => {
                this.props.navigation.navigate('EditMoment', {
                  id: id,
                  title: title,
                  time: time,
                  description: description,
                  images: images,
                });
              },
            }}
            leftButton = {{
              title: 'Back',
              handler: () => {this.props.navigation.navigate('Home');},
            }}
          />
          <View style = {styles.momentContainer}>
            <Text style = {styles.momentTitleText}>{title}</Text>
            <Text>{time}</Text>
            <Text style = {styles.momentDescriptionText}>{description}</Text>
          </View>
          <ImageGrid images={images}/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  momentTitleText: {
    fontSize: 40,
  },
  momentDescriptionText: {
    paddingTop: 20,
  },
  momentContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 25,
    flex: 1,
  },
  navbarContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 5,
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
});

export default ViewMoment;
