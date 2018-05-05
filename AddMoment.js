import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, Image, View, Button } from 'react-native';
import { ImagePicker,Permissions } from 'expo';

class AddMoment extends React.Component {
  state = {
     title: null,
     time: null,
     description: null,
     imageUrl: null,
   };

  render() {
    let { imageUrl } = this.state;

    let momentObject = {time:"10:45", title:'newEvent', description:'the description'};

    return (

      <View style={styles.container}>
        <Text style={styles.titleText}>
          Add a moment!
        </Text>
        <TextInput
           style={styles.smallInput}
           value={this.state.title}
           onChangeText={title => this.setState({title})}
           placeholder="Title"
           multiline = {true}
           numberOfLines = {4}
           returnKeyType="next"
           blurOnSubmit={false}
        />
         <TextInput
           style={styles.smallInput}
           value={this.state.time}
           onChangeText={time => this.setState({time})}
           placeholder="Date"
           multiline = {true}
           numberOfLines = {4}
           returnKeyType="next"
           blurOnSubmit={false}
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
            title="Pick an image from camera roll"
            onPress={this.pickFromGallery}
          />
        </View>
        {imageUrl && <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200, alignSelf: 'center'}} />}
        <View style={{ paddingTop: 20 }}>
          <Button
            title="Done"
            onPress={() => {
              if (this.state.time != null){
                global.data.unshift(this.state);
              }
              this.props.navigation.navigate('Home'
            //  , { eventParam: this.state, }
              );
            }}
          />
        </View>
      </View>

    );
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ imageUrl: result.uri });
    }
  };

  pickFromGallery = async () => {
    const permissions = Permissions.CAMERA_ROLL;
    const { status } = await Permissions.askAsync(permissions);

    console.log(permissions, status);
    if(status === 'granted') {
      this._pickImage()
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 20,
    paddingTop: 65,
  },
  smallInput: {
    margin: 20,
    marginBottom: 0,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
  largeInput: {
    margin: 20,
    marginBottom: 0,
    height: 80,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
  titleText: {
    fontSize: 40,
    alignSelf: 'center',
  },
});

export default AddMoment;
