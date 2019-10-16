"use strict";
/*
    UI.js - Ian Effendi
    Interface for handling UI events.
*/

// Import the flags from config.
import {
    Flags,
    Printer
} from './config.js';

// Import math utilities.
import {
    clamp
} from './utils/math.js';

import {
    formatTime
} from './utils/time.js';

// Import the tracklist.
import {
    getPath
} from './audio/song.js';

import {
    TRACKS as Tracklist,
    MEDIA_PREFIX as ResourcePrefix
} from './audio/metadata.js';

// Export the UI class.
export class UI {

    // Construct the class.
    constructor(audioContextHandler, controls = {}) {

        // Setup the debug flag.
        this.printer = new Printer(Flags.DEBUG.UI);

        // Prepare blank reference, later for the audio element.
        this.handler = audioContextHandler;

        // Play / Pause button.
        this.toggleButton = controls.toggleButton || undefined;
        this.toggleIcon = controls.toggleIcon || undefined;

        // Volume button and slider.
        this.volumeButton = controls.volumeButton || undefined;
        this.volumeIcon = controls.volumeIcon || undefined;
        this.volume = controls.volume || undefined;

        // Progress bar.
        this.progress = controls.progress || undefined;

        // Track information.
        this.trackInformation = controls.trackInformation || undefined;
        this.trackSelector = controls.trackSelector || undefined;
        this.currentTrack = undefined;

    }

    // Hook up the event listeners.
    init() {
        return new Promise((resolve, reject) => {

            // Wrapper for callbacks.
            let ui = this;

            // Setup event listeners for the audio element.
            if (!this.handler) {
                reject("The media source handler could not be setup.");
            } else {
                this.handler.addEventListener('timeupdate', this.onProgress.bind(this));
                this.handler.addEventListener('ended', this.onTrackEnd.bind(this));
                this.handler.addEventListener('loadeddata', this.onTrackStart.bind(this));
                this.printer.log("Initialized behaviours for the media source handler.");
            }

            // Setup listeners for the toggle button.
            if (!this.toggleButton) {
                reject("The play/pause toggle button behaviour could not be setup.");
            } else {
                this.toggleButton.addEventListener('click', this.onPlayToggle.bind(this));
                this.toggleButton.addEventListener('click', this.updatePlayToggleIcon.bind(this));
                this.printer.log("Initialized behaviours for the play/pause toggle button.");
            }

            // Setup listeners for the volume button and slider.
            if (!this.volumeButton || !this.volume) {
                reject("The volume behaviour could not be setup.");
            } else {
                this.volumeButton.addEventListener('click', this.onVolumeToggle.bind(this));
                this.volumeButton.addEventListener('click', this.updateVolumeIcon.bind(this));
                this.volume.addEventListener('click', (e) => {
                    let x = e.pageX - ui.volume.offsetLeft;
                    let value = x * ui.volume.max / ui.volume.offsetWidth;
                    ui.onVolumeChanged(value);
                });
                this.printer.log("Initialized behaviours for the volume button and slider.");
            }

            // Setup listeners for the progerss bar.
            if (!this.progress) {
                reject("The progress bar behaviour could not be setup.");
            } else {
                this.progress.addEventListener('click', (e) => {
                    let x = e.pageX - ui.progress.offsetLeft;
                    let value = x * ui.handler.mediaSource.duration / ui.progress.offsetWidth;
                    ui.onProgressChanged(value);
                });
                this.printer.log("Initialized behaviours for the progress bar slider.");
            }

            // Setup listeners for the track selection.
            if (!this.trackSelector) {
                reject("The track selection behaviour could not be setup.");
            } else {
                // Add event listener for the track selector.
                this.trackSelector.addEventListener('change', this.onTrackSelect.bind(this));

                // Update the current track based on the track selection query.
                this.updateCurrentTrack();
            }

            // Check if anything is missing.
            if (!this.trackInformation) {
                reject("The track information is missing.");
            }

            // If it reaches this point, we have successfully setup the UI events.
            resolve(this);

        });
    }

    // What should occur when the toggle button is clicked.
    onPlayToggle() {
        this.printer.log("Toggle button pressed.");
        if (this.handler.mediaSource.paused) {
            this.onPlay();
        } else {
            this.onPause();
        }
    }

    // What should occur when the volume button is pressed.
    onVolumeToggle() {
        this.printer.log("Volume button pressed.");
        if (this.volume.muted) {
            this.onUnmute();
        } else {
            this.onMute();
        }
    }

    // What should occur when the volume slider has been modified.
    onVolumeChanged(percentage) {
        this.volume.value = clamp(percentage, 0.0, 1.0);
        this.handler.setVolume(this.volume.value);

        // If volume is changed while muted and is non-zero, unmute the element.
        if (this.volume.muted && this.volume.value > 0.0) {
            this.onUnmute();
        }

        this.updateVolumeIcon();
        this.printer.log("Volume has changed.");
    }

