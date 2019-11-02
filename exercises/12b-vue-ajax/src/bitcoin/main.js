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
        headers: new Headers()
    }

    // Prepare the headers.
    fetchData.headers.append("X-Requested-With", "client"); // For CORS-Anywhere service.
    fetchData.headers.append("Accepts", "application/json"); // Accept header.
    fetchData.headers.append("X-CMC_PRO_API_KEY", CONFIG.API_KEY); // For the CMC Pro API key.

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
    return `${CONFIG.CORS_ANYWHERE_ROOT}${encodeURI(url)}`;
}

// Create the application data.
const appData = {
    el: "#app",
    data: {
        title: CONFIG.TITLE,
        service: CONFIG.SERVICE,
        endpoint: CONFIG.ENDPOINT,
        proxy: CONFIG.CORS_ANYWHERE_ROOT,
        api: CONFIG.URL_ROOT,
        results: {},
        limit: 100,
        offset: 1,
        from: 1,
        to: 101
    },
    created() {
        this.search();
    },
    methods: {
        next() {
            this.offset = this.offset + parseInt(this.limit);
            if (this.offset <= 0) {
                this.offset = 0;
            }
            if (CONFIG.DEBUG_MODE) {
                console.log(`Offset: ${this.offset}`);
                console.log(`Limit: ${this.limit}`);
            }
            this.search();
        },
        previous() {
            this.offset -= parseInt(this.limit);
            if (this.offset <= 0) {
                this.offset = 0;
            }
            if (CONFIG.DEBUG_MODE) {
                console.log(`Offset: ${this.offset}`);
                console.log(`Limit: ${this.limit}`);
            }
            this.search();
        },
        onLimitChange(e) {
            this.newSearch();
        },
        newSearch() {
            this.offset = 1;
            if (CONFIG.DEBUG_MODE) {
                console.log(`Offset: ${this.offset}`);
                console.log(`Limit: ${this.limit}`);
            }
            this.search();
        },
        search() {

            // Update the from and to values.
            this.from = +this.offset;
            this.to = this.from + (+this.limit);

            // Wrap with CORS Anywhere proxy server service to allow passage of API header.
            let url = getFetchURL({
                limit: this.limit ? this.limit : 100,
                start: this.offset ? this.offset : 1
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
                this.results = json.data;

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
