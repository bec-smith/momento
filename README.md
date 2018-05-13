
function getfirstMomento(userName){
	Promise.all(getUserMomentos(userName).then(function(snapshots) {
 	//console.log("FUNCTIN KEYS,", snapshots);
 	var appData = {}; 
    for (key in snapshots){
    	//console.log("KEY,", key)
    	//console.log(snapshots[key]);
		Promise.all(retrieveMomento(snapshots[key]).then(function(snapshots) {
 		appData.key = snapshots;
		console.log("snapshot,",appData);    
		return appData;
    }))
    }    	
    //console.log(appData);
}))
};

function getUserMomentos(userName){
	var myRef = firebase.database().ref('/users/' + userName +'/momentos');
	return myRef.once('value').then(function(snapshot){
		var peep = snapshot.val();
		return peep;
	})
}


function retrieveMomento(momentoName){
	var myRef = firebase.database().ref('/data/' + momentoName);
	return myRef.once('value').then(function(snapshot){
		var peep = snapshot.val();
		//console.log(peep);
		return peep;
	})
}
