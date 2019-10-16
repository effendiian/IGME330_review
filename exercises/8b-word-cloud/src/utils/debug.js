"use strict";
/*
    Debug.js - Ian Effendi
    Wrapper for the debug console.
*/

// Printer used for debugging.
export function debugConsole(flag) {
    let debug = {};
    for (let key in console) {
        debug[key] = (typeof console[key] === 'function' && flag === true) ? (console[key].bind(window.console)) : () => {};
    }
    return debug;
}
