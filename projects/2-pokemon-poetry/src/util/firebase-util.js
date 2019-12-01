"use strict";
/*
    FIREBASE-UTIL.js
    Utilities for firebase.
*/

import {
    default as CONFIG
} from './../config/_config.js';

// Export properly wrapped configuration object.
const firebaseConfig = {
    apiKey: CONFIG.FIREBASE.API_KEY,
    authDomain: CONFIG.FIREBASE.AUTH_DOMAIN,
    databaseURL: CONFIG.FIREBASE.DATABASE_URL,
    projectId: CONFIG.FIREBASE.PROJECT_ID,
    storageBucket: CONFIG.FIREBASE.STORAGE_BUCKET,
    messagingSenderId: CONFIG.FIREBASE.SENDER_ID,
    appId: CONFIG.FIREBASE.APP_ID,
};

// Initialize the firebase application.
export const initialize = function () {
    firebase.initialize(firebaseConfig);
};
