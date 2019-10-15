"use strict";
/*
    Handler.js - Ian Effendi
    Contains code for handling the audio chain and context.
*/

// Import helper.
import {
    Flags,
    createDebugLogger
} from './../config.js';

// Handles an audio context and builds the web audio API chain.
export class AudioContextHandler {

    // Construct an audio context handler.
    constructor(options = {}) {
        this.print = createDebugLogger('AudioContextHandler', Flags.DEBUG.HANDLER);
        this.mediaSource = options.mediaSource;
        this.mediaSourceNode = undefined;
        this.audioContext = undefined;
        this.audioContextSettings = options;
        this.autoplayCheck = true;
    }

    // Initialize the audio context.
    init() {
        return new Promise((resolve, reject) => {

            // Do settings for the audio context exist?
            if (!this.audioContextSettings) {
                reject("The audio context settings must be provided.");
            } else {
                this.print("Creating the audio context.");
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                this.audioContext = new AudioContext({
                    latencyHint: this.audioContextSettings.latencyHint || 'interactive',
                    sampleRate: this.audioContextSettings.sampleRate || 48000,
                });
            }

            // Is there a media source element?
            if (!this.mediaSource) {
                reject("Cannot create audio context without source.");
            } else if (!this.audioContext) {
                reject("Cannot create media source node without audio context.");
            } else {
                this.print("Creating source node.");
                this.mediaSourceNode = this.audioContext.createMediaElementSource(this.mediaSource);
            }

            // Initialize nodes.
            this.initializeNodes();

            // Connect nodes.
            this.print("Connecting audio nodes.");
            this.mediaSourceNode.connect(this.gainNode);
            this.gainNode.connect(this.audioContext.destination);

            // If nothing has gone wrong, we can resolve this here.
            resolve(this);
        });
    }


    // Initialize nodes.
    initializeNodes() {
        this.print("Creating audio nodes.");
        this.gainNode = this.audioContext.createGain();
    }

    // Add event listener to the media source.
    addEventListener(event, callback) {
        this.mediaSource.addEventListener(event, callback);
    }

    // Set volume of the gain node.
    setVolume(percentage) {
        this.gainNode.gain.setValueAtTime(percentage, this.audioContext.currentTime);
    }

    // Attempt to play the element.
    play() {
        if (this.mediaSource.paused) {
            // Process play promise for autoplay policy in Chrome.
            let promise = this.mediaSource.play();
            if (promise) {
                promise.then((result) => {
                    this.audioContext.resume();
                    if (this.autoplayCheck) {
                        // Autoplay started.
                        this.print("Autoplay started successfully.");
                        this.autoplayCheck = false;
                    } else {
                        this.print("Played track successfully.");
                    }
                }).catch((err) => {
                    if (this.autoplayCheck) {
                        // Autoplay was prevented.
                        this.autoplayCheck = false;
                        this.print(`Autoplay was prevented. ${err}.`);
                    } else {
                        console.error(`[Handler] Could not play element. ${err}.`);
                    }
                    this.pause();
                });
            }
        }
    }

    // Attempt to pause the element.
    pause() {
        if (!this.mediaSource.paused) {
            this.mediaSource.pause();
            this.audioContext.suspend();
        }
    }




}
