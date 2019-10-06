"use strict";
/* 
  Audio.js 
  Ian Effendi
  
  Used to encapsulate classes pertaining to the audio player.
*/

// Ready state values. 
// Taken from Mozilla docs: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState
const READY_STATE = {
  HAVE_NOTHING: 0,
  HAVE_METADATA: 1,
  HAVE_CURRENT_DATA: 2,
  HAVE_FUTURE_DATA: 3,
  HAVE_ENOUGH_DATA: 4
};

// Store state involving the audio player.
class AudioPlayer {
  
  // Construct using elements from the DOM.
  constructor(options = {}){
    this.element = options.element || undefined;
    this.toggleButton = options.toggleButton || undefined;
    this.toggleIcon = options.toggleIcon || undefined;
    this.progress = options.progress || undefined;
    this.volume = options.volume || undefined;
    this.volumeButton = options.volumeButton || undefined;
    this.volumeIcon = options.volumeIcon || undefined;
    this.refreshRate = options.refreshRate || 100; // in milliseconds.
  }
    
  // Initialize the audio player's events.
  init() {
    if(!this.element) {
      console.error("Please add an audio element with the class '.player.element' to your page.");
      return;
    }
    
    // Prepare event handler methods.
    let _player = this;
    
    // Assign the correct class to the icon element.
    function togglePlaying() {      
        if(_player.isPlaying()){
          _player.pause();
        } else {
          _player.play();
        }

        // Update the icon.
        _player.updateToggleIcon();      
    }
      
    function selectProgress(e) {
        let x = e.pageX - this.offsetLeft;
        let val = x * _player.element.duration / this.offsetWidth;
        _player.setProgress(val);
    }
    
    function updateVolume(e) {
        let x = e.pageX - this.offsetLeft;
        let val = x * this.max / this.offsetWidth;
        _player.setVolume(val);
    }
    
    function toggleMute() {
        if(_player.isMuted()){
            _player.element.muted = false;
        } else {
            _player.element.muted = true;
        }
        _player.updateVolumeIcon();
    }
      
    // Add event handler methods.
    this.toggleButton.addEventListener('click', togglePlaying);
    this.volumeButton.addEventListener('click', toggleMute);
    this.progress.addEventListener('click', selectProgress);
    this.volume.addEventListener('click', updateVolume);    
      
    // Call update methods.
    this.updateProgress();
    this.updateToggleIcon();
    this.updateVolumeIcon();  
      
    // Update the progress bar on an interval.
    setInterval(() => {
        _player.updateProgress();
    }, this.refreshRate);
  }
  
  // Is the player paused?
  isPaused() {
    if(!this.element){
      return true;
    }
    return this.element.paused;
  }
  
  // Is the player playing?
  isPlaying() {
    return !(this.isPaused());
  }
    
  isMuted() {
    if(!this.element || !this.volume){
        return true;
    }
    return (this.element.muted);
  }
  
  // Play the audio source.
  play() {
    if(!this.element){
      return;
    }
    
    if(this.isPaused()){
      if(this.element.readyState === READY_STATE.HAVE_NOTHING) {
        console.error("Cannot play audio element without loaded data.");
        return;
      }
      this.element.play();
    }
  }
  
  // Pause the audio source.
  pause() {
    if(!this.element){
      return;
    }
    
    if(this.isPlaying()){
      this.element.pause();
    }
  }
    
  // Get current time of the current track.
  getCurrentTime() {
    if(!this.element){
      return 0;
    }
    
    return this.element.currentTime;
  }
  
  // Get duration of the current track.
  getDuration() {
    if(!this.element){
      return 0;
    }
    
    return this.element.duration;
  }
  
  // Update icon based on play state.
  updateToggleIcon(){
    if(!this.element || !this.toggleIcon){
      return;
    }
    
    // Remove both possible classes.
    this.toggleIcon.classList.remove('fa-play');
    this.toggleIcon.classList.remove('fa-pause');
    
    // Add class based on current state.
    this.toggleIcon.classList.add(`${((this.isPlaying()) ? 'fa-pause' : 'fa-play')}`);
  }
    
  updateVolumeIcon() {
    if(!this.element || !this.volumeIcon){
      return;
    }
    
    // Remove both possible classes.
    this.volumeIcon.classList.remove('fa-volume-mute');
    this.volumeIcon.classList.remove('fa-volume');
    
    // Add class based on current state.
    this.volumeIcon.classList.add(`${((this.isMuted() || this.volume.value === 0.0) ? 'fa-volume-mute' : 'fa-volume')}`);  
  }
  
  // Update the progress bar based on song duration.
  updateProgress() {
    if(!this.element){
      return;
    }
    
    let percentage = this.element.currentTime / this.element.duration;
    this.progress.value = clamp(percentage, 0.0, 1.0);
      
    if(this.isPlaying()){
        // console.log(`Current Progress: ${this.progress.value} % | ${formatTime(this.element.currentTime)}:${formatTime(this.element.duration)}`);   
    }
  }
    
  // Set the progress and playback.
  setProgress(value) {
      if(!this.element){
          return;
      }
      
      this.element.currentTime = value;
      this.updateProgress();      
  }
    
  // Set the volume.
  setVolume(percentage) {
    if(!this.element){
      return;
    }
    
    this.volume.value = clamp(percentage, 0.0, 1.0);
    this.element.volume = this.volume.value;
    this.updateVolumeIcon();
  }  
  
};