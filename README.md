#Serverless Content Management Project
Serverless content manager using AngularJS, NodeJS, Firebase and SchemaForm

###Keywords
Angular2, NodeJS, serverless, content manager, Firebase, SchemaForm.

##Introduction
The objective of this project is to create two Data-Driven applications.
The first one, is an admin that populates a Firebase instance with data
obtained via forms (using Angular2, SchemaForm and Firebase) to customize 
a Client-Side app content. The second one app, will be a Client-Side app
that reads content from the Firebase instance(using Angular2 and Firebase)
and populates a HTML template with the content that exists.

##Applications:
1. [Admin] (https://github.com/SYNERGY-GB/pas-content-manager-admin)
2. [Client] (https://github.com/SYNERGY-GB/pas-content-manager-client)
3. [Script] (https://github.com/SYNERGY-GB/pas-content-manager-scripts)

##Usage
1. Clone the project.
2. In a terminal, go to the project's folder. Then go to the script folder
3. Define a client in the clients folder. The new client should have the same properties as client_1.json
4. In /script, run `node createClient <name_of_the_new_client.json>`

##References:
1. [Angular2 Official Website](https://angular.io/ "Angular2 Official Website")
2. [Firebase Official Website](https://firebase.google.com/ "Firebase Official Website")
3. [Angular2 SchemaForm Github Repository](https://github.com/makinacorpus/angular2-schema-form "Angular2 SchemaForm Repo")
4. [Angular2 Firebase Official Github Repository](https://github.com/angular/angularfire2 "Angular2 Firebase Official Repo")
