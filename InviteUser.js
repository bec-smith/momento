import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';

class InviteUser extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      emailEmpty: true,
    }
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Invite Your</Text>
          <Text style={styles.titleText}>Significant Other</Text>

          <TextInput
            value={this.state.email}
            keyboardType = 'email-address'
            onChangeText={(email) => this.setState({ email: email, emailEmpty: email.length == 0 })}
            placeholder='email'
            placeholderTextColor = 'red'
            style={[this.state.emailEmpty ? styles.invalidInput : styles.validInput]}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={this.onInviteUser.bind(this)}
         >
           <Text style={styles.buttonText}>Invite</Text>
         </TouchableOpacity>
      </View>
      </TouchableWithoutFeedback>
    );
  }

  onInviteUser() {
    if (this.state.email.length != 0) {
      //Add user to Firebase
      this.props.navigation.navigate('Home');
    }
  }

  emailToHeader(email) {
   return email.replace(".","*-*");
  }

  headerToEmail(header) {
   return header.replace("*-*",".");
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  titleText:{
    fontFamily: 'Baskerville',
    fontSize: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'powderblue',
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText:{
    fontFamily: 'Baskerville',
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  validInput: {
    width: 200,
    fontFamily: 'Baskerville',
    fontSize: 20,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 10,
  },
  invalidInput: {
    width: 200,
    fontFamily: 'Baskerville',
    fontSize: 20,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'red',
    marginVertical: 10,
  }
});

export default InviteUser;
