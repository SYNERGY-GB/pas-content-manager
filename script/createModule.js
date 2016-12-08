/* This is the structure required to write at the DB
    {
        "route": "moduleRoute"
        "name": "moduleName",
        "moduleDesc": "Clients module"
        "active": "false"
        "schemaForm": {
            "properties": {
                ChildUrl:
            }
        }
        "tableColumns": ["name", "instance"]
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
var modulesRef = db.ref("modules");
var newModuleObj, newModule;

/* 
    Pass the name(s) of the JSON file(s) as 
    a command line argument(s)
 */
if (process.argv.length > 2)
{
    for(var i = 2; i < process.argv.length; i++)
    {
        newModuleObj = require("./" + process.argv[i]);
        if (!isEmpty(newModuleObj))
        {
            newModuleRef = modulesRef.push();
            newModuleRef.set(newModuleObj, function(error) {
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