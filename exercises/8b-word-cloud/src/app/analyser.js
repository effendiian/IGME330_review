"use strict";
/*
    Analyser.js - Ian Effendi
    Text entry analyser functions.
*/

import {
    Settings
} from './config.js';

// Evaluate and print metadata out about the array.
export function printMetadata(array) {
    if (array) {
        console.log(`There are ${array.length} element(s) in the array.`);
    }
}

// Parse text entry and return array.
export function parseText(text) {
    // 1- create an array of words from the loaded string
    if (!(typeof text === 'string' || text instanceof String)) {
        // Return empty array if not valid input.
        return [];
    } else {
        // Remove the return lines.
        let candidate = text.trim().toLowerCase();

        // Remove excess return lines.
        candidate = removeReturnLines(candidate);

        // Remove the commas.
        candidate = removePunctuation(candidate);

        // Split the string into an array.split by whitespace.
        return candidate.split(' ');
    }
}

// Replace return lines with a blank space.
export function removeReturnLines(text) {
    return text.replace(/(\r\n|\n|\r)/gm, " ");
}

// Remove commas and periods and replace with a blank space.
export function removePunctuation(text) {
    return text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"]/g, " ");
}

// Conditional functions for filtering. //

// Check if word is only whitespace.
export function isWhitespace(word) {
    return (word === "" || word === " " || word.length === 0);
}

// Check if word is a stopword.
export function isStopword(word) {
    return Settings.STOP_WORDS.includes(word);
}

// Check if word is entirely numeric.
export function isNumeric(word) {
    return !isNaN(parseFloat(word)) && isFinite(word);
}

// Check if word contains numerics.
export function containsNumerics(word) {
    let matches = word.match(/\d+/g);
    return (matches != null);
}

// Check if word is a single character long.
export function isSingleCharacter(word) {
    return (word.length === 1);
}

// Count up the frequency of each word and store the values in a dictionary(array)
export function calculateWordFrequency(array) {
    let result = {};
    for (let i = array.length; i >= 0; i--) {
        let count = result[`${array[i]}`] || 0;
        count++;
        result[`${array[i]}`] = count;
    }
    return result;
}

// Get element and add it to the appropriate location.
export function createWordCountElement(word, value) {
    let listItem = document.createElement('li');
    listItem.classList.add('list-item');
    listItem.innerHTML = `${word}: ${value}`;
    return listItem;
}

// Create word elements for each word and add it to the list.
export function displayWordCount(dictionary) {
    let list = document.querySelector('#word-frequency');

    // Clear the list.
    while (list.childNodes.length > 0) {
        list.removeChild(list.childNodes[list.childNodes.length - 1]);
    }

    // Prepare elements for each word.
    Object.keys(dictionary).forEach((key) => {
        list.appendChild(createWordCountElement(key, dictionary[key]));
    });

    return list;
}
