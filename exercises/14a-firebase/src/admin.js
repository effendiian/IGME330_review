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

firebase.database().ref("scores2").on("value", dataChanged, firebaseError);

function dataChanged(data) {
    let obj = data.val();
    console.log(obj);

    let bigString = "";

    for (let key in obj) {
        let row = obj[key];
        bigString += `<li>${row.userID} : ${row.score}</li>`;
        console.log(row);
    }

    scoresList.innerHTML = bigString;
}

function firebaseError(error) {
    console.log(error);
}

firebase.database().ref("scores2/MADMAX").on("value", madmaxChanged, firebaseError);

function madmaxChanged(data) {
    let obj = data.val();
    console.log(`madmaxChanged = ${obj}`);
    console.log(`userName = ${obj.userID}`);
    console.log(`score = ${obj.score}`);

    madmaxScore.innerHTML = `${obj.userID} : ${obj.score}`;
}
