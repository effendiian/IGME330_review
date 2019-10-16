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
        CANVAS: false,
        HANDLER: false,
        SAMPLER: false,
    }
};

// Analyser settings.
export const Settings = {
    DEFAULT: {
        LATENCY_HINT: 'interactive',
        NUM_SAMPLES: 48000,
        FFT_SIZE: 2048,
        MIN_DB: -100,
        MAX_DB: -25,
        SMOOTHING: 0.5
    }
}

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

// Printer used for debugging.
export function Printer(flag) {
    let debug = {};
    for (let key in console) {
        debug[key] = (typeof console[key] == 'function' && flag === true) ? (console[key].bind(window.console)) : () => {};
    }
    return debug;
}
