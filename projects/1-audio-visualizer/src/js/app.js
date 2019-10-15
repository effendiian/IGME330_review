"use strict";
/*
    App.js - Ian Effendi
    Application handles the event flow for the visualizer.
*/

import {
    Flags,
    Styles,
    createDebugLogger
} from './config.js';

import {
    Canvas
} from './canvas/canvas.js';

import {
    AudioContextHandler
} from './audio/handler.js';

import {
    UI
} from './ui.js';

import {
    CountdownTimer,
    DeltaTimer
} from './utils/time.js';

// Application class that can be constructed.
export class Application {

    // Constructor class that takes a canvas and audio source.
    constructor(options = {}) {
        this.print = createDebugLogger('App', Flags.DEBUG.APP);
        this.timer = new DeltaTimer();
        this.canvas = new Canvas(options.canvas, options.canvasSettings, this.debug) || undefined;
        this.handler = new AudioContextHandler(options.audioContextSettings);
        this.controls = new UI(this.handler, options.controls, this.debug) || undefined;
        this.initialized = false;
    }

    // Initialize the application.
    init() {

        // On success, call resolve(result).
        // On error, call reject(reason).

        return new Promise((resolve, reject) => {

            // If already initialized, we can resolve this promise immediately.
            if (this.initialized === true) {
                this.print("The application has already been initialized.");
                resolve(this);
            }

            // If not already initialized, we should execute the following promise chain.
            // Each init method returns a thennable promise.
            this.initCanvas().then(() => {
                return this.initAudio();
            }).then((result) => {
                return this.initControls();
            }).then((result) => {
                this.print("All members have been initialized.");
                this.initialized = true;
                resolve(this);
            }).catch((err) => {
                // Pass the error up the promise chain.
                reject(err);
            });

        });
    }

    // Initialize the canvas.
    initCanvas() {
        return new Promise((resolve, reject) => {
            if (!this.canvas) {
                reject("The canvas element has not been loaded.");
            } else {
                this.canvas.init().then((result) => {
                    this.print("The canvas element has been initialized.");
                    resolve(this);
                }).catch((err) => {
                    reject(err);
                });
            }
        });
    }

    // Initialize the audio source.
    initAudio() {
        return new Promise((resolve, reject) => {
            if (!this.handler) {
                reject("The audio context handler has not been loaded.");
            } else {
                this.handler.init().then((result) => {
                    this.print("The audio context handler has been loaded.");
                    resolve(this);
                }).catch((err) => {
                    reject(err);
                });
            }
        });
    }

    // Initialize the controls.
    initControls() {
        return new Promise((resolve, reject) => {
            if (!this.controls) {
                reject("The control elements have not been loaded.");
            } else {
                this.controls.mediaSource = this.handler.mediaSourceNode;
                this.controls.init().then((result) => {
                    this.print("The control elements have been initialized.");
                    resolve(this);
                }).catch((err) => {
                    reject(err);
                });
            }
        });
    }

    // Run the application.
    run() {
        this.timer.start();
        this.loop();
    }

    // Loop.
    loop() {

        // Update timers.
        this.timer.update();

        // Clear the canvas.
        this.canvas.clear();

        // render something to the screen.
        this.canvas.draw((ctx) => {
            ctx.strokeStyle = Styles.CANVAS.CONTENT;
            ctx.lineWidth = Styles.DEFAULT.LINE_WIDTH;
            ctx.beginPath();
            ctx.moveTo(10.5, 10);
            ctx.lineTo(10.5, 100);
            ctx.stroke();
        });

        // Request the next animation frame.
        requestAnimationFrame(this.loop.bind(this));

    }

}


/*

// Create the application module.
const app = (function () {

    // Declare closure protected references.
    let _player = undefined; // The audio element.  
    let _analyser = undefined;
    let _renderer = undefined;

    // Initialize the controls for the application.
    function _init() {
        
        // Get and assign the elements in the audio player.
        _player = new AudioPlayer({
            element: getElement('.player.element'),
            toggleButton: getElement('.toggle.button'),
            toggleIcon: getElement('.toggle.button.icon'),
            progress: getElement('.progress.progress-bar'),
            volume: getElement('.volume.progress-bar'),
            volumeButton: getElement('.volume.button'),
            volumeIcon: getElement('.volume.button.icon'),
            trackInfo: {
                title: getElement('.player.track-title'),
                artist: getElement('.player.track-artist'),
                album: getElement('.player.track-album'),
                time: getElement('.player.track-time'),
                duration: getElement('.player.track-duration'),
                select: getElement('#trackSelect')
            }
        });

        _analyser = new AudioAnalyzer({
            ctx: new AudioContext(),
            audio: _player.element
        });

        _renderer = new AudioVisualizer({
            canvas: getElement('#mainCanvas'),
            app: this
        });
        
        // Initialize components.
        _player.init(_analyser);
        _analyser.init();
        _renderer.init();
        
    }

    // Get reference to the player object.
    function _getPlayer() {
        if (!_player) {
            _init();
        }
        return _player;
    }
    
    // Get reference to the analyser object.
    function _getAnalyser() {
        if (!_analyser){
            _init();
        }
        return _analyser;
    }
    
    // Get reference to the visualizer object.
    function _getRenderer() {
        if (!_renderer){
            _init();
        }
        return _renderer;
    }

    // Return public members.
    return {
        getPlayer: _getPlayer,
        getAnalyser: _getAnalyser,
        getRenderer: _getRenderer,
        init: _init
    };

}());

*/
