"use strict";

// poke-api.js
// Obtains information from the PokeAPI.
// https://pokeapi.co/docs/v2.html

// Import functions.
import Config from './../config/config.js';

// Get reference to the root URL.
const URL_ROOT = Config.POKE_API.URL_ROOT;

// Get URL from input pokemon.
function getURL(pokemon) {
  return new Promise((resolve, reject) => {
    
    // Trim the pokemon.
    let keyword = (pokemon) ? pokemon.trim() : "";    
    
    // Validate keyword is non-null.
    if(keyword == null) {
      reject("Search term for Pokemon is null.");
      return;
    }
    
    // Encode the name for the URL.
    let term = encodeURIComponent(keyword);
    
    // End, if there is no term.
    if(term.length < 1){
      reject("Search term for Pokemon is null.");
      return;
    }
    
    // Create the search URL.
    let url = `${URL_ROOT}${term}`;
    resolve(url);
    return;
  });
}

// Search API for pokemon.
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
  getURL,
  getData
}

