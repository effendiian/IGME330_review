"use strict";
/*
    Canvas.js - Ian Effendi
    Series of helper functions for manipulating the HTML5 Canvas.
*/

// Class wrapping functions for the canvas.
export class Canvas {
    
    // Construct a canvas element using an existing HTMLCanvasElement or its selector.
    constructor(canvasElement, width = undefined, height = undefined) {        
        this.canvas = canvasElement;        
        this.context = canvasElement.getContext("2d");
        this.canvas.width = width || this.canvas.width;
        this.canvas.height = height || this.canvas.height;
    }
    
    // Resize the canvas.
    resize(width, height) {
        this.canvas.width = width || this.canvas.width;
        this.canvas.height = height || this.canvas.height;
    }
    
    // Clear the canvas.
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);        
    }
    
    // Draw something to the screen.
    draw(paintCallback, transform, style) {
        this.context.save();
        
        this.applyTransform(transform);
        this.applyStyle(style);
        paintCallback();
        
        this.context.restore();
    }
    
    // Apply transformations.
    applyTransform(transform) {
        
    }
    
    // Apply style.
    applyStyle(style) {
        
    }
    
    
}