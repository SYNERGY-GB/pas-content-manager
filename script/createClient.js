/*
    This script is intended to instantiate and load
    the modules of a new client.
 */


/*
    Dependencies
*/
var _ = require("lodash");
var admin = require("firebase-admin"); 


/* Utility-Wrappers */
function isEmpty(obj)
{
    return (Object.getOwnPropertyNames(obj).lengt === 0);
}

function isSubset(source, target) {
    return !_.difference(_.flatten(source), _.flatten(target)).length;
}

/*
    Check if there is a client to create. The new client
    is passed by a command line argument
*/
if (process.argv.length == 3)
{
    var newClient = require("./clients/" + process.argv[2] + ".json");
}
else
{
    throw new Error("There is no new client parameter defined");
}

/*  
    Initialize the Firebase instance with the new client 
    with the data of the newClient object
*/
admin.initializeApp({
    credential: admin.credential.cert(newClient.secret),
    databaseURL: newClient.firebaseInstance
})

/* 
    Import the init configuration to verify if the
    new client modules are a subset of the 
    modules in the metadata.
*/
var config = require("./config/init.json");
if (!isSubset(newClient.modules, config.modules))
{
    throw new Error("The set of modules is not a valid subset.")
}

/*
    Reference to the root of the new client Firebase
    instance
*/
var db = admin.database();
var rootRef = db.ref();

/*
    Iterate through the new client modules and set
    the new module at the Firebase instance.
*/
var saved = 0;

for(var i = 0; i < newClient.modules.length; i++)
{
    moduleObj = require("./modules/"+newClient.modules[i]+".json");
    if (!isEmpty(moduleObj))
    {
        modulesRef = rootRef.child("modules");
        modulesRef = modulesRef.child(newClient.modules[i]);
        modulesRef.set(moduleObj, function(error) {
            if (error)
            {
                console.log("Data could not be saved." + error);        
            }
            else
            {
                saved++;
                if (saved == 1)
                    console.log("1 Module saved.");
                else
                    console.log(saved + " Modules saved.");
                if (saved == newClient.modules.length){
                    console.log("Done!");
                    db.goOffline();
                }                                
            }
        });
    }
}

