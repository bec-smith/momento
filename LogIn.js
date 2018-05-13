import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native';
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
global.database = firebase.database();

class Login extends React.Component {
  constructor(props) {
     super(props);
     this.doSomething = this.doSomething.bind(this);
     this.getUserMomentos = this.getUserMomentos.bind(this);

     this.onLogin = this.onLogin.bind(this);


     this.state = {
       email: '',
       password: '',
       momentos: '',
     };

   }

  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  };



render() {
  const { params } = this.props.navigation.state;
  return (
    <View style={styles.container}>
    <Text style={styles.titleText}>Hi, Welcome To</Text>
      <Text style={styles.titleText}>Momento</Text>
      <TextInput
        value={this.state.email}
        keyboardType = 'email-address'
        onChangeText={(email) => this.setState({ email })}
        placeholder='email'
        placeholderTextColor = 'white'
        style={styles.input}
      />
      <TextInput
        value={this.state.password}
        onChangeText={(password) => this.setState({ password })}
        placeholder={'password'}
        secureTextEntry={true}
        placeholderTextColor = 'white'
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={this.onLogin.bind(this)}
     >
       <Text style={styles.buttonText}>Login</Text>
     </TouchableOpacity>

    </View>
  );
}

onLogin() {
  const { email, password, momentos } = this.state;
  //Alert.alert('Credentials', `email: ${email} + password: ${password}`);
  this.signIn(email,password)

   Promise.all(this.getMomentoName(this.emailToHeader(email)).then(function(snapshots){
    this.doSomething(email,snapshots)
 }.bind(this)))


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
    momentoName = Object.keys(momentoName)[0];
    console.log("MomentoName,", momentoName);
    var momentoRef = firebase.database().ref('/data/' + momentoName);
    return momentoRef.once('value').then(function(snapshot){
    momento = snapshot.val()
    console.log(momento)
       return momento;
     }.bind(this))
}


doSomething(email,snapshots){
  this.props.navigation.navigate('Home', {
   user: email,
   momentos: snapshots,
 });
}


emailToHeader(email){
 return email.replace(".","*-*");
}
headerToEmail(header){
 return header.replace("*-*",".");
}

// getfirstMomento(userName)
// {
//  Promise.all(getUserMomentos(userName).then(function(snapshots)
//  {
//    //console.log("FUNCTIN KEYS,", snapshots);
//   var appData = {};
//   for (key in snapshots)
//   { //console.log("KEY,", key) //console.log(snapshots[key]);
//         Promise.all(retrieveMomento(snapshots[key]).then(function(snapshots)
//         { appData.key = snapshots; console.log("snapshot,",appData);
//         return appData;
//        }
//      ))
//    }
//    //console.log(appData);
//  }))
// };
//
// getUserMomentos(userName)
// {
//    var myRef = firebase.database().ref('/users/' + userName +'/momentos');
//    return myRef.once('value').then(function(snapshot){
//    var peep = snapshot.val();
//    return peep; })
// }
//
// retrieveMomento(momentoName)
// {
//  var myRef = firebase.database().ref('/data/' + momentoName);
//  return myRef.once('value').then(function(snapshot){
//    var peep = snapshot.val();
//    //console.log(peep);
//    return peep;
//  })
// }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'salmon',
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
  input: {
    width: 200,
    fontFamily: 'Baskerville',
    fontSize: 20,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 10,
  },
});


export default Login;
