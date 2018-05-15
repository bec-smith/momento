import React, { Component } from 'react';
import { StyleSheet, Image, View, Dimensions, Text } from 'react-native';

const IMAGES_PER_ROW = 3;
const winWidth = Dimensions.get('window').width;
const IMG_LENGTH = (winWidth / 3) - 2;

class ImageGrid extends React.Component {
  constructor(props) {
    super(props);
    images = this.props.images ? this.props.images : null;
    this.state = {
      rows: this.generateImageRows(images),
    }
  }

  render() {
    return (
      <View>
        {this.state.rows.map((row, key) => (
          <View key={key} style={styles.row}>
            {row.length > 0 && <Image source={{uri: row[0].uri}} style={styles.image} />}
            {row.length > 1 && <View style={styles.centerImage}><Image source={{uri: row[1].uri}} style={styles.image} /></View>}
            {row.length > 2 && <Image source={{uri: row[2].uri}} style={styles.image} />}
          </View>
        ))}
      </View>
    );
  }

  generateImageRows(images) {
    rows = [];
    if (images == null || images.length == 0) {
      return rows;
    }
    numRows = Math.floor(images.length / IMAGES_PER_ROW) + 1
    for (let i = 0; i < numRows; i++) {
      row = []
      if (i == numRows - 1) {
        for (let j = i * IMAGES_PER_ROW; j < images.length; j++) {
          image = images[j];
          row.push(image);
        }
      } else {
        for (let j = i * IMAGES_PER_ROW; j < (i * IMAGES_PER_ROW) + IMAGES_PER_ROW; j++) {
          image = images[j];
          row.push(image);
        }
      }
      rows.push(row);
    }
    return rows;
  }
}

const styles = StyleSheet.create({
  image: {
    width: IMG_LENGTH,
    height: IMG_LENGTH,
  },
  centerImage: {
    paddingHorizontal: 2,
  },
  row: {
    flexDirection: 'row',
    paddingBottom: 2,
  }
});

export default ImageGrid;
