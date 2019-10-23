"use strict";
/*
    Entry.js - Ian Effendi
    Represents a collection of words that can then be replaced.
*/

// Get Replacer functionality.
import {
    default as Replacer
} from './replacer.js';

// Entry will 
export default class Entry {

    constructor(text) {
        this.rawText = text;
        this.text = text;
        this.words = undefined;
    }

    // Clear the entry metadata.
    clear() {
        this.text = "";
        this.words = [];
    }

    // Check if the current text value is null.
    isNull() {
        return (this.text == null || this.text.length == null || this.text.length === 0);
    }

    // Update the entry with a new block of text.
    update(text) {
        this.rawText = text;
        this.text = text;
        this.refresh();
    }

    // Refresh will generate entry again from input words.
    refresh() {
        // If the text is null, empty, or of zero length, clear the entry.
        if (this.isNull()) {
            this.clear();
            return;
        }

        // If not null, perform replacement.

        // Convert to RiString.
        this.text = Replacer.getRiString(this.text);

        // Break up into words.
        this.words = this.text.words();

        // For each word, process it.
        // Replacer.getRandomWordIfNounAdjectiveOrVerb will only replace a word
        // if it's of a noun, adjective, or verb part of speech type.
        // It will find a random word of the same type of speech as the input word,
        // if it matches the high-level noun, adjective, or verb requirements.
        // eg. plural nouns will return a random plural noun.
        for (let i = 0; i < this.words.length; i++) {
            // Get the word so we don't need to keep querying the array.
            let candidate = this.words[i];

            // Skip punctuation.
            if (RiTa.isPunctuation(candidate)) {
                continue;
            }

            // Get the word, trimming it and making it all lowercase.
            candidate = candidate.trim();

            // Replace the word if it's a noun, adjective, or verb.
            this.words[i] = Replacer.getRandomWordIfNounAdjectiveOrVerb(candidate);
        }
    }

    // Get the display string.
    getDisplay() {
        // Prepare the array.
        let display = [];

        // Check if the words array is filled.
        if (this.words && this.words.length >= 1) {
            // Fill the array.
            this.words.forEach((word) => {
                // Get the candidate word.
                let space = " ";
                let candidate = word;
                // console.log(word);

                // If this is a punctuation mark, do not add the space.
                if (RiTa.isPunctuation(candidate)) {
                    space = "";
                }

                // Check if the word should be capitalized.
                let pos = Replacer.getRiString(word).pos();
                if (Replacer.isCapitalized(word) || pos.includes("nnp") || pos.includes("nnps")) {
                    candidate = Replacer.getRiString(Replacer.toSentenceCase(word)).text();
                }

                // Add the space reference.
                candidate = `${space}${candidate}`;

                // Push the word onto the array.
                display.push(candidate);
            });
        }

        // Join the array and return the result.
        return display.join("");
    }

};
