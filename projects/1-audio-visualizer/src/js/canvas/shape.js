"use strict";
/*
    Shape.js - Ian Effendi
    Contains several functions that are helpful for drawing basic shapes.
*/

import { PI } from './../utils/math.js';

// Rectangle drawing class.
export class Rectangle {
    
    // Construct a rectangle of given size.
    constructor(length, width) {
        this.length = length || 10;
        this.width = width || 10;
    }
    
    // Callback function to draw with, given a CanvasRenderingContext2D.
    draw(context) {
        context.beginPath();
        context.rect(0, 0, this.length, this.width);
        context.fill();
        context.stroke();        
    }    
    
}

// Square drawing class.
export class Square extends Rectangle {
    
    // Construct a rectangle of given size.
    constructor(size) {
        super(size, size);
    }
    
}

// Circle drawing class.
export class Circle {
    
    // Construct a circle of given radius.
    constructor(radius) {
        this.radius = radius || 10;
    }
    
    // Callback function to draw with, given a CanvasRenderingContext2D.
    draw(context) {
        context.beginPath();
        context.arc(0, 0, this.radius, 0, 2 * PI, false);
        context.fill();
        context.stroke();        
    }
    
}