"use strict";
/*
    Main.js - Ian Effendi
    Entry point for this application.
*/

import * as Settings from './../config.js';

// Application methods.
function prepareElements(inputSelector, outputSelector) {
    // Get the elements.
    let input = document.querySelector(inputSelector);
    let output = document.querySelector(outputSelector);

    // Return values.
    return new Promise((resolve, reject) => {
        if (!input) {
            reject('No input element provided.');
        }

        if (!output) {
            reject('No output element provided.');
        }
        resolve({
            input: input,
            output: output
        });
    });
}

// Prepare output.
function prepareOutput(rs, pos) {
    let s = "<ul class='pos-list'>";
    for (let item of pos) {
        if (RiTa.isPunctuation(item)) {
            continue;
        }
        let desc = Settings.POS[item] || "??";
        s += `<li><b>${item}</b> : ${desc}</li>`;
    }
    s += "</ul>";
    return s;
}

// Handle input.
function handleInput(text, output) {
    if (text.length == 0) {
        output.innerHTML = "";
        return;
    }

    // Handle POS output.
    let rs = RiString(text);
    let pos = rs.pos();
    output.innerHTML = prepareOutput(rs, pos);
}

// Initialize the main application flow.
function init() {
    let el = undefined;
    prepareElements('textarea', '#output').then((result) => {
        el = result;
        el.input.addEventListener('input', (e) => {
            handleInput(e.target.value, el.output);
        });
        el.input.dispatchEvent(new Event("input"));
    }).catch((err) => {
        console.error(err);
        return;
    });
};

window.addEventListener('load', init);
