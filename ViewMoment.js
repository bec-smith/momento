import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, Button } from 'react-native';
import { Ionicons , FontAwesome} from '@expo/vector-icons';

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
});

export default ViewMoment;
