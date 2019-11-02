"use strict";
// Entry app script

/* #2 - The rest of the Firebase setup code goes here */

console.log(firebase); // #3 - make sure firebase is loaded

let score = 0;

clickMeButton.onclick = _ => {
    score++;
    scoreElement.innerText = score;
};
