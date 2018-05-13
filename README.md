function getFirstMomento(userName){
	var userRef = firebase.database().ref('/users/' + userName +'/momentos');
	userRef.once('value').then(function(snapshot){
		var userValue = snapshot.val();
		var momentoName = userValue[Object.keys(userValue)[0]];
		//console.log(momentoName)

		//now get first momento Name; 

		//now get momento
		var momentoRef = firebase.database().ref('/data/' + momentoName);
		return momentoRef.once('value').then(function(snapshot){
			return momento = snapshot.val();
			//console.log(momento);
	})
})}
