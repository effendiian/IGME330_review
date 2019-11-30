"use strict";
/*
    Canvas.js
    Sets up the canvas for the application.
*/

// Canvas-helper functions.
export class Canvas {

    // Initialize the canvas.
    constructor(selector, options = undefined) {
        this.canvas = document.querySelector(selector);
        this.settings = false;
        this.context = false;
        this.dragging = false;
        if (this.canvas) {
            this.context = this.canvas.getContext('2d');
            this.settings = this.getSettings(this.settings);
            this.prepareEvents({});
        }
        this.applySettings(options);
    }

    // Get mouse event.
    getMouse(e) {
        let mouse = {};
        mouse.x = e.pageX - e.target.offsetLeft;
        mouse.y = e.pageY - e.target.offsetTop;
        return mouse;
    }

    // Setup events
    prepareEvents(events = undefined) {

        // Target reference to this instance.
        let canvas = this;

        // Assign to input or default.
        let callbacks = {
            onmousedown: events.onmousedown || ((e) => {
                canvas.dragging = true;
                let mouse = canvas.getMouse(e);
                canvas.context.beginPath();
                canvas.context.moveTo(mouse.x, mouse.y);
            }),
            onmousemove: events.onmousemove || ((e) => {
                // bail if not mouse down.
                if (!canvas.dragging) return;

                // get location of mouse in canvas coordinates.
                let mouse = canvas.getMouse(e);
                canvas.context.strokeStyle = canvas.settings.strokeStyle;
                canvas.context.lineWidth = canvas.settings.lineWidth;

                // draw line to x,y of mouse.
                canvas.context.lineTo(mouse.x, mouse.y);

                // stroke the line.
                canvas.context.stroke();
            }),
            onmouseup: events.onmouseup || ((e) => {
                canvas.context.closePath();
                canvas.dragging = false;
            }),
            onmouseout: events.onmouseout || ((e) => {
                canvas.context.closePath();
                canvas.dragging = false;
            }),
        };

        // Set up canvas events.
        Object.keys(callbacks).forEach((key) => {
            this.canvas[key] = callbacks[key];
        });
    }

    // Clear the canvas.
    clear() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    }

    // Apply settings from the options literal. If undefined, use default values.
    applySettings(options = undefined) {

        // Assign to input or default.
        this.settings = options || {
            lineWidth: 3,
            strokeStyle: "red",
            fillStyle: "black",
            lineCap: "round",
            lineJoin: "round"
        };

        // Apply the settings.
        Object.keys(this.settings).forEach((key) => {
            this.context[key] = this.settings[key];
        });

    }

    // Get all settings.
    getSettings(options) {
        Object.keys(this.context).forEach((key) => {
            options[key] = this.context[key];
        });
        return options;
    }

}
