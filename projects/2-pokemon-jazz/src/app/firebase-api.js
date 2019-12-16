"use strict";

// firebase-api.js
// Module helping with firebase service.

// Import functions.
import Secret from './../config/_secret.js';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: Secret.API_KEY,
    authDomain: "igme330-pokemonpoetry.firebaseapp.com",
    databaseURL: "https://igme330-pokemonpoetry.firebaseio.com",
    projectId: "igme330-pokemonpoetry",
    storageBucket: "igme330-pokemonpoetry.appspot.com",
    messagingSenderId: Secret.SENDER_ID,
    appId: Secret.APP_ID
};

// firebase.initializeApp(firebaseConfig);

export default {
    
  // Initialize Firebase
  initialize: function(){
    if(!window.firebase.apps.length){
      window.firebase.initializeApp(firebaseConfig);
    }
  }  
  
}