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



signIn("myTest@new.com","password"); 





//Create User Accounts
function createAccount(email, password){ 
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  		// Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		console.log(errorCode);
  		console.log("SUBMITTED");
  		// ...
	})
};
//createAccount("myTest@new.com","password"); 


function signIn(email, password){
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  		var errorCode = error.code;
  		var errorMessage = error.message;
  	});
}



//Log In to User Account, and view User Data
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  	myUser = user; 
    // User is signed in.
    var email = user.email;
    var uid = user.uid;
    console.log(email + "is Signed in!");
    console.log(uid); 

    } else {
  	//User is signed out
    console.log("No USER");
  }
});



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










