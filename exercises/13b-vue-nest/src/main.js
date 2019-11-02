"use strict";

// Initialize the components.
import {
    init
} from './vue-components.js';

// Initialize vue components.
init();

// Entry point into the application.
const app = new Vue({
    el: '#root',
    data: {
        newName: "",
        names: ["Adam", "Betty", "Charlie", "Doris"],
        title: "The Guestbook!"
    },
    methods: {
        addName() {
            if (!this.newName) return;
            this.names.push(this.newName);
            this.newName = "";
        }
    }
});
