"use strict";
/*
    Renderer.js - Ian Effendi
    Renderer that will display graphics on the HTML5 canvas and set up image manipulations.
*/

// Renderer class renders graphical elements to the HTML5 canvas.
export class Renderer {
    
    // Construct a renderer and context.
    constructor(canvas){
        
        // Assign the canvas.
        this.canvas = canvas;
        this.ctx = undefined;
        this.initialized = false;        
        
    }
    
    // Initializes the renderer and any necessary components.
    init(){        
        // Check the init flag.
        if(this.initialized){
            return;
        }        
        
        // Prepare the renderer properties.
        this.ctx = canvas.getContext('2d');        
        
        // Set the init flag to true.
        this.initialized = true;
    }
    
    // Draws necessary information to the canvas.
    render(){
        // TODO.    
    }
    
}