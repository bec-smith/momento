import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,TouchableHighlight, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import NavigationBar from 'react-native-navbar';
import { Ionicons , FontAwesome} from '@expo/vector-icons';
import * as firebase from 'firebase';
import { Analytics, ScreenHit } from 'expo-analytics';

class InviteUser extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      emailEmpty: true,
    }
    global.analytics.hit(new ScreenHit('InviteUser'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.navbar}>
        <NavigationBar
          title = {{
            title: 'Invite Partner',
          }}
          leftButton = {{
            title: 'Cancel',
            handler: () => {this.props.navigation.goBack();},
          }}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.titleText}>Invite Your</Text>
            <Text style={styles.titleText}>Significant Other</Text>
            <Text style={styles.subtitleText}>(They will create an account with this email and we'll make a joint timeline for the two of you!)</Text>

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

           <View style={styles.buttons}>
                <TouchableHighlight  onPress={() => {this.props.navigation.navigate('Home');}}  >
                    <FontAwesome
                      size={30}
                      name='home'
                      color='white'
                    />
               </TouchableHighlight>
          </View>

        </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  onInviteUser() {
    if (this.state.email.length != 0) {
      this.inviteUserToMomento(this.emailToHeader(this.state.email), global.timelineName)
      this.props.navigation.navigate('Home');
    }
  }

  emailToHeader(email) {
   return email.replace(".","*-*");
  }

  headerToEmail(header) {
   return header.replace("*-*",".");
  }


 preAddUSer(userName, momentoName){
	var myRef = firebase.database().ref('/users');
	myRef.update({[userName]: {color: "blue", momentos: {[momentoName]: momentoName}}});
}

//Helper function to "inviteUserToMomento." function -- associate a momento with a user account.
 grantUserMomento(userName, momentoName){
	var myRef = firebase.database().ref('/users/' + userName +'/momentos');
	myRef.update({[momentoName]: momentoName});
}


//myMomento.update({[title]: {title: title, description: description, imageUrl: imageURL, time: time}});
//BYDefault, you either create a "first momento," or join an already accessible momento

//remember, call the "emailToHeader" method to get the proper username
 inviteUserToMomento(userName, momentoName){
	var myRef = firebase.database().ref('/users/');
	myRef.once('value').then(function(snapshot)
	{
		var data = snapshot.val();
    console.log(data[this.emailToHeader(userName)]);
		//If user exists, add the momento to their "list of momentos"
		if(data[this.emailToHeader(userName)] !== undefined){
			this.grantUserMomento(userName, momentoName);
		}
		//If the user does not exist, create them on the DataBase!
		else{
			this.preAddUSer(userName, momentoName);
		}
	}.bind(this))
}
}


const styles = StyleSheet.create({
  navbar: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingTop: 28,
  },
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
  subtitleText:{
    padding: 10,
    fontFamily: 'Baskerville',
    fontSize: 20,
    fontStyle: 'italic',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttons: {
    alignItems: 'flex-end',
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
