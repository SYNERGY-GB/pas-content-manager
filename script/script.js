var admin = require("firebase-admin");
var merge = require("merge");

var serviceAccount = require("path_to_service_account_credentials");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://pruebasynergy-c5d93.firebaseio.com/"
})


// MockUp of the initial structure

var structure = {
    clients: [
        {
            name: "Leo",
            id: 1,
            instance: "appDelClient.firebaseio.com/"
        }
    ],
    modules: [
        {
            name: "Posts",
            id: 1,
        }
    ]
};


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

