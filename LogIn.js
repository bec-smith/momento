import React, { Component } from 'react';
import { Image, Button, StyleSheet, Text, View } from 'react-native';
import { AuthSession } from 'expo';


class Login extends React.Component {
  state = {
    userInfo: null,
  };
  static navigationOptions = {
    header: null,
  };

  render() {
    const APP_ID = '186248128856893';

    return (
      <View style = {styles.container}>
        <Text Login Screen </Text>
        <Button
          title="Login"
          onPress={this.logIn}
        />
      </View>
    );
  }

  async function logIn() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('<APP_ID>', {
        permissions: ['public_profile'],
      });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
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
});

export default Login;
