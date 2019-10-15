"use strict";
/*
    Config.js - Ian Effendi
    Module containing useful settings that should be changed easily.
*/

// Universal application flags.
export const Flags = {
    DEBUG: { // Show debug statements if this flag is set to true.
        MAIN: false,
        APP: false,
        UI: false,
        CANVAS: true,
        HANDLER: true,
    }
};

// Style flags for the canvas.
export const Styles = {
    CANVAS: {
        BACKGROUND: '#89023E',
        SHADOW: '#001514',
        CONTENT: '#FFBFFE',
        HIGHLIGHT: '#FFD9DA',
        SCALE: {
            WIDTH: 0.9,
            HEIGHT: 0.65,
        }
    },
    DEFAULT: {
        LINE_WIDTH: 1,
        LINE_CAP: 'butt',
        LINE_JOIN: 'bevel',
        MITER_LIMIT: 10,
        FILL_STYLE: 'black',
        STROKE_STYLE: 'black'
    }
};

// Return a debug logger, given input of the necessary flag and the label.
export function createDebugLogger(label, flag) {
    return (msg) => {
        if (flag) {
            console.log(`${label} [Debug]: ${msg}`);
        }
    };
}
