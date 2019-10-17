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
import {
    CanvasHandler
} from './canvas.js';


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

            // Initialize the canvas handler.
            this.canvasHandler = new CanvasHandler('canvas#wordCloud');
            this.canvasHandler.init().then((handler) => {
                this.debug.log("Initialized the CanvasHandler.");
                this.debug.dir(handler);
            }).catch((e) => {
                this.debug.error(e);
                reject('Could not initialize the CanvasHandler.');
            });

            // Currently not implemented.
            reject('Application class not implemented.');

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
