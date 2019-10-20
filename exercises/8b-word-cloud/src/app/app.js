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
    getElement
} from './../utils/dom-utils.js';
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
            
            // Prepare the controls.
            this.controls = {
                output: getElement('#corpus-preview'),                
            };
            
            // Initialize dragging events.
            let _preview = this.controls.output;
            if(!_preview){
                reject('Could not initialize dragover events.');
            }
            
            // Set up the drag events.            
            this.canvasHandler.canvas.ondragenter = (e) => {
                e.stopPropagation();
                e.preventDefault();
                e.target.classList.add("dragging");
            };
            
            this.canvasHandler.canvas.ondragover = (e) => {
                e.stopPropagation();
                e.preventDefault();
            };
            
            this.canvasHandler.canvas.ondrop = (e) => {
                e.stopPropagation();
                e.preventDefault();
                e.target.classList.remove("dragging");
                let file = e.dataTransfer.files[0];
                if(file){
                    let reader = new FileReader();
                    reader.onload = (evt) => {
                        let s = evt.target.result;
                        _preview.innerHTML = s;
                    };
                    reader.readAsText(file);                        
                }
            };

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
