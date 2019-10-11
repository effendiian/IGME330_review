"use strict";
/* 
    Test.js - Ian Effendi
    Contains functions for testing functionality from other modules.
*/

import { gcd } from './math.js';
import { Color } from './color.js';

// Assert takes an assertion callback, onError callback, and onSuccess callback.
function assert(options){
    
    // Information about the assertion.
    console.log(`Assertion checking ${options.label}. Actual output: ${options.input}. Expected output: ${options.expected}.`);    
    
    if(options.input === options.expected){
        console.log(options.success); 
    }
    else 
    {
        console.error(options.error);
    }
}

// Helper function to create an assertion.
function makeAssertion(input, expected, success, error){
    return () => {
        assert({
            input: input,
            expected: expected,
            success: success,
            error: error
        })
    };
}

// Test the imported functions from Math.js.
export function testMath() {
    
    // Check the GCD function.
    assert({
        label: 'Math.gcd()',
        input: gcd(20, 30, 15, 70, 40),
        expected: 5, 
        success: "The GCD function was successful.",
        error: "The GCD function was not successful."
    });
    
    console.log((new Color(2, 4, 6, 1)).source());
    
}

// Get element function.
export function getElement(selector) {
    return document.querySelector(selector);
}
    
// Test all imported functions.
export default function () {
    testMath();
}