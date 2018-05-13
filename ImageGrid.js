import React, { Component } from 'react';
import { StyleSheet, Image, View, Dimensions } from 'react-native';

const IMAGES_PER_ROW = 3;
const win = Dimensions.get('window');
const IMG_LENGTH = win / 3;

class ImageGrid extends React.Component {
  constructor(props) {
    super(props);
    images = this.props.images ? this.props.images : null;
    this.state = {
      rows: this.generateImageRows(images),
    }
    console.log(rows);
  }

  render() {
    return (
      <View>
        {this.state.rows.map((row, key) => (
          <View style={styles.row}>
            {row.map((image, key) => (
              <Image source={{uri: image }} style={styles.image} />
            ))}
          </View>
        ))}
      </View>
    );
  }

  generateImageRows(images) {
    if (images == null) {
      return;
    }
    rows = [];
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
    paddingHorizontal: 5,
    width: IMG_LENGTH,
    height: IMG_LENGTH,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 1,
  }
});

export default ImageGrid;
