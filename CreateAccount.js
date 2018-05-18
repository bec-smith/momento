import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import NavigationBar from 'react-native-navbar';

class CreateAccount extends React.Component {

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      emailEmpty: true,
      passwordEmpty: true,
    }
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.navbar}>
          <NavigationBar
            leftButton = {{
              title: 'Cancel',
              handler: () => {this.props.navigation.goBack();},
            }}
          />
          <View style={styles.container}>
            <Text style={styles.titleText}>Welcome To</Text>
              <Text style={styles.titleText}>Momento</Text>

              <TextInput
                value={this.state.email}
                keyboardType = 'email-address'
                onChangeText={(email) => this.setState({ email: email, emailEmpty: email.length == 0 })}
                placeholder='email'
                placeholderTextColor = 'red'
                style={[this.state.emailEmpty ? styles.invalidInput : styles.validInput]}
              />

              <TextInput
                value={this.state.password}
                onChangeText={(password) => this.setState({ password: password, passwordEmpty: password.length == 0 })}
                placeholder={'password'}
                secureTextEntry={true}
                placeholderTextColor = 'red'
                style={[this.state.passwordEmpty ? styles.invalidInput : styles.validInput]}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={this.onCreateAccount.bind(this)}
             >
               <Text style={styles.buttonText}>Create Account</Text>
             </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  onCreateAccount() {
    console.log("create account");
    if (this.state.email.length != 0 && this.state.password.length != 0) {
      //Check if user's email already exists in database, if not create it and navigate to InviteUser.
      //If so, change password to user's chosen password, navigate straight to 'Home'
      this.props.navigation.navigate('InviteUser');
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
  navbar: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 115,
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

export default CreateAccount;
