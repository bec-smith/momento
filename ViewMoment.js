import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, Button } from 'react-native';
import { Ionicons , FontAwesome} from '@expo/vector-icons';
import NavigationBar from 'react-native-navbar';

class ViewMoment extends React.Component {
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
      <View style = {styles.navbarContainer}>
        <NavigationBar
          rightButton = {{
            title: 'Edit',
            handler: () => {this.props.navigation.goBack();},
          }}
          leftButton = {{
            title: 'Back',
            handler: () => {this.props.navigation.goBack();},
          }}
        />
        <View style = {styles.momentContainer}>
          <Text style = {styles.momentTitleText}>{title}</Text>
          <Text>{date}</Text>
          <Text style = {styles.momentDescriptionText}>{description}</Text>
          <View style = {styles.imageGrid}>
            {imgUrl && <Image source={{ uri: imgUrl }} style={styles.momentImage} />}
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
