"use strict";
/*
  Main.js -  Ian Effendi  
  Entry point for the audio visualizer application.
*/

import test from './utils/test.js';

// Test function for testing import statements.

// Initialize the visualizer application.
function init() {
        
  test();
    
  if(!app){
    console.error("'app.js' has not been added to the page.");
    return;
  } else {
    app.init();    
    
    let player = app.getPlayer();  
    let analyser = app.getAnalyser();
    let renderer = app.getRenderer();
        
    function render() {
        analyser.update();
        renderer.update();
        renderer.render(analyser.frequencyData);
        requestAnimationFrame(render);
    }
      
    requestAnimationFrame(render);
      
  }  
};

// Assign the init function to run after window has been loaded.
window.onload = init;