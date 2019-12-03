"use strict";
/* 
    APP.js
    Wraps the web-service application behaviour together.
*/

import {
    default as header
} from './components/v-header.js';

import {
    default as footer
} from './components/v-footer.js';

const Components = [
    header
];

// Application class.
export class Application {

    // Setup for the application.
    constructor() {
        this.Vue = undefined;
    }

    // Initialize the application.
    init() {
        // Initialize all imported vue components here.
        Components.forEach((item) => {
            item.init();
        });

        // Initialize the vue application here.
        this.Vue = new Vue({
            el: "#root",
            data: {
                title: "Pokemon Jazz!",
                links: footer.data().links
            },
            vuetify: new Vuetify()
        });
    }

    run() {
        console.log("Application is running...");
    }

}
