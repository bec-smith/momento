import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, Image, View, Button, ScrollView } from 'react-native';
import { ImagePicker,Permissions } from 'expo';
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';
import NavigationBar from 'react-native-navbar';
import * as firebase from 'firebase';


class AddMoment extends React.Component {
  state = {
    title: null,
    time: Moment().startOf('day'),
    description: null,
    imageUrl: null,
    imageUri: null,
   };

  render() {
    let { imageUri } = this.state;
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
                    this.props.navigation.navigate('Home');
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
            <View style={{ paddingTop: 20 }}>
              <Button
                title="Pick image from camera roll"
                onPress={this.pickFromGallery}
              />
            </View>
            {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, alignSelf: 'center'}} />}
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
    //  uploadUrl = await uploadImageAsync(pickerResult.uri);
      //this.setState({ imageUrl: uploadUrl });
    }
  };

  pickFromGallery = async () => {
    const permissions = Permissions.CAMERA_ROLL;
    const { status } = await Permissions.askAsync(permissions);

    if(status === 'granted') {
      this._pickImage()
    }
  }

//
// async  uploadImageAsync(uri) {
//   const response = await fetch(uri);
//   const blob = await response.blob();
//   const ref = global.storage
//     .ref()
//     .child(uuid.v4());
//
//   const snapshot = await ref.put(blob);
//   return snapshot.downloadURL;
// }

  addMoment() {
  //   newMomentDate = Moment(this.state.time);
  //   for (let i = 0; i < global.data.length; i++) {
  //     curMoment = global.data[i];
  //     curDate = Moment(curMoment.time)
  //     if (newMomentDate.isSameOrAfter(curDate)) {
  //       global.data.splice(i, 0, this.state);
  //       return;
  //     }
  //   }
  //   global.data.push(this.state);
  // }
  this.pushMomento(this.state.title,
    this.state.description,
  //  this.state.imageUrl,
    this.state.imageUri,
    this.state.time,
    global.timelineName);

}

pushMomento(title, description, imageURL, time, momentoName){

	var myMomento = firebase.database().ref('/data/' + momentoName);
//  console.log(momentoName);
	myMomento.once('value').then(function(snapshot)
	{
		var numMomentos = snapshot.val();
		var numMomentos = numMomentos[Object.keys(numMomentos)[0]];
		//console.log(numMomentos);
		myMomento.update({[numMomentos + 1]: {title: title, description: description, imageUrl: imageURL, time: time}});
		myMomento.update({0: numMomentos +1});
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

export default AddMoment;
