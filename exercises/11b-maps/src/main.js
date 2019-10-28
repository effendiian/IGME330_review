"use strict";

// Import.
import {
    default as SECRETS
}
from './_secret.js';

import {
    MarkerData
}
from './marker.js';

var map;

// Create an infoWindow scoped variable.
window.infoWindow = undefined;

// Add init map function to the window scope.
window.initMap = function () {

    // Create the map options object.
    let mapOptions = {
        center: {
            lat: 43.083848,
            lng: -77.6799
        },
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Get the map.
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    map.mapTypeId = "satellite";
    map.setTilt(45);

    // Add markers.   
    coffeeShops.forEach((item) => {
        addMarker(item.latitude, item.longitude, item.title);
    });

    // Add polygons.
    buildings.forEach((item) => {
        drawPolygon(item.latitude, item.longitude, item.title, item.path)
    });
}

// Info window.
function createInfoWindow(position, message) {
    if (window.infoWindow) {
        window.infoWindow.close();
    }

    window.infoWindow = new google.maps.InfoWindow({
        map: map,
        position: position,
        content: `<b>${message}</b>`
    });
}

// Add marker.
function addMarker(latitude, longitude, title) {
    let data = new MarkerData(title, latitude, longitude);
    let marker = new google.maps.Marker({
        position: data.position,
        map: map
    });
    marker.setTitle(data.title);
    google.maps.event.addListener(marker, 'click', function (e) {
        createInfoWindow(this.position, this.title);
    });
}

// Draw the polygons.
function drawPolygon(latitude, longitude, title, paths) {
    let polygon = new google.maps.Polygon({
        paths: paths,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
    });
    polygon.position = {
        lat: latitude,
        lng: longitude
    }
    polygon.setMap(map);
    google.maps.event.addListener(polygon, 'click', function (e) {
        createInfoWindow(this.position, this.title);
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

    // Set zoom buttons.
    document.querySelector("#worldZoomButton").onclick = () => {
        map.setZoom(1);
    };
    document.querySelector("#defaultZoomButton").onclick = () => {
        map.setZoom(16);
    };
    document.querySelector("#buildingZoomButton").onclick = () => {
        map.setZoom(20);
    };
    document.querySelector("#isometricZoomButton").onclick = () => {
        map.setZoom(18);
    };

}

// Init on load
window.addEventListener("load", init);
