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

// Prepare the fetch data.
function getFetchData() {
    // Prepare the data.
    let fetchData = {
        mode: "no-cors",
        headers: new Headers()
    }

    // Prepare the headers.
    // fetchData.headers.append("X-Requested-With", "client"); // For CORS-Anywhere service.
    fetchData.headers.append("Accepts", "application/json"); // Accept header.

    // Return the fetch data.
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
    return `${encodeURI(url)}`;
}

// Create the application data.
const appData = {
    el: "#app",
    data: {
        title: CONFIG.TITLE,
        service: CONFIG.SERVICE,
        endpoint: CONFIG.ENDPOINT,
        api: CONFIG.URL_ROOT,
        results: {},
        limit: CONFIG.DEFAULT_LIMIT,
        term: "",
        status: "Type in a term to search!",
    },
    created() {
        this.search();
    },
    methods: {
        search() {

            this.term = this.term.trim();
            if (this.term.length > 0) {

                // Wrap with CORS Anywhere proxy server service to allow passage of API header.
                let url = getFetchURL({
                    term: encodeURIComponent(this.term),
                    limit: this.limit ? this.limit : CONFIG.DEFAULT_LIMIT,
                    media: "music"
                });
                let data = getFetchData();

                if (CONFIG.DEBUG_MODE) {
                    console.groupCollapsed(`Request Headers for Endpoint [${url}]`);
                    for (let entry of data.headers.entries()) {
                        console.log(`"${entry[0]}": "${entry[1]}"`);
                    }
                    console.groupEnd();
                }

                // Fetch request.
                fetch(url, data).then(response => {
                    if (!response.ok) {
                        throw Error(`(${response.status}): ${response.statusText}`);
                    }

                    if (CONFIG.DEBUG_MODE) {
                        console.log(`(${response.status}): ${response.statusText}`);
                    }

                    return response.json();
                }).then(json => {

                    if (CONFIG.DEBUG_MODE) {
                        console.dir(json);
                    }
                    this.status = `"${this.term}" returns ${json.resultCount} result(s)...`;
                    this.results = json.results;

                }).catch(error => {
                    console.error(error);
                });

                /*
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
                    })*/
            } else {
                this.status = "Type in a term to search!";
            }
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
