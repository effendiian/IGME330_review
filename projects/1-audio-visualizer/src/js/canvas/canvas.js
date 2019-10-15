"use strict";
/*
    Canvas.js - Ian Effendi
    Series of helper functions for manipulating the HTML5 Canvas.
*/

// Import debug flags.
import {
    Flags,
    Styles,
    createDebugLogger
} from './../config.js';

// Class wrapping functions for the canvas.
export class Canvas {

    // Construct a canvas element using an existing HTMLCanvasElement or its selector.
    constructor(canvasElement, options = {}) {
        this.print = createDebugLogger('Canvas', Flags.DEBUG.CANVAS);
        this.canvas = canvasElement;
        this.background = options.background;
        this.context = (this.canvas) ? this.canvas.getContext("2d") : undefined;
    }

    // initialize the canvas.
    init() {
        return new Promise((resolve, reject) => {

            // Check if the canvas exists.
            if (!this.canvas) {
                reject("[Canvas] Canvas cannot be found.");
            } else {

                // Initialize the context.
                this.context = this.context || this.canvas.getContext("2d");
                this.print('CanvasRenderingContext2D initialized.');

                // Initialize the media query events.
                // From: https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
                this.scale = window.devicePixelRatio; // Going to be overwritten.
                const _mq = {
                    dpi: `(resolution: ${window.devicePixelRatio}dppx)`,
                    minWidth500: '(min-width: 500px)',
                    minWidth720: '(min-width: 720px)',
                    minWidth900: '(min-width: 900px)',
                }

                // Prepare references for event listener closure.
                const _canvas = this;

                // Add media query for retina display change.
                window.matchMedia(_mq.dpi).addEventListener("change", (e) => {
                    _canvas.updatePixelRatio();
                });

                // Add media query for min-width change.
                window.addEventListener('resize', (e) => {
                    _canvas.resize();
                });

                // Show the canvas dimensions.
                this.updatePixelRatio();
                this.resize();
            }

            // If everything is initialized, resolve.
            resolve(this);
        });
    }

    // Update the pixel ratio.
    updatePixelRatio() {
        // Dimensions of the canvas should be multiplied by the device pixel ratio.
        this.scale = window.devicePixelRatio;
        this.resize();
    }

    // Resize the canvas.
    resize() {

        // Get the screen width and screen height if it wasn't passed in.
        let sWidth = document.documentElement.clientWidth;
        let sHeight = document.documentElement.clientHeight;

        // Setup the width and height.
        let width = sWidth * Styles.CANVAS.SCALE.WIDTH;
        let height = sHeight * Styles.CANVAS.SCALE.HEIGHT;

        // Apply styles.
        this.canvas.style.width = `${width}px`;
        this.canvas.width = width * this.scale;
        this.canvas.style.height = `${height}px`;
        this.canvas.height = height * this.scale;

        // Normalize canvas to use CSS pixels.
        this.context.scale(this.scale, this.scale);

    }

    // Clear the canvas.
    clear() {

        // Clear the canvas.
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // If a background has been assigned, color it.
        if (this.background && this.background != 'transparent') {
            this.context.save();
            this.context.fillStyle = this.background;
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.restore();
        }
    }

    // Draw something to the screen.
    draw(paintCallback, transform, style) {
        this.context.save();

        if (transform) {
            transform.applyTransformation(this.context);
        }

        if (style) {
            style.applyStyle(this.context);
        }
        paintCallback(this.context);

        this.context.restore();
    }

}
