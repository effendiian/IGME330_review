"use strict";
/*
    Main.js
    Entry point for the application.
*/

import {
    Canvas
} from './canvas.js';

let canvasHandler, clearButton;

window.onload = (() => {
    console.log("Initializing application.");

    // Create the canvas.
    canvasHandler = new Canvas("#canvas");

    // Create the clear button event.
    clearButton = document.querySelector("#clearButton");
    clearButton.onclick = canvasHandler.clear.bind(canvasHandler);

    // Handler elements.
    console.dir(canvasHandler);
    console.dir(clearButton);

})();
