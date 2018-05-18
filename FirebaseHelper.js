import React, { Component } from 'react';
import * as firebase from 'firebase';


//This function is used to push a momento to the database; I've changed it slightly
//here in order to utilize the momento title as a database key, instead of a number.
//This will make each momento easier to identify.


export function pushMomento(title, description, imageURL, time, momentoName) {

	var myMomento = firebase.database().ref('/data/' + momentoName);
	myMomento.once('value').then(function(snapshot)
	{
		var numMomentos = snapshot.val();
		var numMomentos = numMomentos[Object.keys(numMomentos)[0]];
		myMomento.update({[numMomentos + 1]: {title: title, description: description, images: imageURL, time: time, id: (numMomentos+1)}});
		myMomento.update({0: numMomentos +1});
	})
}


//When passed a momento and an ID for a momento entry, this function deletes that entry
export function deleteMomento(momentoName, id) {
	var myRef = firebase.database().ref('/data/' + momentoName);
	myRef.child(id).remove();
}



//Helper function to "inviteUserToMomento." A function that creates a new user on the dataBase (but not in the authentication portion) to represent
//that a user has been invited to join a momento.
export function preAddUSer(userName, momentoName) {
	var myRef = firebase.database().ref('/users');
	myRef.update({[userName]: {color: "blue", momentos: {[momentoName]: momentoName}}});
}

//Helper function to "inviteUserToMomento." function -- associate a momento with a user account.
export function grantUserMomento(userName, momentoName) {
	var myRef = firebase.database().ref('/users/' + userName +'/momentos');
	myRef.update({[momentoName]: momentoName});
}


//myMomento.update({[title]: {title: title, description: description, imageUrl: imageURL, time: time}});
//BYDefault, you either create a "first momento," or join an already accessible momento

//remember, call the "emailToHeader" method to get the proper username
export function inviteUserToMomento(userName, momentoName) {
	var myRef = firebase.database().ref('/users/');
	myRef.once('value').then(function(snapshot)
	{
		var data = snapshot.val();
		//If user exists, add the momento to their "list of momentos"
		if(data[emailToHeader(userName)] !== undefined){
			grantUserMomento(userName, momentoName);
		}
		//If the user does not exist, create them on the DataBase!
		else{
			preAddUSer(userName, momentoName);
		}
	})
}