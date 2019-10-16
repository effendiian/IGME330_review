"use strict";
/*
    Main.js - Ian Effendi
    Word cloud application entry point.
*/

/*
    Requirements:
    - Words should animate in size 'grow'.
    - Words should appear sequentially as the list is being processed.
        - Apply intentional delay to the update loop.
        - Async process words in background, but schedule appearences.
    - Words should be their own objects.
    - Canvas should display words. They should not overlap.
    - Limit number of words that are drawn to the cloud.
    - More frequent words will appear larger than less frequent ones.
    - Specify a minimum font size for the words you draw.
    - Animate words (side to side?) (looping?).
    - Enable drag and dropover features for canvas.
*/
