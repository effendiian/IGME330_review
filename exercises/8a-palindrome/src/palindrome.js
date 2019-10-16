"use strict";
/*
    Palindrome.js - Ian Effendi
    A palindrome checker.
*/

// A palindrome checker.
export class Palindrome {

    // Construct with input (or without).
    constructor(input) {
        this.isEmpty = true;
        this.isPalindrome = false;
        this.content = input;
        this.update();
    }

    // Set input word.
    setInput(word) {
        this.content = word;
        this.update();
    }

    // Check if palindrome.
    update() {

        // If it fails the check, then it's not a palindrome.
        this.isPalindrome = false;
        this.isEmpty = true;

        // If candidate is a word, we can continue.
        if (this.content) {

            // Clean the word.        
            let candidate = this.content.trim().replace(/\s+/g, '').toLowerCase();
            candidate = candidate.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"]+/g, '');

            // Check if length is now zero.
            if (candidate.length === 0) {
                this.isPalindrome = false;
                return;
            }

            // Reverse it for comparison.
            let reverseCandidate = candidate.split("").reverse().join("");


            // console.log(`${this.content} | ${candidate} | ${reverseCandidate}`);

            // Store comparison as palindrome flag.
            this.isPalindrome = (candidate === reverseCandidate);
            this.isEmpty = false;
        }
    }

}
