"use strict";
/*
  Main.js -  Ian Effendi  
  Entry point for the audio visualizer application.
*/

// Import the application.
import { Application } from './app.js';

// Get element and check to see if it exists.
function getElement(selector) {
    let elem = document.querySelector(selector);
    if(!selector){
        throw new Error('This selector does not exist.');
    }
    else if(!elem){
        throw new Error('No element was found with this selector.');
    }
    return elem;
}

// Initialize the application.
function init() {
    
    // Construct the application.
    let app = new Application({
        canvas: getElement('canvas#mainCanvas'),
        audioSource: getElement('audio.player.element'),
        controls: {
            toggleButton: getElement('button.toggle.button')
        }
    });
    
    // Initialize the application and then run it.
    app.init().then((result) => {
        console.log("Application initialized.");
        app.run();
    }).catch((err) => {
        console.error(`The application failed to be initialized. (${err})`);
        return;
    });
    
};

// Assign the init function to run after window has been loaded.
window.onload = init;