"use strict";
/*
    UI.js - Ian Effendi
    Interface for handling UI events.
*/

// Export the UI class.
export class UI {
    
    // Construct the class.
    constructor(options = {}) {
        
        // Get reference to the audio element.
        this.mediaSource = options.mediaSource || undefined;
        
        // Play / Pause button.
        this.toggleButton = options.toggleButton || undefined;
        this.toggleIcon = options.toggleIcon || undefined;
        
        // Volume button and slider.
        this.volumeButton = options.volumeButton || undefined;
        this.volumeIcon = options.volumeIcon || undefined;
        this.volume = options.volume || undefined;
        
        // Progress bar.
        this.progress = options.progress || undefined;
        
        // Track information.
        this.trackInformation = options.trackInformation || undefined;
        this.trackSelection = options.trackSelection || undefined;
        
    }
    
    // Hook up the event listeners.
    init() {
        
        // Reference to the audio elemen.t
        let _this = this;
        
        // Setup event listeners for the audio element.
        this.mediaSource.addEventListener('timeupdate', this.onProgress);
        this.mediaSource.addEventListener('ended', this.onTrackEnd);
        this.mediaSource.addEventListener('loadeddata', this.onPlay);
        
        // Setup listeners for the toggle button.
        this.toggleButton.addEventListener('click', this.onPlayToggle);
        this.toggleButton.addEventListener('click', this.updatePlayToggleIcon);
        
        // Setup listeners for the volume button and slider.
        this.volumeButton.addEventListener('click', this.onVolumeToggle);
        this.volumeButton.addEventListener('click', this.updateVolumeIcon);
        this.volume.addEventListener('click', this.onVolumeChanged);
        
        // Progress bar.
        this.progress.addEventListener('click', this.onProgressChanged);
        
        // Update the track information.
        this.trackInformation = ; // TODO;
        
        /// TODO
        
        
        
        
        
        
    }    
    
    // What should occur when the toggle button is clicked.
    onPlayToggle() {
        console.log("Toggle button pressed.");
        if(this.mediaSource.paused) {
            this.onPlay();
        }
        else {
            this.onPause();
        }        
    }
    
    // What should occur when the volume button is pressed.
    onVolumeToggle() {
        console.log("Volume button pressed.");
        if(this.volume.muted) {
            this.onUnmute();
        } else {
            this.onMute();
        }
    }
    
    // What should occur when the volume slider has been modified.
    onVolumeChanged() {
        console.log("Volume has changed.");    
    }
    
    // What should occur when the progress slider has been modified.
    onProgressChanged() {
        console.log("Progress has moved.");
    }
    
    // Processed every tick, while playing.
    onProgress() {
        console.log("Processing...")
    }
    
    // Called when unpausing.
    onPlay() {
        console.log("Playing...");
        if(this.mediaSource.paused){
            this.mediaSource.play();
        }
        
    }    
        
    // Called when paused.
    onPause() {
        console.log("Pausing...");
        if(!this.mediaSource.paused){
            this.mediaSource.pause();
        }
    }
        
    // Called when muted.
    onMute() {
        console.log("Muting the volume.");
        this.volume.muted = true;
    }
    
    // Called when unmuting.
    onUnmute() {
        console.log("Unmuting the volume.");
        this.volume.muted = false;
        
    }
    
    // Called when loading and playing current track for first time.
    onTrackStart() {
        console.log("Loading and playing song.");
    }
    
    // Called when track reaches the end of the song.
    onTrackEnd() {
        console.log("The track has reached the end.");
    }
    
    // Called when track selection value has changed.
    onTrackSelect() {
        console.log("Track selected.");
    }
    
    // Update the play button's toggle icon.
    updatePlayToggleIcon() {
        // Remove both possible classes.
        this.toggleIcon.classList.remove('fa-play');
        this.toggleIcon.classList.remove('fa-pause');
        // Add class back in based on current state.
        this.toggleIcon.classList.add(`${((this.mediaSource.paused) ? 'fa-paused' : 'fa-play')}`);
    }
    
    // Update the volume button's icon.
    updateVolumeIcon() {
        // Remove both possible classes.
        this.volumeIcon.classList.remove('fa-play');
        this.volumeIcon.classList.remove('fa-pause');
        // Add class back in based on current state.
        this.volumeIcon.classList.add(`${(((this.volume.muted) || (this.volume.value == 0.0)) ? 'fa-paused' : 'fa-play')}`);        
    }
    
    // Update the track information.
    updateTrackInformation() {
        
    }
    
    
}