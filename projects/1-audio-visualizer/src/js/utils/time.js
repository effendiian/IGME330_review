"use strict";
/*
    Time.js - Ian Effendi
    Contains time conversion utility functions.
*/

// Import the floor function.
import { floor } from 'math.js';

// Conversion of milliseconds to seconds.
export function ms2sec(milliseconds){
    return milliseconds / 1000;
}

// Conversion of milliseconds to minutes.
export function ms2min(milliseconds){
    return sec2min(ms2sec(milliseconds));
}

// Conversion of milliseconds to hours.
export function ms2hr(milliseconds){
    return sec2hr(ms2sec(milliseconds));
}

// Conversion of seconds to minutes.
export function sec2min(seconds){
    return seconds / 60;
}

// Conversion of seconds to hours.
export function sec2hr(seconds) {
    return seconds / 3600;
}

// Format milliseconds into '00:00'.
export function formatTimeByMilliseconds(milliseconds){
    if(isNaN(milliseconds)){
        return '00:00';
    }
    
    return formatTime(ms2sec(milliseconds));       
}

// Format seconds into '00:00'.
export function formatTime(seconds, long = false){
    if(isNaN(seconds)){
        return '00:00';
    }
    
    // Do conversions and track remainders.
    let hr = floor(sec2hr(seconds));
    let min = floor(sec2min(seconds - (hr * 3600)));
    let sec = floor(seconds - (hr * 3600) - (min * 60));    
    
    // Do actual formatting.
    if(min < 10){
        min = "0" + min;
    }
    
    if(sec < 10){
        sec = "0" + sec;
    }
    
    if(hr < 10) {
        hr = "0" + hr;
    }
    
    if(long === true){
        return `${hr}:${min}:${sec}`;
    } else {
        return `${min}:${sec}`;
    }
}
