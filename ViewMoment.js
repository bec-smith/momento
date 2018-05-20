import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, Button } from 'react-native';
import { Ionicons , FontAwesome} from '@expo/vector-icons';
import NavigationBar from 'react-native-navbar';
import { Analytics, ScreenHit } from 'expo-analytics';

class ViewMoment extends React.Component {

  constructor() {
    super()
    global.analytics.hit(new ScreenHit('ViewMoment'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));
  }

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
    const imageUrl = params ? params.imageUrl : null;
    return (
      <View style = {styles.navbarContainer}>
        <NavigationBar
          rightButton = {{
            title: 'Edit',
            handler: () => {
              this.props.navigation.navigate('EditMoment', {
                id: id,
                title: title,
                time: time,
                description: description,
                imageUrl: imageUrl,
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
          <View style = {styles.imageGrid}>
            {imageUrl && <Image source={{ uri: imageUrl }} style={styles.momentImage} />}
          </View>
        </View>
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
