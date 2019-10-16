"use strict";
/*
    App.js - Ian Effendi
    Application handles the event flow for the visualizer.
*/

import {
    Flags,
    Styles,
    Printer
} from './config.js';

import {
    PI,
    sin,
    interpolate
} from './utils/math.js';

import {
    Transform
} from './canvas/transform.js'

import {
    Style
} from './canvas/style.js'

import {
    Canvas
} from './canvas/canvas.js';

import {
    AudioContextHandler
} from './audio/handler.js';

import {
    UI
} from './ui.js';

import {
    CountdownTimer,
    DeltaTimer
} from './utils/time.js';

// Application class that can be constructed.
export class Application {

    // Constructor class that takes a canvas and audio source.
    constructor(options = {}) {
        this.printer = new Printer(Flags.DEBUG.APP);
        this.timer = new DeltaTimer();
        this.canvas = new Canvas(options.canvas, options.canvasSettings, this.debug) || undefined;
        this.handler = new AudioContextHandler(options.audioContextSettings);
        this.controls = new UI(this.handler, options.controls, this.debug) || undefined;
        this.invert = false;
        this.grayscale = false;
        this.noise = false;
        this.emboss = false;
        this.brighten = false;
        this.initialized = false;

        // Also initialize image processing commands.
        let _app = this;
        options.controls.imageProcessing.noise.onchange = e => _app.noise = e.target.checked;
        options.controls.imageProcessing.brighten.onchange = e => _app.brighten = e.target.checked;
        options.controls.imageProcessing.invert.onchange = e => _app.invert = e.target.checked;
        options.controls.imageProcessing.emboss.onchange = e => _app.emboss = e.target.checked;
        options.controls.imageProcessing.grayscale.onchange = e => _app.grayscale = e.target.checked;
        options.controls.delay.onchange = (e) => {
            _app.handler.enableDelay(e.target.checked);
        }
        options.controls.delayRange.oninput = (e) => {
            _app.handler.setDelay(e.target.value);
            document.querySelector('#delayAmount').innerHTML = e.target.value;
        }

    }

