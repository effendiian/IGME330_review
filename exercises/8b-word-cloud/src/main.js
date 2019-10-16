"use strict";
/*
    Main.js - Ian Effendi
    Word cloud application entry point.
*/

/*
    Requirements:
    - Words should animate in size 'grow'.
    - Words should appear sequentially as the list is being processed.
        - Apply intentional delay to the update loop.
        - Async process words in background, but schedule appearences.
    - Words should be their own objects.
    - Canvas should display words. They should not overlap.
    - Limit number of words that are drawn to the cloud.
    - More frequent words will appear larger than less frequent ones.
    - Specify a minimum font size for the words you draw.
    - Animate words (side to side?) (looping?).
    - Enable drag and dropover features for canvas.
*/

// Import statements.
import {
    Flags
}
from './app/config.js';
import {
    debugConsole
}
from './utils/debug.js';
import {
    Application
}
from './app/app.js';

// Entry point for the application.
function main() {  
    // Main module debug console.
    const debug = debugConsole(Flags.DEBUG.MAIN);
    debug.log("Window is loaded. Starting...");
    
    // Construction of the application.
    const app = new Application();    
    
    // Initialize the application and then start if it is successful.
    app.init().then((result) => {
        debug.log('Application initialized.');
        app.start();
    }).catch((err) => {
        debug.error(err);
    });
}

// Execute init after the window is loaded.
window.addEventListener('load', main.bind(window));
