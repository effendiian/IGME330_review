"use strict";
/*
    NLP.js - Ian Effendi
    Natural language processing functions for manipulation of the corpus.
*/

// Remove all white space.
export function removeAllWhitespace(str){
    return str.replace(/\s+/g, '');     
}

// Remove all punctuation from the input.
export function removeAllPunctuation(str){
    return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"]+/g,'');
}