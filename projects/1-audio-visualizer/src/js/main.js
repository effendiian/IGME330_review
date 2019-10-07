"use strict";
/*
  Main.js
  Ian Effendi
  
  Entry point for the audio visualizer application.
*/

// The application object is created in 'app.js'. 


// Initialize the visualizer application.
function init() {
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