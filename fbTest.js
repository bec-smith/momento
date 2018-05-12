//Firebase Test of DB capability;



//BASIC CONFIGURATION OF DATABASE 
var config = {
    apiKey: "AIzaSyBll4lJ5NLPlwB-8g1-CpnVJQyJfv7gKH0",
    authDomain: "momento-2b343.firebaseapp.com",
    databaseURL: "https://momento-2b343.firebaseio.com",
    projectId: "momento-2b343",
    storageBucket: "momento-2b343.appspot.com",
    messagingSenderId: "765289385147"
};
firebase.initializeApp(config);
var database = firebase.database(); 



//signIn("myTest@new.com","password"); 
//createAccount("test6@fakeTest.com", "password")
//addUser("email", "purple");
var userName = signIn("test6@fakeTest.com", "password");
chooseColor(userName, "teal");




//Create User Accounts
function createAccount(email, password){ 
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  		// Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		console.log(errorCode);
  		//console.log("SUBMITTED");
  	})
	//if the userName already exists in the DataBase



	//If the userName does not already exist, then create a user with default momento







  	addUser(emailToHeader(email), "blue");





};
//createAccount("myTest@new.com","password"); 



function signIn(email, password){
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  		var errorCode = error.code;
  		var errorMessage = error.message;
  	});
  	return email;
}



//Log In to User Account, and view User Data
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  	myUser = user; 
    // User is signed in.
    var email = user.email;
    var uid = user.uid;
    console.log(email + "is Signed in!");
   	//console.log(uid); 

    } else {
  	//User is signed out
    console.log("No USER");
  }
});


//FUNCTION DESIGNED TO HELP STORE EMAILS AS KEYS
 function emailToHeader(email){
 	return email.replace(".","*-*");
 }
  function headerToEmail(header){
 	return header.replace("*-*",".");
 }



//GROUP DYNAMICS::: IMPORTANT PART USED FOR CREATING AND UPDATING DATABASE GROUPS
/////////////////////////////////////////////////////////////////////////////////


//Creates a Momento Group, and automatically populates it with the current user
function createGroup(groupName, name){
	var myRef = firebase.database().ref('/groups');
	myRef.update({[groupName]: {name: true}});
}

function addToGroup(groupName, newMember){
	var myRef = firebase.database().ref('/groups/' + groupName);
	myRef.update({[newMember]: true});
}


//CREATE AND EDIT INDIVIDUAL MOMENTOS
///////////////////////////////////////////////////////////////////////////////////
function createMomento(groupName, momentoName){
	var myRef = firebase.database().ref('/data');
	myRef.update({[momentoName]: {group: groupName}});
}

function addToMomento(momentoName, object){
	var myRef = firebase.database().ref('/data/' + momentoName);
	myRef.update(object);
}


//createMomento("CoolChrisGroup", "ChrisMomento");
var message = {message: "I love Chris, hes cool. And I can edit"};

addToMomento("ChrisMomento", message)



//User Groups
//Function -- add new User to the db
function addUser(userName, color){
	var myRef = firebase.database().ref('/users');
	myRef.update({[userName]: {color: color, momentos: {defaultMomento: userName}}});
}

function preAddUSer(userName, momentoName, inviter){
	var myRef = firebase.database().ref('/users');
	myRef.update({[userName]: {color: "blue", momentos: {[momentoName]: inviter}}});
}

//function -- add user access to momento
function grantUserMomento(userName, momentoName, inviter){
	var myRef = firebase.database().ref('/users/' + userName +'/momentos');
	console.log("I NEED TO UPDATE THIS QUICKLY ONCE I FIGURE OUT THE DEFAULT LOGIN");
	myRef.update({momentoName: inviter});
}




//retrieve momentos; 
	//Given a username and Momento, returns a list of the momentos that user has access to


function getUserMomentos(userName){
	var myRef = firebase.database().ref('/users/' + userName +'/momentos');
	return myRef.once('value').then(function(snapshot){
		var peep = snapshot.val();
		console.log(peep);
		return peep;
	})
}


function retrieveMomento(momentoName){
	var myRef = firebase.database().ref('/data/' + momentoName);
	return myRef.once('value').then(function(snapshot){
		var peep = snapshot.val();
		console.log(peep);
		return peep;
	})
}






var appData = {}
 Promise.all(getUserMomentos("TEsY").then(function(snapshots) {
 	//console.log(snapshots);
    appData.momentos = snapshots;
    console.log(appData);
}
))

  Promise.all(retrieveMomento("ChrisMomento").then(function(snapshots) {
 	//console.log(snapshots);
    appData.currentMomento = snapshots;
    console.log(appData);
}
))



















//Return momento:
//Returns a ref to the current momento if the user has access to it. 

//choose a color for you momentos to be displayed in
function chooseColor(userName, color){
	var myRef = firebase.database().ref('/users/' + emailToHeader(userName));
	myRef.update({color: color});
}


//BYDefault, you either create a "first momento," or join an already accessible momento
function inviteUserToMomento(userName, momentoName, inviter){
	var myRef = firebase.database().ref('/users/');
	myRef.once('value').then(function(snapshot)
	{
		var data = snapshot.val();	
		//If user exists, add the momento to their "list of momentos"
		console.log("THIS IS HOW I READ THE USERNAME ", data[emailToHeader(userName)] );
		if(data[emailToHeader(userName)] !== undefined){
			grantUserMomento(userName, momentoName, inviter);
		}
		//If the user does not exist, create them on the DataBase!
		else{
			//create user
			//console.log("I AM NOT IN THE DATABASE!");
			preAddUSer(userName, momentoName, inviter);

		}
	})		
}



	//If the user does not exist, create a "mock user" with their email address. WHen they create
	//a profile, they will have access to the momento (whether they want it or not)

//inviteUserToMomento("TEsX", "myMomento", "email");
//addUser("TEsY", "AFRO");









//Main Interaction List:

//Sign In 
