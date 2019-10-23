"use strict";
/*
    Main.js - Ian Effendi
    Entry point for the GIF Finder HW assignment.
*/

// Import secrets.
import {
    default as SECRETS
} from './_secret.js';

// All the HTML elements we want to interact with.
const ELEMENTS = {
    search: {
        selector: "#search",
        callbacks: [{
            event: "click",
            callback: onSearch
        }, {
            event: "click",
            callback: enableFindMoreButton
        }]
    },
    searchterm: {
        selector: "#searchterm",
        callbacks: [{
            event: "keyup",
            callback: onSearchEnter
        }]
    },
    searchlimit: {
        selector: "#limit"
    },
    status: {
        selector: "#status"
    },
    results: {
        selector: "#content"
    },
    spinner: {
        selector: "#spinner"
    },
    findmore: {
        selector: "#more",
        callbacks: [{
            event: "click",
            callback: onIncreaseOffset
        }],
        offset: 0,
        cache: "",
        range: {}
    }
};

// Root url. 
// API key. Get one from https://developers.giphy.com/docs/
const URL_ROOT = `${SECRETS.GIPHY_URL}api_key=${SECRETS.SECRET_KEY}`;

// Show the spinner when searching.
function onLoadingStart() {
    let spinner = ELEMENTS.spinner.element;
    spinner.classList.remove("hidden");
    spinner.classList.remove("visible");
    spinner.classList.add("visible");
}

// Hide the spinner once it is done loading.
function onLoadingEnd() {
    spinner.classList.remove("hidden");
    spinner.classList.remove("visible");
    spinner.classList.add("hidden");
}

// Called when a search url is constructed. Returns a promise.
function getData(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        // On loading the data, pass in the event and the response.
        xhr.onload = (e) => {
            resolve(e);
        }

        // On error, reject the promise.
        xhr.onerror = (e) => {
            reject(e, 'XMLHttpRequest failed.');
        };

        // Open the connection and send the request.
        xhr.open("GET", url);
        xhr.send();
    });
}

// Display JSON data.
function displayJSON(body, display) {

    // Response is assumed to be the XHR.responseText.
    let obj = JSON.parse(body);

    // If no results, throw an error. (It will be caught by the promise).
    if (!obj.data || obj.data.length == 0) {
        let errorMessage = `No results found for "${display}"`;
        ELEMENTS.status.element.innerHTML = `<b>${errorMessage}</b>`;
        throw new Error(errorMessage);
    }

    let results = obj.data;
    // console.log("results.length =", results.length);
    let content = `<p><i>Here are ${results.length} results for "${display}"</i> - (${ELEMENTS.findmore.range.start} to ${ELEMENTS.findmore.range.end})</p>`;
    content += `<div id="response">`;

    // Loop through the results.
    for (let i = 0; i < results.length; i++) {
        let result = results[i];

        let smallURL = results[i].images.fixed_width_small.url;
        if (!smallURL) {
            smallURL = "images/no-image-found.png";
        }

        let rating = results[i].rating.toUpperCase();

        let url = result.url;
        let line = `<div class="result"><img src="${smallURL}" title="${result.id}" /><span><a target="_blank" href="${url}" >View on Giphy</a></span><span class="rating">Rating: ${rating}</span></div>`;
        content += line;
    }
    content += `</div>`;

    ELEMENTS.results.element.innerHTML = content;
    ELEMENTS.status.element.innerHTML = `<b>Success!</b>`;
}

// Called to enable the find more button on the first search ever.
function enableFindMoreButton(e) {
    // Enable the find more button.
    ELEMENTS.findmore.element.disabled = false;
}

// Reset the offset, especially for new searches.
function resetOffsetValue() {
    ELEMENTS.findmore.offset = 0;
}

// Called on search enter.
function onSearchEnter(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        ELEMENTS.search.element.dispatchEvent(new Event("click"));
    }
}

// Called when the search button is clicked.
function onSearch(e) {
    // console.log(`Search button ${e.target} clicked.`);

    // Parse the search term.
    let term = ELEMENTS.searchterm.element.value;
    let display = term;

    // Update the cache.
    if (ELEMENTS.findmore.cache != term.trim().toLowerCase()) {
        resetOffsetValue();
        ELEMENTS.findmore.cache = term.trim().toLowerCase();
        // console.log("Reset offset value for new search term.", term);
    }

    term = encodeURIComponent(term.trim());

    // End, if there is no term.
    if (term.length < 1) {
        return;
    }

    // Get the search result limit.
    let limit = +ELEMENTS.searchlimit.element.value;

    // Create the search url.
    let url = `${URL_ROOT}&q=${term}&limit=${limit}&offset=${ELEMENTS.findmore.offset}`;

    // Calculate the range.
    ELEMENTS.findmore.range = {
        start: ELEMENTS.findmore.offset,
        end: ELEMENTS.findmore.offset + limit
    }

    // Update the UI.
    ELEMENTS.status.element.innerHTML = `<b>Searching for "${display}" - (${ELEMENTS.findmore.range.start} to ${ELEMENTS.findmore.range.end})</b>`;

    // Log the URL.
    // console.log(url);

    // Start loading.
    onLoadingStart();

    // Get the data.
    getData(url).then((e) => {

        // Get reference back to the XHR.
        let xhr = e.target;

        // Display JSON.
        displayJSON(xhr.responseText, display);

    }).catch((e, err) => {

        // Show errors, if any.
        // console.error(e, err);

    }).finally((result) => {
        onLoadingEnd();
    });
}

// Increase the offset by the current limit value.
function onIncreaseOffset(e) {
    let limit = +ELEMENTS.searchlimit.element.value;
    ELEMENTS.findmore.offset += limit;
    // console.dir(ELEMENTS.findmore.offset);
    onSearch(e);
}

// PREPARATION FUNCTIONS //

// Return object with selectors.
function prepareElements(elements) {
    Object.keys(elements).forEach((key) => {
        let entry = elements[key];
        let elem = document.querySelector(entry.selector);
        entry.element = elem;
        if (entry.callbacks && entry.callbacks.length > 0) {
            entry.callbacks.forEach((cb) => {
                entry.element.addEventListener(cb.event, cb.callback);
            });
        }
    });
    return elements;
}

// INITIALIZATION //

// Initialize the application.
function init() {
    prepareElements(ELEMENTS);
    // console.dir(ELEMENTS);
}

// Start on window load.
window.addEventListener('load', init);