    // What should occur when the progress slider has been modified.
    onProgressChanged(timestamp) {
        this.handler.mediaSource.currentTime = timestamp;
        this.onProgress();
        this.printer.log("Progress has moved.");
    }

    // Processed every tick, while playing.
    onProgress() {
        this.printer.log("Processing...");
        let percentage = 0.0;
        let currentTime = this.handler.mediaSource.currentTime;
        let duration = this.handler.mediaSource.duration;

        // If either value is null, return 0.
        if (isNaN(currentTime) || isNaN(duration)) {
            percentage = 0.0;
        } else {
            percentage = currentTime / duration;
        }

        this.progress.value = clamp(percentage, 0.0, 1.0);
        this.updateTrackTime();
    }

    // Called when unpausing.
    onPlay() {
        this.printer.log("Playing...");
        this.handler.play();
    }

    // Called when paused.
    onPause() {
        this.printer.log("Pausing...");
        this.handler.pause();
    }

    // Called when muted.
    onMute() {
        this.printer.log("Muting the volume.");
        this.volume.muted = true;
        this.handler.setVolume(0.0);
    }

    // Called when unmuting.
    onUnmute() {
        this.printer.log("Unmuting the volume.");
        this.volume.muted = false;
        this.handler.setVolume(this.volume.value);
    }

    // Called when loading and playing current track for first time.
    onTrackStart() {
        this.onProgressChanged(0.0);
        this.onPlay();
        this.printer.log("Loading and playing song from the start.");
    }

    // Called when track reaches the end of the song.
    onTrackEnd() {
        this.printer.log("The track has reached the end.");

        // Get valid index.
        let index = this.trackSelector.selectedIndex;

        // Validate selection.
        if (index != -1) {
            index++;
        } else {
            console.err("[UI] No tracks to select.");
            return;
        }

        // Wrap index.
        if (index >= this.trackSelector.length) {
            index = 0;
        }

        // Turn on autoplay check again.
        this.handler.autoplayCheck = true;

        // Check if the index is the same as the previous one.
        if (this.trackSelector.selectedIndex != index) {
            // Change the track in the trackSelector to the appropriate index.
            this.trackSelector.selectedIndex = index;

            // Update the current track selection as if a new one was selected.        
            this.onTrackSelect();
        } else {
            // Start the track over because only 1 exists.
            this.onTrackStart();
        }
    }

    // Called when track selection value has changed.
    onTrackSelect() {
        this.updateCurrentTrack(); // Updates the current track to point to the current selection.
        this.printer.log("Track selected.");
    }

    // Update the play button's toggle icon.
    updatePlayToggleIcon() {
        // Remove both possible classes.
        this.toggleIcon.classList.remove('fa-play');
        this.toggleIcon.classList.remove('fa-pause');
        // Add class back in based on current state.
        this.toggleIcon.classList.add(`${((!this.handler.mediaSource.paused) ? 'fa-pause' : 'fa-play')}`);
    }

    // Update the volume button's icon.
    updateVolumeIcon() {
        // Remove both possible classes.
        this.volumeIcon.classList.remove('fa-volume-mute');
        this.volumeIcon.classList.remove('fa-volume');
        // Add class back in based on current state.
        this.volumeIcon.classList.add(`${(((this.volume.muted) || (this.volume.value == 0.0)) ? 'fa-volume-mute' : 'fa-volume')}`);
    }

    // Update current track.
    updateCurrentTrack() {
        // Check if the current track is different from the selected value.
        if (this.currentTrack == this.trackSelector.value) {
            this.printer.log("No change made to current track selection.");
            return;
        }

        // Update track on the element - if the element exists.
        let key = this.trackSelector.value;
        let song = Tracklist[key];
        let source = getPath(ResourcePrefix.AUDIO, song);

        if (!source || source == '') {
            console.error("[UI] Selected song does not exist.");
            return;
        }

        // Set the source.
        this.handler.mediaSource.src = source;
        this.handler.mediaSource.load();

        // Update the current track reference.
        this.currentTrack = key;
        this.printer.log(`Current track key assigned by the track selector: ${this.currentTrack}`);

        // Update the track information.
        this.updateTrackInformation(song);
    }

    // Update the track information.
    updateTrackInformation(metadata) {
        this.updateTrackTitle(metadata.title);
        this.updateTrackArtist(metadata.artist);
        this.updateTrackAlbum(metadata.album);
        this.printer.log("Updated track information.");
    }

    // Update the track title.
    updateTrackTitle(title) {
        this.trackInformation.title.innerHTML = title || "Title";
    }

    // Update the track artist.
    updateTrackArtist(artist) {
        this.trackInformation.artist.innerHTML = artist || "Artist";
    }

    // Update the track album.
    updateTrackAlbum(album) {
        this.trackInformation.album.innerHTML = album || "Album";
    }

    // Update the track time.
    updateTrackTime() {
        this.trackInformation.time.innerHTML = formatTime(this.handler.mediaSource.currentTime);
        this.trackInformation.duration.innerHTML = formatTime(this.handler.mediaSource.duration);
    }

}
