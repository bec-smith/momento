import React, { Component } from 'react';
import { Image, Button, StyleSheet, Text, View, Alert,TouchableOpacity,ScrollView } from 'react-native';
import { AuthSession } from 'expo';


class Login extends React.Component {
  state = {
    responseJSON: null,
  };
  static navigationOptions = {
    header: null,
  };

  async  login() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('186248128856893', {
        permissions: ['public_profile', 'email'],
      });
    if (type === 'success') {
      // Get the user's info using Facebook's Graph API
      this.callGraph(token);
    //  this.firebaseLogin(token);
    }
  }

  callGraph = async token => {
    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture`);
    const responseJSON = JSON.stringify(await response.json());
    this.setState({ responseJSON });
  };

  // Sign in with credential from the Facebook user.
  firebaseLogin = token => {
    // firebase.auth().signInWithCredential(token).catch((error) => {
    //     // Handle Errors here.
    //     console.warn("Add Error for login", error)
    //   });
  };

  renderButton = () => (
    <TouchableOpacity onPress={() => this.login()}>
      <View
        style={{
          alignSelf: 'center',
          borderRadius: 4,
          padding: 24,
          backgroundColor: '#3B5998',
        }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Login to Facebook
        </Text>
      </View>
    </TouchableOpacity>
  );


  showUserData = data => (
    <Text>{data}</Text>
  );

  render() {
    const APP_ID = '186248128856893';

    return (
      <ScrollView contentContainerStyle={styles.container}>

       {this.state.responseJSON && this.showUserData('User data : ' + this.state.responseJSON)}

{/*
        {this.state.responseJSON && <Image source={{ uri: this.state.responseJSON.picture.data.url }} style={{ width: 200, height: 200, alignSelf: 'center'}} />}
        {this.state.responseJSON && <Text>{this.responseJSON.name}</Text>}

        {this.state.responseJSON && <Text> 'ALL User data : ' + {this.state.responseJSON} </Text>}
*/}
        {this.renderButton()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 20,
    paddingTop: 65,
  },
});

export default Login;
