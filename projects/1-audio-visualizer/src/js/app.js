"use strict";
/*
  App.js
  Ian Effendi
  
  Class representing the application.
*/

// Create the application module.
const app = (function(){
    
  // Declare closure protected references.
  let _player = {}; // The audio element.  
  
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
          duration: getElement('.player.track-duration')
      },
    });    
    
    _player.init();
    
  }
  
  // Get reference to the player object.
  function _getPlayer() {
    if(!_player){
      _init();
    }
    return _player;
  }
  
  // Return public members.
  return {
    getPlayer: _getPlayer,
    init: _init
  };
  
}());