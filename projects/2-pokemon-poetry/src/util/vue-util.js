"use strict";
/*
    VUE-UTIL.JS
    Utility functions for VUE applications.
*/

// Helper function for registering a component.
export const registerComponent = function (id, options) {
    if (!Vue) {
        console.error("Vue has not been loaded.");
        return;
    }
    Vue.component(id, options);
}
