"use strict";
/*
    Replacer.js - Ian Effendi
    Functions that help with the utilization of RiTa functions.
*/

// Capital letters.
const UPPERCASE = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
const LOWERCASE = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";

// Replacer uses the revealing module pattern to only share specific functions / members.
export default (() => {

    /* VERIFICATION METHODS */

    // Check if word is a raw string.
    function isNativeString(word) {
        return (word != null) && (typeof word === "string");
    }

    // Check if word is already an RiString. (is it a duck?)
    function isRiString(word) {
        return (word != null) &&
            (typeof word === "object") &&
            (word._text) &&
            (word.words);
    }

    // Check if word is native or RiString.
    function isString(word) {
        return isNativeString(word) || isRiString(word);
    }

    // Check if it matches a part of speech.
    function isPOS(word, pos) {
        return (getPOS(word) === pos);
    }

    // Check if word is in singularized form.
    function isSingular(word) {
        let candidate = RiTa.singularize(word);
        return (candidate === word);
    }

    // Check if word is in pluralized form.
    function isPlural(word) {
        // Note: We must singularize our word before pluralizing it,
        // because already pluralized forms will be stacked.
        // eg. dogs --> dogses, using RiTa's default pluralization rules.
        // To avoid this, we do dogs --> dog --> dogs and compare the result.
        let candidate = RiTa.pluralize(RiTa.singularize(word));
        return (candidate === word);
    }

    /* ANALYZATION METHODS */

    // Convert native string to RiString (unless it already is one).
    function getRiString(word) {
        if (isString(word)) {
            return (isRiString(word)) ? word : new RiString(word);
        }
        console.error(`getRiString(): Input '${word}' is not of type string or RiString.`);
    }

    // Return the part of speech for a single word.
    function getPOS(word) {
        return getRiString(word).pos()[0];
    }

    // Return the noun type. Returns null if not a noun.
    function getNounType(word) {
        let rs = getRiString(word.toLowerCase());
        // console.log("Noun", rs.text(), RiTa.isNoun(rs.text()));
        return (RiTa.isNoun(rs.text())) ? getPOS(word) : null;
    }

    // Return the adjective type. Returns null if not an adjective.
    function getAdjectiveType(word) {
        let rs = getRiString(word.toLowerCase());
        // console.log("Adjective", rs.text(), RiTa.isNoun(rs.text()));
        return (RiTa.isAdjective(rs.text())) ? getPOS(word) : null;
    }

    // Return the verb type. Returns null if not a verb.
    function getVerbType(word) {
        let rs = getRiString(word.toLowerCase());
        // console.log("Verb", rs.text(), RiTa.isNoun(rs.text()));
        return (RiTa.isVerb(rs.text())) ? getPOS(word) : null;
    }

    // Get random word similar to input word.
    function getRandomWord(seed, pos = undefined) {
        // Return random word based on the input type.
        let rs = getRiString(seed);
        return (pos == null) ? RiTa.randomWord() : RiTa.randomWord(pos);
    }

    function getRandomWordIfNounAdjectiveOrVerb(seed) {
        let rs = getRiString(seed);
        let capitalize = isCapitalized(seed);
        let pos = getNounType(rs) || getAdjectiveType(rs) || getVerbType(rs);
        // console.log("Seed Word:", rs.text(), pos);
        let result = (pos == null) ? seed : getRandomWord(rs, pos);
        if (capitalize === true) {
            return getRiString(toSentenceCase(result)).text();
        } else {
            return result;
        }
    }

    // Get random word if it matches any of the input parts of speech.
    function getRandomWordIf(seed, posIf = []) {
        let word = seed;

        // Return the seed word if there is no replacement occuring.
        if (seed == null || posIf == null || posIf.length === 0) {
            return word;
        }

        // If the posIf is a string, convert to array.
        if (typeof posIf === "string") {
            posIf = [posIf];
        }

        // Get the POS for the seed.
        let rs = getRiString(seed);
        let pos = getPOS(rs);
        if (posIf.includes(pos)) {
            word = getRandomWord(seed, pos);
        }

        // Return random word if it's been assigned; or return the input word.
        return word;
    }

    // Make sentence case.
    function toSentenceCase(word) {
        if (word == null || word.length === 0 || RiTa.isPunctuation(word)) {
            return word;
        }

        // Get the candidate.
        let candidate = getRiString(word.toLowerCase());

        // Get the first character.
        let firstCharacter = candidate.charAt(0).toUpperCase();

        // Replace the character in the first location.
        candidate.replaceChar(0, firstCharacter);

        // Return the word.
        return candidate;
    }

    // Check if the word is in sentence case already.
    function isCapitalized(word) {
        if (word != null && word.length >= 1) {
            // Convert.
            let candidate = getRiString(word);

            // Get the first character.
            let firstCharacter = candidate.charAt(0);

            // See if the first character is contained within the upper case letters.
            return UPPERCASE.split(",").includes(firstCharacter);
        }
        return false;
    }

    // Return the functions needed.
    return {
        getPOS,
        getRiString,
        getRandomWord,
        getRandomWordIf,
        getRandomWordIfNounAdjectiveOrVerb,
        toSentenceCase,
        isCapitalized
    };

})();
