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
import {
    Color,
    getRandomColor
} from './../utils/color.js';

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

    // Prepare word cloud.
    prepareWordCloud(dictionary) {

        // Create array from the dictionary.
        let data = [];
        Object.keys(dictionary).forEach((key) => {
            data.push({
                word: key,
                value: dictionary[key]
            });
        });

        // Sort the data array.
        data.sort((e1, e2) => {
            if (e1.value < e2.value) {
                return 1;
            }
            if (e1.value > e2.value) {
                return -1;
            }
            return 0;
        });

        // Truncate the array.
        data.length = Settings.DEFAULT.CANVAS.WORD_LIMIT;

        // Get the average value given the current data list.
        let average = 0;
        data.forEach((item) => {
            average += item.value;
        });
        average /= data.length;

        // Draw the words in the array.
        this.wordCloud = {
            average: average,
            data: data
        };
    }

    clear(color) {
        this.context.save();

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (color) {
            this.context.fillStyle = color;
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        this.context.restore();
    }

    drawWordCloud() {
        this.context.save();

        // Set text drawing properties.
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        let fontFamily = Settings.DEFAULT.CANVAS.FONT;

        if (this.wordCloud) {
            // For each word, process it differently.            
            let size = {
                average: this.wordCloud.average,
                min: Settings.DEFAULT.CANVAS.FONT_SIZE.MIN,
                max: Settings.DEFAULT.CANVAS.FONT_SIZE.MAX
            }

            let bounds = {
                x: {
                    min: 0 + size.max + (size.average * 1.5),
                    max: this.canvas.width - size.max - (size.average * 1.5),
                },
                y: {
                    min: 0 + size.max + (size.average * 1.5),
                    max: this.canvas.height - size.max - (size.average * 1.5),
                }
            }

            for (let i = 0; i < this.wordCloud.data.length; i++) {
                let entry = this.wordCloud.data[i];
                let entrySize = size.min + ((entry.value / size.average) * (size.max - size.min));
                let entryPosition = {
                    x: +(bounds.x.min + ((bounds.x.max - bounds.x.min) * Math.random())),
                    y: +(bounds.y.min + ((bounds.y.max - bounds.y.min) * Math.random()))
                };
                let entryColor = getRandomColor();
                // console.log(`${entry.word} at (${entryPosition.x}, ${entryPosition.y})`);
                this.context.fillStyle = entryColor.source();
                this.context.font = `${entrySize}px ${fontFamily}`;
                this.context.fillText(entry.word, entryPosition.x, entryPosition.y);
            }
        } else {
            // Set up the font for the error.
            // Set the font.
            this.context.font = `${Settings.DEFAULT.CANVAS.FONT_SIZE.ERROR}px ${fontFamily}`;
            this.context.fillStyle = Settings.DEFAULT.CANVAS.COLOR.ERROR;
            this.context.fillText("Drop corpus here to process a word cloud!", this.canvas.width / 2, this.canvas.height / 2);
        }
        this.context.restore();
    }

}
