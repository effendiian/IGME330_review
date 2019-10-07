"use strict";
/* 
  Audio.js 
  Ian Effendi
  
  Used to encapsulate classes pertaining to the audio player.
*/

// Store state involving the audio player.
class AudioPlayer {

    // Construct using elements from the DOM.
    constructor(options = {}) {
        this.element = options.element || undefined;
        this.toggleButton = options.toggleButton || undefined;
        this.toggleIcon = options.toggleIcon || undefined;
        this.progress = options.progress || undefined;
        this.volume = options.volume || undefined;
        this.volumeButton = options.volumeButton || undefined;
        this.volumeIcon = options.volumeIcon || undefined;
        this.trackInfo = options.trackInfo || undefined;
        this.refreshRate = options.refreshRate || 100; // in milliseconds.
    }

    // Initialize the audio player's events.
    init(analyser) {
        if (!this.element) {
            console.error("Please add an audio element with the class '.player.element' to your page.");
            return;
        }
        this.analyser = analyser || undefined;

        // Prepare event handler methods.
        let _player = this;

        // Assign the correct class to the icon element.
        function togglePlaying() {
            if (_player.isPlaying()) {
                _player.pause();
            } else {
                _player.play();
            }
        }
        
        function selectTrack() {
            _player.updateTrack();
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
            if (_player.isMuted()) {
                _player.element.muted = false;
            } else {
                _player.element.muted = true;
            }
            _player.updateVolumeIcon();
        }
        
        // Add event handler methods.
        this.toggleButton.addEventListener('click', togglePlaying);
        
        let _analyser = this.analyser;
        this.toggleButton.addEventListener('click', () => {
            _analyser.resume();
        });
        
        this.volumeButton.addEventListener('click', toggleMute);
        this.progress.addEventListener('click', selectProgress);
        this.volume.addEventListener('click', updateVolume);
        this.trackInfo.select.addEventListener('change', selectTrack);
         
        // Update the progress bar on an interval.
        this.element.addEventListener('timeupdate', () => {
            _player.updateProgress();
        });
        
        // Play next track on song end.
        this.element.addEventListener('ended', () => {
            _player.nextTrack();
        });
        
        this.element.addEventListener('loadeddata', () => {
            _player.play();
        });
        
        // Update the track info.
        this.updateTrack();
    }

    // Is the player paused?
    isPaused() {
        if (!this.element) {
            return true;
        }
        return this.element.paused;
    }

    // Is the player playing?
    isPlaying() {
        return !(this.isPaused());
    }

    isMuted() {
        if (!this.element || !this.volume) {
            return true;
        }
        return (this.element.muted);
    }

    // Play the audio source.
    play() {        
        if (!this.element) {
            return;
        }

        if (this.isPaused()) {
            let _player = this;
            if(this.element.readyState === READY_STATE.HAVE_NOTHING){
                setTimeout(() => {
                    _player.play();
                }, this.refreshRate);                
            } 
            else 
            {   
                let promise = this.element.play();  
                
                if(promise !== undefined){
                    promise.then(_ => {
                        _player.updateProgress();
                        _player.updateToggleIcon();
                        _player.updateTrackTime();
                    }).catch(error => {
                        console.log("Autoplay is prevented due to Chrome's strict autoplay policy.");
                    });
                }     
            }
        }
    }
    
    // Pause the audio source.
    pause() {
        if (!this.element) {
            return;
        }

        if (this.isPlaying()) {
            this.element.pause();
            this.updateProgress();
            this.updateToggleIcon();                
            this.updateTrackTime();   
        }
    }

    // Get current time of the current track.
    getCurrentTime() {
        if (!this.element) {
            return 0;
        }

        return this.element.currentTime;
    }

    // Get duration of the current track.
    getDuration() {
        if (!this.element) {
            return 0;
        }

        return this.element.duration;
    }

    // Update icon based on play state.
    updateToggleIcon() {
        if (!this.element || !this.toggleIcon) {
            return;
        }

        // Remove both possible classes.
        this.toggleIcon.classList.remove('fa-play');
        this.toggleIcon.classList.remove('fa-pause');

        // Add class based on current state.
        this.toggleIcon.classList.add(`${((this.isPlaying()) ? 'fa-pause' : 'fa-play')}`);
    }

    // Update the volume on vs. mute icons.
    updateVolumeIcon() {
        if (!this.element || !this.volumeIcon) {
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
        if (!this.element) {
            return;
        }

        let percentage = this.element.currentTime / this.element.duration;
        this.progress.value = clamp(percentage, 0.0, 1.0);

        if (this.isPlaying()) {
            this.updateTrackTime();
            // console.log(`Current Progress: ${this.progress.value} % | ${formatTime(this.element.currentTime)}:${formatTime(this.element.duration)}`);   
        }
    }

    // Update the progress bar's current time and duration labels.
    updateTrackTime() {
        if (!this.element) {
            return;
        }

        this.trackInfo.time.innerHTML = formatTime(this.element.currentTime);
        this.trackInfo.duration.innerHTML = formatTime(this.element.duration);
    }
    
    // Update track based on selection.
    updateTrack() {
        if (!this.element) {
            return;
        }
        
        this.setSong(this.trackInfo.select.value);     
    }

    // Go to the next track based on the selected index.
    nextTrack() {
        if(!this.element || !this.trackInfo.select){
            return;
        }
        
        // Get valid index.
        let index = this.trackInfo.select.selectedIndex;
        if(index != -1) {
            index++;
        } else {
            return;
        }
        
        // Wrap if necessary.
        if(index >= this.trackInfo.select.length) {
            index = 0;
        }
        
        // Update selected index.
        this.trackInfo.select.selectedIndex = index;
        this.updateTrack();
    }
    
    // Set the progress and playback.
    setProgress(value) {
        if (!this.element) {
            return;
        }

        this.element.currentTime = value;
        this.updateProgress();
    }

    // Set the volume.
    setVolume(percentage) {
        if (!this.element) {
            return;
        }

        this.volume.value = clamp(percentage, 0.0, 1.0);
        this.element.volume = this.volume.value;
        this.updateVolumeIcon();
    }

    // Set the track info.
    setTrackInfo(data) {
        if (!this.element) {
            return;
        }

        this.trackInfo.title.innerHTML = data.title || 'Track Title';
        this.trackInfo.artist.innerHTML  = data.artist || 'Track Artist';
        this.trackInfo.album.innerHTML  = data.album || 'Track Album';
    }    
    
    // Set the song source.
    setSong(keyword) {
        if(!this.element || !keyword || !TRACKS[keyword]){
            return;
        }
        
        // Get the song reference.
        let song = TRACKS[keyword];
        
        // Get the source address.
        let source = song.getAddress();         
        if(source === ''){
            return;
        }
        
        // Se the source.
        this.element.src = source;
        this.setTrackInfo(song);
        this.element.load();
    }

};
