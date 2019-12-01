"use strict";
/*
    MAIN.js
    Main entry point for the application.
*/

import {
    default as Root
} from './components/root.js';

// Prepare the application.
window.onload = (() => {

    console.log("Window has loaded.")

    // Register root component globally.
    Vue.component(
        Root.name,
        Root.config
    );

    // Initialize the VUE application.
    let app = new Vue({
        el: "#root",
        data: {}
    });


})();
