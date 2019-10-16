"use strict";
/*
    Handler.js - Ian Effendi
    Contains code for handling the audio chain and context.
*/

// Import helper.
import {
    Flags,
    Settings,
    Printer
} from './../config.js';

// Import the sampler class.
import {
    AudioSampler
} from './sampler.js';

// Handles an audio context and builds the web audio API chain.
export class AudioContextHandler {

    // Construct an audio context handler.
    constructor(options = {}) {
        this.printer = new Printer(Flags.DEBUG.HANDLER);
        this.mediaSource = options.mediaSource;
        this.audioContextSettings = options;
        this.autoplayCheck = true;

        // Other members.
        this.audioContext = undefined;
        this.audioSampler = undefined;
        this.destination = undefined;
        this.mediaSourceNode = undefined;
        this.gainNode = undefined;
    }

    // Initialize the audio context.
    init() {
        return new Promise((resolve, reject) => {

            // Do settings for the audio context exist?
            if (!this.audioContextSettings) {
                reject("The audio context settings must be provided.");
            } else {
                this.printer.log("Creating the audio context.");
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                this.audioContext = new AudioContext({
                    latencyHint: this.audioContextSettings.latencyHint || Settings.DEFAULT.LATENCY_HINT,
                    sampleRate: this.audioContextSettings.sampleRate || Settings.DEFAULT.NUM_SAMPLES,
                });
                this.destination = this.audioContext.destination;
            }

            // Is there a media source element?
            if (!this.mediaSource) {
                reject("Cannot create audio context without source.");
            } else if (!this.audioContext) {
                reject("Cannot create media source node without audio context.");
            } else {
                this.printer.log("Creating source node.");
                this.mediaSourceNode = this.audioContext.createMediaElementSource(this.mediaSource);
            }

            // Setup the audio chain.
            this.setupAudioChain();

            // If nothing has gone wrong, we can resolve this here.
            resolve(this);
        });
    }

    // Initialize and connect nodes.
    setupAudioChain() {
        // Prepare nodes.
        this.printer.log("Creating audio nodes.");
        this.gainNode = this.audioContext.createGain();
        this.audioSampler = new AudioSampler(this.audioContext, this.audioContextSettings.analyserSettings);

        this.delay = false;
        this.delayValue = 0.5;
        this.delayNode = this.audioContext.createDelay(0.5);

        // Connect nodes.
        this.printer.log("Connecting audio nodes.");
        // Analyser chain.
        this.mediaSourceNode.connect(this.audioSampler.analyserNode);
        this.audioSampler.connect(this.gainNode);

        // Delay chain.
        this.gainNode.connect(this.audioContext.destination);
    }

    // Enable delay.
    enableDelay(flag) {
        this.delay = flag;
        if (this.delay === true) {
            this.mediaSourceNode.connect(this.delayNode);
            this.delayNode.connect(this.gainNode);
            this.setDelay(this.delayValue);
        } else {
            this.delayNode.delayTime.setValueAtTime(0, this.audioContext.currentTime);
            this.delayNode.disconnect(this.gainNode);
            this.mediaSourceNode.disconnect(this.delayNode);
        }
    }

    // Set the delay node value.
    setDelay(value) {
        this.delayValue = value;
        if (this.delay) {
            this.delayNode.delayTime.setValueAtTime(this.delayValue, this.audioContext.currentTime);
        }
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
                        this.printer.log("Autoplay started successfully.");
                        this.autoplayCheck = false;
                    } else {
                        this.printer.log("Played track successfully.");
                    }
                }).catch((err) => {
                    if (this.autoplayCheck) {
                        // Autoplay was prevented.
                        this.autoplayCheck = false;
                        this.printer.log(`Autoplay was prevented. ${err}.`);
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
