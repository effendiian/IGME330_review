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
    constructor(position, rotation, scale) {
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }

    // Apply transformation in the order of (S)cale - (R)otate - (T)ranslate to the CanvasRenderingContext2D.
    applyTransformation(context) {
        if (this.scale) {
            context.scale(this.scale.x, this.scale.y);
        }
        if (this.rotation) {
            context.rotate(this.rotation);
        }
        if (this.position) {
            context.translate(this.position.x, this.position.y);
        }
    }

}
