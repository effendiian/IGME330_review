"use strict";
/*
    Sampler.js - Ian Effendi
    Sampler manages an AudioAnalyser instance and wraps helper functions.
*/

// Import sampler settings.
import {
    Flags,
    Settings,
    Printer
} from './../config.js';

// Math functions.
import {
    clamp,
    floor,
    ceiling,
    interpolate
} from './../utils/math.js';

// Sampler allows us to get data out of an analyser node.
export class AudioSampler {

    // Construct an AudioSampler using an audio context.
    constructor(audioContext, options = {}) {
        this.printer = new Printer(Flags.DEBUG.SAMPLER);
        this.analyserNode = audioContext.createAnalyser();
        this.prepareData();
    }

    // Calling update will execute calculations for this instance of time.
    update() {
        // Get the frequency data.
        this.analyserNode.getByteFrequencyData(this.frequencyData);

        // Get the waveform data.
        this.analyserNode.getByteTimeDomainData(this.waveformData);
    }

    // Prepare the data.
    prepareData() {
        this.printer.log("Preparing data arrays...");
        this.bufferSize = this.analyserNode.frequencyBinCount;
        this.frequencyData = new Uint8Array(this.bufferSize);
        this.waveformData = new Uint8Array(this.bufferSize);
        this.update();
    }

    // Set the fft size.
    setFFTSize(fftSize) {
        this.printer.log("Setting the FFT size...");
        this.analyserNode.fftSize = fftSize;
        this.prepareData();
    }

    // Set the decibel range
    setDecibelRange(min, max) {
        this.printer.log("Setting the decibel range...");
        this.analyserNode.minDecibels = min;
        this.analyserNode.maxDecibels = max;
        this.prepareData();
    }

    // Set smoothing time constant.
    setSmoothingTimeConstant(smooth) {
        this.printer.log("Setting the smoothing time constant...");
        this.analyserNode.smoothingTimeConstant = smooth;
        this.prepareData();
    }

    // Get frequency data using a 'percentage' of the sample size.
    // This will attempt to blend between data points.
    getData(percentage, data) {

        // Store value.
        let value = undefined;

        // Clamp the percentage between two values.
        let fraction = clamp(percentage, 0.0, 1.0);

        // Virtual index representing location of the next data point to draw from.
        let virtualIndex = fraction * data.length;

        // Soft checks for simple cases, where index is exactly the end or the beginning.
        if (percentage <= 0.0) {
            // If percentage is 0, return value in first array slot.
            value = data[0];
        } else if (percentage >= 1.0) {
            // If percentage is 1, return value in last array slot.
            value = data[(data.length - 1)];
        } else {

            // If index is an 'in-between' value,
            // we will need to combine the values based on the distance
            // the virtual index is from one value or the other.
            let prevIndex = floor(virtualIndex);
            let nextIndex = ceiling(virtualIndex);
            let range = nextIndex - prevIndex;

            // Prepare values for interpolation.
            let prev = data[prevIndex];
            let next = data[nextIndex];
            let t = (virtualIndex - prevIndex) / range; // weighted amount for interpolation between two values.

            // Debug print statement.
            // this.printer.log(`Using interpolation value ${t}, between [${prevIndex}]:(${prev}) and [${nextIndex}]:(${next}).`);

            // Return the interpolated value that's calculated.
            value = interpolate(prev, next, t);

        }

        // Calculated value.
        // this.printer.log(`Calculated value ${value} given virtual index of ${virtualIndex}.`);
        return value;
    }

    // Get frequency bin count.
    getFrequencyBinCount() {
        return this.analyserNode.frequencyBinCount;
    }

    // Get blended frequency data.
    getFrequencyData(percentage) {
        return this.getData(percentage, this.frequencyData);
    }

    // Get blended waveform data.
    getWaveformData(percentage) {
        return this.getData(percentage, this.waveformData);
    }

    // Reference to the analyser node.
    getAnalyserNode() {
        return this.analyserNode;
    }

    // Connect to node method.
    connect(audioNode) {
        this.analyserNode.connect(audioNode);
    }

    // Disconnect node method.
    disconnect(args) {
        this.analyserNode.disconnect(args);
    }

}
