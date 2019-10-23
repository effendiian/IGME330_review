"use strict";
/*
    Main.js - Ian Effendi
    Entry point for this application.
*/

import * as Settings from './../config.js';

// Application methods.
function prepareElements(inputSelector, textOutputSelector, posOutputSelector) {
    // Get the elements.
    let input = document.querySelector(inputSelector);
    let output = document.querySelector(textOutputSelector);
    let pos = document.querySelector(posOutputSelector);

    // Return values.
    return new Promise((resolve, reject) => {
        if (!input) {
            reject('No input element provided.');
        }

        if (!output) {
            reject('No output element for text provided.');
        }

        if (!pos) {
            reject('No output element for POS provided.');
        }

        resolve({
            input: input,
            textOutput: output,
            posOutput: pos
        });
    });
}

// Prepare output.
function preparePOSOutput(rs, pos) {
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

// Check if is proper noun.
function isProperNoun(pos) {
    return pos === "nnp" || pos === "nnps";
}

// Prepare text output.
function prepareTextOutput(rs, pos) {
    let array = rs.words();
    for (let i = 0; i < array.length; i++) {
        let word = array[i].trim();

        // If punctuation, ignore.
        if (RiTa.isPunctuation(word)) {
            continue;
        }

        // If proper noun, replace similar.
        if (isProperNoun(rs.posAt(i))) {

            // Get similar words.
            let similarWords = RiTa.similarBySoundAndLetter(word);
            let index = Math.floor(Math.random() * similarWords.length);

            // Get a random word if similar words doesn't exist.
            if (similarWords.length > 0) {
                word = similarWords[index];
            } else {
                word = RiTa.randomWord(rs.posAt(i));
            }

            word = (word.length > 1) ? (word[0].toUpperCase() + word.slice(1)) : word.toUpperCase();
            array[i] = word;
        }
    }

    let str = array[0];
    for (let i = 1; i < array.length; i++) {
        if (!RiTa.isPunctuation(array[i])) {
            str += " ";
        }
        str += array[i];
    }
    return str;
}

// Handle input.
function handleInput(text, textOutput, posOutput) {
    if (text.length == 0) {
        textOutput.innerHTML = "";
        posOutput.innerHTML = "";
        return;
    }

    // Handle output.
    let rs = RiString(text);
    let pos = rs.pos();
    textOutput.innerHTML = prepareTextOutput(rs, pos);
    posOutput.innerHTML = preparePOSOutput(rs, pos);
}

// Initialize the main application flow.
function init() {
    let el = undefined;
    prepareElements('textarea', '#text-output', '#pos-output').then((result) => {
        el = result;
        el.input.addEventListener('input', (e) => {
            handleInput(e.target.value, el.textOutput, el.posOutput);
        });
        el.input.dispatchEvent(new Event("input"));
    }).catch((err) => {
        console.error(err);
        return;
    });
};

window.addEventListener('load', init);
