"use strict";
/*
    CONFIG.js
    Configuration information for application.
*/

import {
    default as SECRETS
} from './_secret.js';

export default {
    FIREBASE: {
        API_KEY: SECRETS.FIREBASE.API_KEY,
        AUTH_DOMAIN: "igme330-pokemonpoetry.firebaseapp.com/",
        DATABASE_URL: "https://igme330-pokemonpoetry.firebaseio.com/",
        PROJECT_ID: "igme330-pokemonpoetry",
        STORAGE_BUCKET: "igme330-pokemonpoetry.appspot.com",
        SENDER_ID: SECRETS.FIREBASE.SENDER_ID,
        APP_ID: SECRETS.FIREBASE.APP_ID,
    },
    UNSPLASH: {
        URL_ROOT: "https://api.unsplash.com/",
        ACCESS_KEY: SECRETS.UNSPLASH.ACCESS_KEY,
        SECRET_KEY: SECRETS.UNSPLASH.SECRET_KEY,
    }
};
