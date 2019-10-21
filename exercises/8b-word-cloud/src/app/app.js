"use strict";
/*
  App.js - Ian Effendi
  Contains the code for running the application.
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
    getElement
} from './../utils/dom-utils.js';
import {
    CanvasHandler
} from './canvas.js';
import * as TextAnalyser from './analyser.js';

// Application class can be initialized and then run.
export class Application {

    // Takes no arguments.
    constructor() {
        this.debug = debugConsole(Flags.DEBUG.APP);

        // Prepare members.
        this.canvasHandler = undefined;
        this.controls = undefined;
    }

    // Initialize the application.
    init() {
        this.debug.log("Initializing application.");
        return new Promise((resolve, reject) => {

            // Initialize the canvas handler.
            this.canvasHandler = new CanvasHandler('canvas#wordCloud');
            this.canvasHandler.init().then((handler) => {
                this.debug.log("Initialized the CanvasHandler.");
                this.debug.dir(handler);
            }).catch((e) => {
                this.debug.error(e);
                reject('Could not initialize the CanvasHandler.');
            });

            // Prepare the controls.
            this.controls = {
                output: getElement('#corpus-preview'),
                wordLimit: getElement('#word-limit')
            };
            this.controls.wordLimit.innerHTML = Settings.DEFAULT.CANVAS.WORD_LIMIT;

            // Initialize dragging events.
            let _preview = this.controls.output;
            if (!_preview) {
                reject('Could not initialize dragover events.');
            }

            // Wrapper.
            let _canvasHandler = this.canvasHandler;
            let _app = this;
            // Process text functions.
            function processText(e) {

                // Get the text.
                let text = e.target.result;

                // Update the corpus preview.
                _preview.innerHTML = text;

                // Get the text as an array.
                let array = TextAnalyser.parseText(text);

                // Show metadata for the array.
                // TextAnalyser.printMetadata(array);

                // Filter out unnecessary data. //                
                array = array.filter((word) => {

                    // Convert, trim, and lowercase word.
                    let candidate = word.trim();

                    // 2 - loop through array:
                    // A - get rid of stop words
                    // B - get rid of numbers
                    // C - get rid of 1 character words
                    // D - count up frequency of each word and store values in a dictionary (i.e. Object)

                    // Remove whitespace.
                    if (TextAnalyser.isWhitespace(candidate)) {
                        // console.log(`[Whitespace] Removing word '${word}'.`);
                        return false;
                    }

                    // Remove stop words.
                    if (TextAnalyser.isStopword(candidate)) {
                        // console.log(`[Stopword] Removing word '${word}'.`);
                        return false;
                    }

                    // Remove numerics.
                    if (TextAnalyser.isNumeric(candidate)) {
                        // console.log(`[Numeric] Removing word '${word}'.`);
                        return false;
                    }

                    // Remove words with numerics in them.
                    if (TextAnalyser.containsNumerics(candidate)) {
                        // console.log(`[Contains Numerics] Removing word '${word}'.`);
                        return false;
                    }

                    // Remove single character word.
                    if (TextAnalyser.isSingleCharacter(candidate)) {
                        // console.log(`[Single character] Removing word '${word}'.`);
                        return false;
                    }

                    return true;
                });

                // Show metadata for the array.
                // TextAnalyser.printMetadata(array);

                // Count frequency of words and return dictionary. 
                let wordFrequencyDictionary = TextAnalyser.calculateWordFrequency(array);

                // Sort the keys alphabetically.
                let sortedFrequency = {};
                // Sort an object literal: https://stackoverflow.com/questions/5467129/sort-javascript-object-by-key
                Object.keys(wordFrequencyDictionary).sort().forEach((key) => {
                    sortedFrequency[key] = wordFrequencyDictionary[key];
                });

                let truncatedData = {};
                for (let word in sortedFrequency) {
                    if (sortedFrequency[word] > Settings.DEFAULT.CANVAS.FREQ_LIMIT) {
                        truncatedData[word] = sortedFrequency[word];
                    }
                }

                // Display the output keys.
                TextAnalyser.displayWordCount(truncatedData);

                // Prepare the word cloud.
                _canvasHandler.prepareWordCloud(truncatedData);
                _app.draw();
            }

            // Set up the drag events. //

            // Add the dragging class when over the canvas.
            this.canvasHandler.canvas.ondragenter = (e) => {
                e.stopPropagation();
                e.preventDefault();
                e.target.classList.add("dragging");
            };

            // Stop the default dragover behaviour when over the element.
            this.canvasHandler.canvas.ondragover = (e) => {
                e.stopPropagation();
                e.preventDefault();
            };

            // Load the text once it's been dropped atop the word cloud.
            this.canvasHandler.canvas.ondrop = (e) => {
                e.stopPropagation();
                e.preventDefault();
                e.target.classList.remove("dragging");
                let file = e.dataTransfer.files[0];
                if (file) {
                    let reader = new FileReader();
                    reader.addEventListener('load', processText);
                    reader.readAsText(file);
                }
            };

            // If initialized, return this.
            resolve(this);
        });
    }

    draw() {
        // Loop through by drawing the word cloud.
        this.canvasHandler.clear(Settings.DEFAULT.CANVAS.COLOR.BACKGROUND);
        this.canvasHandler.drawWordCloud();
    }

}
