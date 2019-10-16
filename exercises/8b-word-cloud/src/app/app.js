"use strict";
/*
  App.js - Ian Effendi
  Contains the code for running the application.
*/

// Import statements.
import {
    Flags
}
from './config.js';
import {
    debugConsole
}
from './../utils/debug.js';

// Application class can be initialized and then run.
export class Application {

    // Takes no arguments.
    constructor() {
        this.debug = debugConsole(Flags.DEBUG.APP);
        
        // Prepare members.
        this.canvasHandler = undefined;
        this.controls = undefined;
    }

    // Initialize the application.
    init() {
        this.debug.log("Initializing application.");
        return new Promise((resolve, reject) => {


            // If initialized, return this.
            resolve(this);
        });
    }
    
    // First run of the application.
    start() {
        this.debug.log('Starting application.');
    }
    
    // Application loop.
    loop() {
        
    }

}
