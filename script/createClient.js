/* This is the structure required to write at the DB
    {
        "name": "FeedMe",
        "childRoute": "feedbackcontinuo",
        "firebaseInstance": "https://feedbackcontinuo.firebaseio.com",
        "secret": "",
        "modules": ["banners", "news"]
    }
 */

// Utility-Wrapper. Return true if the object is not empty
function isEmpty(obj)
{
    return (Object.getOwnPropertyNames(obj).lengt === 0);
}

var admin = require("firebase-admin");
var serviceAccount = require("./credentials/PruebaSynergy-credentials.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://pruebasynergy-c5d93.firebaseio.com/"
})

var db = admin.database();
var clientsRef = db.ref("clients");
var newClientObj, newClient;

/* 
    Pass the name(s) of the JSON file(s) as 
    a command line argument(s)
 */
if (process.argv.length > 2)
{
    for(var i = 2; i < process.argv.length; i++)
    {
        newClientObj = require("./" + process.argv[i]);
        if (!isEmpty(newClientObj))
        {
            newClientRef = clientsRef.push();
            newClientRef.set(newClientObj, function(error) {
                if (error)
                {
                    console.log("Data could not be saved." + error);        
                }
                else
                {
                    console.log("Data saved successfully.");
                }
            });
        }
    }
}