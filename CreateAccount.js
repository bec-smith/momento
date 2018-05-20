import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as firebase from 'firebase';
import NavigationBar from 'react-native-navbar';
import { Analytics, ScreenHit, Event } from 'expo-analytics';

class CreateAccount extends React.Component {

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      emailEmpty: true,
      passwordEmpty: true,
    }
    global.analytics.hit(new ScreenHit('CreateAccount'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
      </TouchableWithoutFeedback>
    );
  }

  onCreateAccount() {
    console.log("create account");
    if (this.state.email.length != 0 && this.state.password.length != 0) {
      global.analytics.event(new Event('Account', 'Create', this.state.email))
        .then(() => console.log("success"))
        .catch(e => console.log(e.message));

      this.createAccount(this.state.email, this.state.password)
      this.props.navigation.navigate('Home');
      //Check if user's email already exists in database, if not create it and navigate to InviteUser.
      //If so, change password to user's chosen password, navigate straight to 'Home'
    }
  }

  //Create User Accounts
 createAccount(email, password){
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  		// Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		console.log(errorCode);
  		//console.log("SUBMITTED");
  	})
	//if the userName already exists in the DataBase

	var myRef = firebase.database().ref('/users/');
	myRef.once('value').then(function(snapshot)
	{
		var data = snapshot.val();
		console.log(data);
		if(data[this.emailToHeader(email)] !== undefined){

		}
		//If the user does not exist, create them on the DataBase!
		else{
  			this.addUser(this.emailToHeader(email), "blue");
  			//Create them a default momento
  			this.createMomento("default" + this.emailToHeader(email));
		}
	}.bind(this))

};


  addUser(userName, color){
	var myRef = firebase.database().ref('/users');
	myRef.update({[userName]: {color: color, momentos: {defaultMomento: userName}}});
}

 createMomento(momentoName){
	var myRef = firebase.database().ref('/data');
	myRef.update({[momentoName]: {0: 0}});
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

export default CreateAccount;
