"use strict";
/*
    Canvas.js - Ian Effendi
    Canvas class.
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
    isElement,
    getElement
}
from './../utils/dom-utils.js';

// Manages instance of the canvas and CanvasRenderingContext2D.
export class CanvasHandler {

    // Create the canvas handler.
    constructor(canvasElement) {
        this.debug = debugConsole(Flags.DEBUG.CANVAS);

        // If the canvasElement is not an element, check if it's a selector.
        this.canvas = (!dom.isElement(canvasElement)) ? dom.getElement(canvasElement) : canvasElement;
        this.debug.dir(`Canvas element: ${this.canvas}`);
        this.context = (this.canvas) ? this.canvas.getContext("2d") : null;
        this.debug.dir(`CanvasRenderingContext2D: ${this.context}`);
    }

}
