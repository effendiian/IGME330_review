"use strict";
/* 
    Animate.js - Ian Effendi
    Contains helper animation class.
*/

import { interpolate } from './math.js';

// Contains an animation mapping one value to another over a set period of time (in seconds).
export class Animation {

    // Construct the animation map.
    constructor(startTime, startValue, endTime, endValue) {
        
        this.start = startTime;
        this.end = endTime;
        this.startValue = startValue;
        this.endValue = endValue;
        
    }

    // Evaluate the animation at the specified time (in seconds)
    evaluate(timeInSeconds) {        
        
        // If between the animation coverage, lerp.
        if(timeInSeconds > this.start && timeInSeconds < this.end) {
            let t = (timeInSeconds - this.start) / (this.end - this.start);
            return interpolate(this.startValue, this.endValue, t);
        }
        
        // If not within bounds, return start or end value.
        return (timeInSeconds <= this.start) ? this.startValue : this.endValue;  
        
    }

}
