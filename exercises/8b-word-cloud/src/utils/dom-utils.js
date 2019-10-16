"use strict"
/*
    DOMUtils.js - Ian Effendi
    Helper functions for the HTML5 document.
*/

// Import statements.
import {
    Flags
} from './../app/config.js';
import {
    debugConsole
} from './debug.js';

// This module's debug console.
const debug = debugConsole(Flags.DEBUG.UTILS.DOM_UTILS);

// Get all elements that match a given selector.
export function getElements(selector) {
    let elements = null;
    try {
        elements = document.querySelectorAll(selector);
    } catch (e) {
        debug.error(`DOMUtils.js [Debug]: ${e}.`);
    }
    return elements;
}

// Return a single element given an input selector.
export function getElement(selector) {
    let element = null;
    try {
        element = document.querySelector(selector);
    } catch (e) {
        debug.error(`DOMUtils.js [Debug]: ${e}.`);
    }
    return element;
}

// Check if an input value is an element.
export function isElement(param) {
    // Accepted answer from:
    // https://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
    return param instanceof Element || param instanceof HTMLDocument;
}
