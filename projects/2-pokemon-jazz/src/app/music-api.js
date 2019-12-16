"use strict";

// music-api.js
// Obtains information from the Binary Jazz api.
// https://binaryjazz.us/genrenator-api/

// Import functions.
import Config from './../config/config.js';

// Get reference to the root URL.
const URL_ROOT = Config.BINARY_JAZZ.URL_ROOT;
const ENDPOINTS = {
  GENRE: Config.BINARY_JAZZ.ENDPOINTS.GENRE,
  STORY: Config.BINARY_JAZZ.ENDPOINTS.STORY
}

// Get URL for genre and return payload.
function getGenre() {     
  // Create the URL.
  let url = `${URL_ROOT}${ENDPOINTS.GENRE}`;
    
  // Return promise.
  return getData(url);
}

// Search API for music.
function getData(url) {
  return new Promise((resolve, reject) => {    
    // Check if url is valid.
    if(!url || url.length < 1) {
      reject("URL is incomplete.");
      return;
    }

    // Prepare XHR.
    const xhr = new XMLHttpRequest();

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

export default {
  getGenre
}

