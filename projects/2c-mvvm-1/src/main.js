"use strict";
/*
    MAIN.js
    Entry point for the application.
*/

import {
    Application
} from './app.js';

// Initialize the application.
const init = new Promise((resolve, reject) => {
    const app = new Application();
    app.init();
    resolve(app);
});

// Run the application.
window.onload = _ => {
    init.then((app) => {
        app.run();
    }).catch((e) => {
        console.error(e);
    });
};
