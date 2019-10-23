"use strict";
/*
    Main.js - Ian Effendi
    Entry point for this application.
*/

import * as Settings from './config.js';
import {
    default as Replacer
} from './replacer.js';
import {
    default as Entry
} from './entry.js';

/* MODULE SCOPE MEMBERS */
const el = {
    textEntry: undefined,
    textArea: undefined,
    textDisplay: undefined,
    posDisplay: undefined,
};

/* PREPARATION FUNCTIONS */

// Prepare a callback function.
function prepareCallback(event, callback) {
    return {
        event: event,
        callback: callback
    }
}

// Prepare element.
function prepareElement(selector, callbacks = null) {
    let element = document.querySelector(selector);
    if (callbacks != null) {
        if (Array.isArray(callbacks)) {
            callbacks.forEach((item) => {
                element.addEventListener(item.event, item.callback);
            });
        } else {
            if (callbacks.event && typeof callbacks.event === "string" && callbacks.callback && typeof callbacks.callback === "function") {
                element.addEventListener(callbacks.event, callbacks.callback);
            }
        }
    }
    return element;
}

// Prepare output.
function preparePOSOutput(sentence) {
    if (!sentence || sentence.length === 0) {
        return "";
    }

    let pos = Replacer.getRiString(sentence).pos();
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

/* CALLBACK FUNCTIONS */

// Event called on input.
function processInput(e) {
    // console.log(e.target.value);
}

// Update the display.
function updateTextDisplay(e) {
    let text = e.target.value;
    el.textDisplay.innerHTML = e.target.value;
    el.posDisplay.innerHTML = preparePOSOutput(text);
}

// Split text into separate sentences and update the display.
function updateEntry(e) {
    // Get the input text.
    let text = e.target.value;
    let entry = el.textEntry || new Entry('');
    entry.update(text);
    entry.refresh();
    el.textDisplay.innerHTML = entry.getDisplay();
}

/* INITIALIZATION */

// On initialization.
function init() {

    // Test functions.
    // console.dir(Replacer.getRandomWordIfNounAdjectiveOrVerb("test"));
    // console.dir(Replacer.getRandomWordIfNounAdjectiveOrVerb("dirty"));
    // console.dir(Replacer.getRandomWordIfNounAdjectiveOrVerb("chase"));
    // console.dir(Replacer.getRandomWordIfNounAdjectiveOrVerb("find"));

    // let entry = new Entry("This is a test.");
    //  entry.refresh();
    // console.dir(entry);
    // console.log(entry.getDisplay());

    // Prepare the callbacks.
    let onTextInput = prepareCallback('input', processInput);
    let onTextDisplay = prepareCallback('input', updateTextDisplay);
    let onEntry = prepareCallback('input', updateEntry);

    // Prepare the elements.
    el.textDisplay = prepareElement('#text-output');
    el.posDisplay = prepareElement('#pos-output');
    el.textArea = prepareElement('textarea', [onTextInput,
                                               onTextDisplay,
                                               onEntry]);

    // Call input event.
    el.textArea.dispatchEvent(new Event("input"));
    // el.textArea.dispatchEvent(new Event("change"));
}


// Initialize the main application flow.
window.addEventListener('load', init);
