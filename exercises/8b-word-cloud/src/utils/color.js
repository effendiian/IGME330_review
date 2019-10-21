"use strict";
/*
    Color.js - Ian Effendi
    Helper functions for color math.
*/

// Import useful utilities from Math.js.
import {
    clamp,
    getRandomByte
} from './math.js';

// Color class.
export class Color {

    // Construct the color class using input data.
    constructor(r = 0, g = 0, b = 0, a = 1) {
        this.r = r || 0;
        this.g = g || 0;
        this.b = b || 0;
        this.a = a || 1;
    }

    // Set the specified color value using float between [0, 1].
    setRed(percent) {
        this.r = 255 * clamp(percent, 0, 1);
    }

    // Set the specified color value using float between [0, 1].
    setGreen(percent) {
        this.g = 255 * clamp(percent, 0, 1);
    }

    // Set the specified color value using float between [0, 1].
    setBlue(percent) {
        this.b = 255 * clamp(percent, 0, 1);
    }

    // Set the opacity using a percentage.
    setOpacity(percent) {
        this.a = percent;
    }

    // Calculate the luminance of a color. See: https://en.wikipedia.org/wiki/Relative_luminance
    luma() {
        return (0.2126 * this.r) +
            (0.7152 * this.g) +
            (0.0722 * this.b);
    }

    // Calculate the chrominance of a color. See: https://en.wikipedia.org/wiki/Chrominance
    chroma() {
        let cachedLuma = this.luma(); // cache calculated luma value.
        return {
            // u-chroma is Blue - Luma. (U = B' - Y').
            u: this.b - cachedLuma,

            // v-chroma is Red - Luma. (V = R' - Y').
            v: this.r - cachedLuma
        };
    }

    // Create text string representing the color for HTML5/CSS3.
    source() {
        return `rgba(${this.r},${this.g},${this.b},${this.a})`;
    }

}


// Get a random color via bytes.
export function getRandomColor() {
    return new Color(
        clamp(getRandomByte(), 55, 220), // r
        clamp(getRandomByte(), 55, 220), // g
        clamp(getRandomByte(), 55, 220), // b
        0.7 + Math.random()); // a        
}
