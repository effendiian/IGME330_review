"use strict";
/*
    Visualizer.js
    Ian Effendi
    
    Used to visualize audio on the canvas.
*/

// Visualize items on the canvas.
class AudioVisualizer {

    // Construct the visualizer using the canvas reference.
    constructor(options = {}) {
        this.canvas = options.canvas || undefined;
        this.app = options.app || undefined;
        this.radius = options.radius || 10;
    }

    init() {
        if (!this.canvas) {
            return;
        }

        this.ctx = this.canvas.getContext('2d');
    }

    update() {

    }

    render(data) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


        let barWidth = 4;
        let barSpacing = 1;
        let barHeight = 100;
        let topSpacing = 50;


        // loop through the data and draw!
        for (let i = 0; i < data.length; i++) {
            // drawCtx.fillStyle = 'rgba(0,255,0,0.6)';

            // the higher the amplitude of the sample (bin) the taller the bar
            // remember we have to draw our bars left-to-right and top-down
            //drawCtx.fillRect(i * (barWidth + barSpacing), topSpacing + 256 - audioData[i], barWidth, barHeight);

            // Draw inverted bars.
            // drawCtx.fillStyle = 'rgba(255,0,0,0.6)';
            // drawCtx.fillRect(640 - i * (barWidth + barSpacing), topSpacing + 256 - audioData[i] - 20, barWidth, barHeight);


            // Draw circles.
            let percent = data[i] / 255;
            let circleRadius = percent * this.radius;

            // Replace bars.
            this.ctx.beginPath();
            this.ctx.fillStyle = makeColor(155 * (1 - percent), 50, 200 * percent, 0.6);
            this.ctx.arc(i * (barWidth + barSpacing), topSpacing + 256 - data[i], barWidth, 0, 2 * Math.PI, false);
            this.ctx.fill();
            this.ctx.closePath();
        

        }

    }

}
