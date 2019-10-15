"use strict";
/*
    Transform.js - Ian Effendi
    Class dedicated to translation, rotation, and scale applications.
*/

// Import statement.
import {
    Vector2 as vec2
} from './../utils/vector.js';

// Contains transformation matrix information.
export class Transform {

    // Construction of a transform takes in either no arguments or translation, rotation, and scale.
    constructor(position = undefined, rotation = undefined, scale = undefined) {
        this.position = position || new vec2(0, 0);
        this.rotation = rotation || 0.0;
        this.scale = scale || new vec2(0, 0);
    }

    // Apply transformation in the order of (S)cale - (R)otate - (T)ranslate to the CanvasRenderingContext2D.
    applyTransformation(context) {
        context.scale(this.scale.x, this.scale.y);
        context.rotate(this.rotation);
        context.translate(this.position.x, this.position.y);
    }
    
}
