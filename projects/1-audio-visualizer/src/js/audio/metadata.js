"use strict";
/*
    Metadata.js - Ian Effendi
    Contains useful metadata information for the audio tracks.
*/

// Ready state values. 
// Taken from Mozilla docs: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState
export const READY_STATE_FLAG = {
    HAVE_NOTHING: 0,
    HAVE_METADATA: 1,
    HAVE_CURRENT_DATA: 2,
    HAVE_FUTURE_DATA: 3,
    HAVE_ENOUGH_DATA: 4
};

// Source file media prefixes.
export const MEDIA_PREFIX = {
    'AUDIO': "src/audio/",
    'IMAGE': "src/img/",
    'SCRIPT': "src/js/"
};

export function getElement(selector) {
    return document.querySelector(selector);
}