"use strict";
/*
  Main.js -  Ian Effendi  
  Entry point for the audio visualizer application.
*/

// Import the flags.
import {
    Flags,
    Printer
} from './config.js';

// Import the application class.
import {
    Application
} from './app.js';

// Get element and check to see if it exists.
function getElement(selector) {
    let elem = document.querySelector(selector);
    if (!selector) {
        throw new Error('This selector does not exist.');
    } else if (!elem) {
        throw new Error('No element was found with this selector.');
    }
    return elem;
}

// log debug information to the console.
const printer = new Printer('Main', Flags.DEBUG.MAIN, window);

// Initialize the application.
function init() {

    // Construct the application.
    let app = new Application({
        debug: Flags.DEBUG_MODE,
        canvas: getElement('canvas#mainCanvas'),
        canvasSettings: {
            background: Flags.CANVAS_BACKGROUND,
        },
        audioContextSettings: {
            mediaSource: getElement('audio.player.element'),
            latencyHint: 'interactive',
            sampleRate: 48000,
        },
        controls: {
            toggleButton: getElement('button.toggle.button'),
            toggleIcon: getElement('.toggle.button.icon'),
            volumeButton: getElement('.volume.button'),
            volumeIcon: getElement('.volume.button.icon'),
            volume: getElement('.volume.progress-bar'),
            progress: getElement('.progress.progress-bar'),
            trackSelector: getElement('#trackSelect'),
            delay: getElement('#delayCB'),
            delayRange: getElement('#delayRG'),
            delayLabel: getElement('#delayAmount'),
            trackInformation: {
                title: getElement('.player.track-title'),
                artist: getElement('.player.track-artist'),
                album: getElement('.player.track-album'),
                time: getElement('.player.track-time'),
                duration: getElement('.player.track-duration')
            },
            imageProcessing: {
                noise: getElement('#noiseCB'),
                brighten: getElement('#brightenCB'),
                invert: getElement('#invertCB'),
                emboss: getElement('#embossCB'),
                grayscale: getElement('#grayscaleCB'),
            }
        }
    });

    // Initialize the application and then run it.
    app.init().then((result) => {
        // Promise's resolve().
        printer.log("Application initialized.");
        app.run();
    }).catch((err) => {
        // Run when an error is reached.
        console.error(`The application failed to be initialized. (${err})`);
        return;
    });

};

// Assign the init function to run after window has been loaded.
window.onload = init;
