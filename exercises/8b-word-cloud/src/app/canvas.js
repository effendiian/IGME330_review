"use strict";
/*
    Canvas.js - Ian Effendi
    Canvas class.
*/

// Import statements.
import {
    Flags,
    Settings
}
from './config.js';
import {
    debugConsole
}
from './../utils/debug.js';
import {
    isElement,
    getElement
}
from './../utils/dom-utils.js';

// Manages instance of the canvas and CanvasRenderingContext2D.
export class CanvasHandler {

    // Create the canvas handler.
    constructor(canvasElement, height, width) {
        this.debug = debugConsole(Flags.DEBUG.CANVAS);

        // If the canvasElement is not an element, check if it's a selector.
        this.canvas = (!isElement(canvasElement)) ? getElement(canvasElement) : canvasElement;
        this.debug.dir(`Canvas element: ${this.canvas}`);
    }

    // Initialize the canvas object. Returns a promise that passes along this instance of the handler on success.
    init() {
        return new Promise((resolve, reject) => {
            // Check if canvas was properly set.
            if (!this.canvas) {
                reject("Cannot initialize handler without canvas.");
            }

            // Get the rendering context.
            this.context = (this.canvas) ? this.canvas.getContext("2d") : null;
            this.debug.dir(`CanvasRenderingContext2D: ${this.context}`);
            if (!this.context) {
                reject("Failed to initialize the CanvasRenderingContext2D.");
            }
            
            // Initialize the unscaled dimensions.
            this.unscaledWidth = (this.canvas) ? this.canvas.width : Settings.DEFAULT.CANVAS.SIZE.WIDTH;
            this.unscaledHeight = (this.canvas) ? this.canvas.height : Settings.DEFAULT.CANVAS.SIZE.HEIGHT;

            // Fix the dpi.
            this.resize({
                width: this.unscaledWidth,
                height: this.unscaledHeight
            });

            // Resolve once successfully initialized.
            resolve(this);
        });
    }

    // Fix the DPI ratio.
    // https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da
    resize(dimensions = undefined) {
        // Only overwrite the dimensions if they were passed in.
        this.unscaledWidth = (dimensions.width) ? dimensions.width : this.unscaledWidth;
        this.unscaledHeight = (dimensions.height) ? dimensions.height : this.unscaledHeight;

        // Retrieve the dpi of the window if we haven't already cached it.
        this.dpi = this.dpi || window.devicePixelRatio;

        // Retrieve the computed style information.        
        let style = {
            width: (canvas) => {
                return +window.getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
            },
            height: (canvas) => {
                return +window.getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
            }
        };
        
        // Update the attributes on the canvas.
        this.canvas.setAttribute('width', style.width(this.canvas) * this.dpi);
        this.canvas.setAttribute('height', style.height(this.canvas) * this.dpi);
        this.debug.log(`Set canvas dimensions to ${this.canvas.width} by ${this.canvas.height} with DPI of ${this.dpi}.`);
    }

}
