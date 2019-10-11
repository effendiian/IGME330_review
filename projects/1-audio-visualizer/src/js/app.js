"use strict";
/*
    App.js - Ian Effendi
    Application handles the event flow for the visualizer.
*/


// Application class that can be constructed.
export class Application {

    // Constructor class that takes a canvas and audio source.
    constructor(options = {}) {
        this.canvas = options.canvas || undefined;
        this.audioSource = options.audioSource || undefined;
        this.controls = options.controls || undefined;
        this.initialized = false;
    }

    // Initialize the application.
    init() {

        // On success, call resolve(result).
        // On error, call reject(reason).
        
        return new Promise((resolve, reject) => {
            if (this.initialized === true) {
                console.log("The application has already been initialized.");
                resolve(this);
            }

            this.initCanvas().then(() => {
                return this.initAudio();
            }).then((result) => {
                return this.initControls();
            }).then((result) => {         
                console.log("All members have been initialized.");
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
                console.log("The canvas element has been initialized.");
                resolve(this);
            }
        });
    }
    
    // Initialize the audio source.
    initAudio(){
        return new Promise((resolve, reject) => {
            if (!this.audioSource) {
                reject("The audio source element has not been loaded.");
            } else {
                console.log("The audio source element has been initialized.");
                resolve(this);
            }
        });
    }
    
    // Initialize the controls.
    initControls(){
        return new Promise((resolve, reject) => {
            if (!this.controls) {
                reject("The control elements have not been loaded.");
            } else {
                console.log("The control elements has been initialized.");
                resolve(this);
            }
        });        
    }

    // Run the application.
    run() {
        
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
