"use strict";
/*
    Entry point for the application.
*/

// Import configuration settings.
import {
    default as CONFIG
} from './config.js';

// Global application reference.
var vm = undefined;

// Fetch data.

// "Content-Type": "application/json",
// "X-CMC_PRO_API_KEY": CONFIG.API_KEY,

// Prepare the fetch data.
function getFetchData() {
    // Prepare the data.
    let fetchData = {
        mode: "no-cors",
        credentials: "include",
        headers: new Headers()
    }

    // Prepare the headers.
    fetchData.headers.append("Accepts", "application/json");
    // fetchData.headers.append("X-CMC_PRO_API_KEY", CONFIG.API_KEY);

    return fetchData;
}

// Get the url with params included.
function getFetchURL(params = null) {
    let url = "";
    if (!params) {
        url = CONFIG.URL_ROOT;
    } else {
        let qs = [];
        Object.keys(params).forEach((key) => {
            qs.push(`${key}=${encodeURIComponent(params[key])}`);
        });
        url = `${CONFIG.URL_ROOT}?${qs.join("&")}`;
    }
    return encodeURI(url);
}

// Create the application data.
const appData = {
    el: "#app",
    data: {
        title: CONFIG.TITLE,
        service: CONFIG.SERVICE,
        endpoint: CONFIG.ENDPOINT,
        results: {},
        limit: null
    },
    created() {
        this.search();
    },
    methods: {
        search() {
            //if (! this.term.trim()) return;
            fetch("http://igm.rit.edu/~acjvks/courses/2018-fall/330/php/get-a-joke.php")
                .then(response => {
                    if (!response.ok) {
                        throw Error(`ERROR: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(json => {
                    console.log(json);
                })
        }
    }
};

// Initialize the application.
function init() {
    // Prepare the app.
    const app = new Vue(appData);
    vm = app;
}

// On window load, initialize the view model.
window.onload = init;
