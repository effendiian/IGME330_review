"use strict";
/* 
    Analyzer.js
    Ian Effendi
    
    Used to analyze the audio.
*/

// Analyzer class encapsulates functionality for the AudioContext.
class AudioAnalyzer {
    
    // Construct a visualizer.
    constructor(options = {}){
        this.windowCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = options.ctx || new AudioContext();
        this.audio = options.audio || undefined;
    }
    
    // Initialize the analyser.
    init() {
        if(!this.audio){
            return;
        }
        
        this.audioSource = this.ctx.createMediaElementSource(this.audio);
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 256;
        
        this.setupWebAudio();
        
        this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
    }
    
    setupWebAudio(){
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.value = 1;
        
        this.audioSource.connect(this.analyser);
        this.analyser.connect(this.gainNode);
        this.gainNode.connect(this.ctx.destination);
        
    }
    
    resume(){
        this.ctx.resume();
    }
    
    update(){
        this.analyser.getByteFrequencyData(this.frequencyData);
    }
    
}