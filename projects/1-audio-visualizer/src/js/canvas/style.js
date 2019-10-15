"use strict";
/*
    Style.js - Ian Effendi
    Class dedicated to application of drawing styles.
*/

// Default styles.
const Styles = {
    DEFAULT_LINE_WIDTH: 1,
    DEFAULT_LINE_CAP: 'butt',
    DEFAULT_LINE_JOIN: 'bevel',
    DEFAULT_MITER_LIMIT: 10,
    DEFAULT_FILL_STYLE: 'black',
    DEFAULT_STROKE_STYLE: 'black'
};

// Contains style information.
export class Style {

    // Options contains the style information.
    constructor(options = {}) {
        this.lineWidth = options.lineWidth || Styles.DEFAULT_LINE_WIDTH;
        this.lineCap = options.lineCap || Styles.DEFAULT_LINE_CAP;
        this.miterLimit = options.miterLimit || Styles.DEFAULT_MITER_LIMIT;
        this.fillStyle = options.fillStyle || Styles.DEFAULT_FILL_STYLE;
        this.strokeStyle = options.strokeStyle || Styles.DEFAULT_STROKE_STYLE;
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
