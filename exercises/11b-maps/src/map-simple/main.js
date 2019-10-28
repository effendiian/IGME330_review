"use strict";

// Import.
import {
    default as SECRETS
}
from './../_secret.js';

var map;

// Add init map function to the window scope.
window.initMap = function () {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 8
    });
}

// Add the secret API key.
function addSecretAPIKey() {
    let tag = document.createElement('script');
    tag.src = `${SECRETS.URL_ROOT}?key=${SECRETS.API_KEY}&callback=initMap`;
    tag.async = true;
    tag.defer = true;

    let map = document.querySelector('#map');
    map.parentNode.insertBefore(tag, map.nextSibling);
    // "<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" async defer></script>";
}

// Initialize by adding the secret API key.
function init() {
    addSecretAPIKey();
}

// Init on load
window.addEventListener("load", init);