    // Initialize the application.
    init() {

        this.test = true;

        // On success, call resolve(result).
        // On error, call reject(reason).

        return new Promise((resolve, reject) => {

            // If already initialized, we can resolve this promise immediately.
            if (this.initialized === true) {
                this.printer.log("The application has already been initialized.");
                resolve(this);
            }

            // If not already initialized, we should execute the following promise chain.
            // Each init method returns a thennable promise.
            this.initCanvas().then(() => {
                return this.initAudio();
            }).then((result) => {
                return this.initControls();
            }).then((result) => {
                this.printer.log("All members have been initialized.");
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
                this.canvas.init().then((result) => {
                    this.printer.log("The canvas element has been initialized.");
                    resolve(this);
                }).catch((err) => {
                    reject(err);
                });
            }
        });
    }

    // Initialize the audio source.
    initAudio() {
        return new Promise((resolve, reject) => {
            if (!this.handler) {
                reject("The audio context handler has not been loaded.");
            } else {
                this.handler.init().then((result) => {
                    this.printer.log("The audio context handler has been loaded.");
                    resolve(this);
                }).catch((err) => {
                    reject(err);
                });
            }
        });
    }

    // Initialize the controls.
    initControls() {
        return new Promise((resolve, reject) => {
            if (!this.controls) {
                reject("The control elements have not been loaded.");
            } else {

                this.controls.mediaSource = this.handler.mediaSourceNode;
                this.controls.init().then((result) => {
                    this.printer.log("The control elements have been initialized.");
                    resolve(this);
                }).catch((err) => {
                    reject(err);
                });
            }
        });
    }

    // Run the application.
    run() {
        // this.timer.start();
        this.loop();
    }

    // Loop.
    loop() {

        // Update timers.
        // this.timer.update();

        // Clear the canvas.
        this.canvas.clear();

        let WIDTH = this.canvas.getWidth();
        let HEIGHT = this.canvas.getHeight();
        let SAMPLER = this.handler.audioSampler.analyserNode;
        let DATA_SIZE = 0;
        let LAST_RADII = {
            firstHalf: 0,
            secondHalf: 0
        };

        // Update the sampler data bins.
        // SAMPLER.update();             

        // Fill the canvas.
        this.canvas.draw((ctx) => {
            ctx.fillStyle = Styles.CANVAS.BACKGROUND;
            ctx.fillRect(0, 0, WIDTH, HEIGHT);
        });

        // Draw frequency bars.

        // Get frequency data.
        SAMPLER.fftSize = 256;
        DATA_SIZE = SAMPLER.frequencyBinCount;
        let FREQUENCY_DATA = new Uint8Array(DATA_SIZE);
        SAMPLER.getByteFrequencyData(FREQUENCY_DATA);

        this.canvas.draw((ctx) => {
            ctx.fillStyle = Styles.CANVAS.SHADOW;

            // Offset values.
            let xOffset = 0;
            let yOffset = -10;

            // Get size of each bar.
            let barWidth = (WIDTH / DATA_SIZE) * 1.5;
            let barHeight = 0;
            let x = 0;

            // Draw each bar.
            for (let i = 0; i < DATA_SIZE; i++) {
                barHeight = FREQUENCY_DATA[i] / 2;
                ctx.fillRect(x + xOffset, (HEIGHT - barHeight / 2) + yOffset, barWidth, barHeight);
                x += barWidth + 1;
            }
        });

        // Draw pulsating circle.
        this.canvas.draw((ctx) => {
            // Offset values.
            let xOffset = -(WIDTH / 6);
            let yOffset = 0;

            // Get the radius of the circle.
            let scale = {
                firstHalf: 1.5,
                secondHalf: 2.5
            };
            let radii = {
                firstHalf: {
                    min: 10,
                    max: 300,
                },
                secondHalf: {
                    min: 10,
                    max: 300
                }
            };

            let averages = {
                firstHalf: 0,
                secondHalf: 0
            };

            // Draw the circle based on the average frequency.
            for (let i = 0; i < DATA_SIZE; i++) {
                if (i < (DATA_SIZE / 2)) {
                    averages.firstHalf += FREQUENCY_DATA[i];
                } else {
                    averages.secondHalf += FREQUENCY_DATA[i];
                }
            }

            let t1 = (averages.firstHalf / DATA_SIZE / 2) / 128;
            let t2 = (averages.secondHalf / DATA_SIZE / 2) / 128;
            let currentRadii = {
                firstHalf: ((LAST_RADII.firstHalf) + (interpolate(radii.firstHalf.min, radii.firstHalf.max, t1))) / 2,
                secondHalf: ((LAST_RADII.secondHalf) + (interpolate(radii.secondHalf.min, radii.secondHalf.max, t2))) / 2
            };
            LAST_RADII.firstHalf = currentRadii.firstHalf;
            LAST_RADII.secondHalf = currentRadii.secondHalf;

            ctx.fillStyle = Styles.CANVAS.CONTENT;
            ctx.strokeStyle = Styles.CANVAS.SHADOW;

            ctx.beginPath();
            ctx.arc((WIDTH / 2) + xOffset, (HEIGHT / 2) + yOffset, currentRadii.firstHalf * scale.firstHalf, 0, PI * 2, false);
            ctx.stroke();
            ctx.fill();

            ctx.fillStyle = Styles.CANVAS.HIGHLIGHT;
            ctx.strokeStyle = Styles.CANVAS.BACKGROUND;

            ctx.beginPath();
            ctx.arc((WIDTH / 2) + xOffset, (HEIGHT / 2) + yOffset, currentRadii.secondHalf * scale.secondHalf, 0, PI * 2, false);
            ctx.stroke();
            ctx.fill();
        });

        // Get the waveform data.
        SAMPLER.fftSize = 2048;
        DATA_SIZE = SAMPLER.frequencyBinCount;
        let WAVEFORM_DATA = new Uint8Array(DATA_SIZE);
        SAMPLER.getByteTimeDomainData(WAVEFORM_DATA);

        // Draw wave.
        this.canvas.draw((ctx) => {
            ctx.lineWidth = 2;
            ctx.strokeStyle = Styles.CANVAS.CONTENT;
            ctx.beginPath();

            let xOffset = 0;
            let yOffset = 0;
            let waveHeight = HEIGHT / 2;
            let sliceWidth = (WIDTH + 1.0) / DATA_SIZE;
            let x = 0;

            ctx.moveTo(0, waveHeight);
            for (let i = 0; i < DATA_SIZE; i++) {
                let value = WAVEFORM_DATA[i] / 128;
                let y = value * (waveHeight / 2);

                if (i === 0) {
                    ctx.moveTo(x + xOffset, y + yOffset);
                } else {
                    ctx.lineTo(x + yOffset, y + yOffset);
                }

                x += sliceWidth;
            }

            ctx.lineTo(WIDTH + 1 + xOffset, waveHeight / 2 + yOffset);
            ctx.stroke();
        });

        // Draw bezier curves.
        this.canvas.draw((ctx) => {

            ctx.lineWidth = 5;
            ctx.strokeStyle = Styles.CANVAS.SHADOW;


            let values = 0;
            // Draw the circle based on the average waveform.
            for (let i = 0; i < DATA_SIZE; i++) {
                values += WAVEFORM_DATA[i] / 128;
            }

            let xOffset = sin(values / DATA_SIZE);
            let yOffset = 0;

            ctx.beginPath();
            ctx.moveTo(0 + xOffset, (HEIGHT / 2) + yOffset);
            ctx.bezierCurveTo(xOffset, values + yOffset, WIDTH + xOffset, (HEIGHT / 2) + yOffset, WIDTH + xOffset, (HEIGHT / 2) + yOffset);
            // ctx.stroke();

            // ctx.beginPath();
            ctx.moveTo(xOffset + WIDTH, 0);
            ctx.bezierCurveTo(WIDTH + xOffset, values + (HEIGHT / 2) + yOffset, WIDTH + xOffset, (HEIGHT / 2) + yOffset, 0, 0);
            ctx.stroke();
        });


        // Image manipulation.
        this.canvas.manipulate((ctx) => {

            let imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
            let data = imageData.data;
            let length = data.length;
            let width = imageData.width;

            for (let i = 0; i < length; i += 4) {

                if (this.noise && Math.random() < .07) {
                    data[i] = data[i + 1] = data[i + 2] = (Math.random() < 0.7) ? 255 : 0;
                }

                if (this.brighten) {
                    data[i] += 50; // set red value
                    data[i + 1] += 50; // set green value
                    data[i + 2] += 50; // set blue value
                }

                if (this.emboss) {
                    data[i] = 127 + 2 * data[i] - data[i + 4] - data[i + width * 4];
                }

                if (this.invert) {
                    data[i] = 255 - data[i]; // red
                    data[i + 1] = 255 - data[i + 1]; // green
                    data[i + 2] = 255 - data[i + 2]; // blue
                }

                if (this.grayscale) {
                    var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = avg; // red
                    data[i + 1] = avg; // green
                    data[i + 2] = avg; // blue
                }
            }
            ctx.putImageData(imageData, 0, 0);
        });

        // Request the next animation frame.
        requestAnimationFrame(this.loop.bind(this));

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
