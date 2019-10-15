"use strict";
/*
    Style.js - Ian Effendi
    Class dedicated to application of drawing styles.
*/

// Default styles.
import { Styles } from './../config.js';

// Contains style information.
export class Style {

    // Options contains the style information.
    constructor(options = {}) {
        this.lineWidth = options.lineWidth || Styles.DEFAULT.FILL_STYLE;
        this.lineCap = options.lineCap || Styles.DEFAULT.LINE_CAP;
        this.miterLimit = options.miterLimit || Styles.DEFAULT.MITER_LIMIT;
        this.fillStyle = options.fillStyle || Styles.DEFAULT.FILL_STYLE;
        this.strokeStyle = options.strokeStyle || Styles.DEFAULT.STROKE_STYLE;
    }

    // Apply style to the CanvasRenderingContext2D.
    applyStyle(context) {
        context.lineWidth = this.lineWidth;
        context.lineCap = this.lineCap;
        context.miterLimit = this.miterLimit;
        context.fillStyle = this.fillStyle;
        context.strokeStyle = this.strokeStyle;
    }
    
}
