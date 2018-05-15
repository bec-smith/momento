import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import NavigationBar from 'react-native-navbar';
import CameraRollPicker from 'react-native-camera-roll-picker';

global.max = 9

class ChooseImages extends React.Component {
  constructor(props) {
     super(props);

     const { params } = this.props.navigation.state;

     this.state = {
       id: params ? params.id : null,
       title: params ? params.title : null,
       time: params ? params.time : Moment().startOf('day'),
       description: params ? params.description : null,
       selected: params.images ? params.images : [],
       num: params ? params.num : 0,
     };
   }

   render() {
     return (
       <View style={styles.container}>
         <NavigationBar
           title = {{
             title: 'Choose Images',
           }}
           rightButton = {{
             title: 'Done',
             handler: () => {
               this.props.navigation.navigate('AddMoment', {
                 id: this.state.id,
                 title: this.state.title,
                 time: this.state.time,
                 description: this.state.description,
                 images: this.state.selected,
               });
             },
           }}
           leftButton = {{
             title: 'Cancel',
             handler: () => {this.props.navigation.goBack();},
           }}
         />
         <View style={styles.content}>
           <Text style={styles.text}>
             <Text style={styles.bold}> {this.state.num}</Text> images have been selected
           </Text>
         </View>
         <CameraRollPicker
           scrollRenderAheadDistance={500}
           initialListSize={1}
           pageSize={3}
           removeClippedSubviews={false}
           groupTypes='SavedPhotos'
           batchSize={5}
           maximum={global.max}
           selected={this.state.selected}
           assetType='Photos'
           imagesPerRow={3}
           imageMargin={5}
           callback={this.getSelectedImages.bind(this)} />
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 5,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    alignItems: 'center',
    color: 'black',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default ChooseImages;
