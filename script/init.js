/* This script is only to initialize the structure 
of the metadata Firebase instance */

var admin = require("firebase-admin");

var structure = require("./initStructure.json");
var serviceAccount = require("./credentials/PruebaSynergy-credentials.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://pruebasynergy-c5d93.firebaseio.com/"
})

// Writing or replacing at the Firebase Real Time DB
var db = admin.database();
var rootRef = db.ref();
rootRef.set(structure, function(error) {
    if (error)
    {
        console.log("Data could not be saved." + error);        
    }
    else
    {
        console.log("Data saved successfully.");
    }
});

