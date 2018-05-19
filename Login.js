import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as firebase from 'firebase';


global.config = {
    apiKey: "AIzaSyBll4lJ5NLPlwB-8g1-CpnVJQyJfv7gKH0",
    authDomain: "momento-2b343.firebaseapp.com",
    databaseURL: "https://momento-2b343.firebaseio.com",
    projectId: "momento-2b343",
    storageBucket: "momento-2b343.appspot.com",
    messagingSenderId: "765289385147"
};
firebase.initializeApp(global.config);
global.storage = firebase.storage();
global.database = firebase.database();

class Login extends React.Component {
  constructor(props) {
     super(props);
     this.getUserMomentos = this.getUserMomentos.bind(this);

     this.onLogin = this.onLogin.bind(this);


     this.state = {
       email: 'chris@test.com',
       password: 'password',
       momentos: '',
       emailEmpty: true,
       passwordEmpty: true,
     };

   }

  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  };



render() {
  const { params } = this.props.navigation.state;
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
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
          onPress={this.onLogin.bind(this)}
        >
         <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={this.onSignUp.bind(this)}>

          <Text style={styles.buttonText}>Create New Account</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

onLogin() {
  const { email, password, momentos } = this.state;

    this.signIn(email,password)

    Promise.all(this.getMomentoName(this.emailToHeader(email)).then(function(snapshots){
      this.props.navigation.navigate('Home');
    }.bind(this)))



}

onSignUp() {
    this.props.navigation.navigate('CreateAccount');
}

signIn(email, password){
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  		var errorCode = error.code;
  		var errorMessage = error.message;
  	});

}

 getMomentoName(userName){
	var myRef = firebase.database().ref('/users/' + userName +'/momentos');
	return myRef.once('value').then(function(snapshot){
		var peep = snapshot.val();
		 //console.log(peep);
	return this.getUserMomentos(peep)
	}.bind(this))
}


getUserMomentos(momentoName){
    global.allTimelineNames = Object.values(momentoName);
    singleMoment = momentoName[Object.keys(momentoName)[0]];
    global.timelineName = singleMoment;
    console.log(global.allTimelineNames)

}


emailToHeader(email){
 return email.replace(".","*-*");
}
headerToEmail(header){
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
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'powderblue',
  //  width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 25,
    marginBottom: 25,
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
  },
});


export default Login;
