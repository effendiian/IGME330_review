"use strict";
/*
  App.js
  Ian Effendi
  
  Class representing the application.
*/

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
