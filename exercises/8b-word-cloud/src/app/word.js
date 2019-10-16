"use strict";
/*
    Word.js - Ian Effendi
    A word entry representation.
*/

// Import statements.
import * as nlp from './../utils/nlp.js';

export class Word {
    
    constructor(content){
        this.display = content;
        this.word = nlp.removeAllWhitespace(nlp.removeAllPunctuation(content)); 
    }
    
}