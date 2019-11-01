"use strict";
/*
    Contains configuration settings.
*/

// Import the api key from "_secret.js".
import {
    default as SECRETS
} from './_secret.js';

// All settings exported by configuration module.
export default {
    TITLE: "Bitcoin API Example (with Vue)",
    SERVICE: "CoinMarketCap",
    ENDPOINT: "coinmarketcap.com/api",
    API_KEY: SECRETS.API_KEY,
    URL_ROOT: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
    DEBUG_MODE: true
};
