"use strict";
// Entry app script

import {
    default as SECRETS
} from './_secret.js';

/* #2 - The rest of the Firebase setup code goes here */

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: SECRETS.API_KEY,
    authDomain: "igme330-highscoreproject.firebaseapp.com",
    databaseURL: "https://igme330-highscoreproject.firebaseio.com",
    projectId: "igme330-highscoreproject",
    storageBucket: "igme330-highscoreproject.appspot.com",
    messagingSenderId: SECRETS.SENDER_ID,
    appId: SECRETS.APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log(firebase); // #3 - make sure firebase is loaded

// Get the name field
// const nameField = document.querySelector("#nameField");

let score = 0;

clickMeButton.onclick = _ => {
    score++;
    scoreElement.innerText = score;
};

/*
saveScoreButton.onclick = _ => {
    console.log("Save score.");
    firebase.database().ref('scores').push({
        userID: nameField.value,
        score: score
    });
};
*/

saveScoreButton.onclick = _ => {
    let path = 'scores2/' + nameField.value;
    firebase.database().ref(path).set({
        userID: nameField.value,
        score: score
    });
};
