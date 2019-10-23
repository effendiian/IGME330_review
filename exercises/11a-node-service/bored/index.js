#!/usr/bin/env node

const request = require("request");

let URL_ROOT = "https://www.boredapi.com/api/activity";

let DEFAULT_PARAMS = {
    participants: process.argv[2] || 1
};

// Construct the URL.
function getURL(root, params) {
    let url = root + "?";
    Object.keys(params).forEach((key) => {
        url += `${key}=${params[key]}`;
    });
    return url;
}

// Constructed url.
let url = getURL(URL_ROOT, DEFAULT_PARAMS);

// Request method.
request(url, (err, response, body) => {
    if (!err && response.statusCode == 200) {
        // Parse the JSON data.
        let obj = JSON.parse(body);

        // Get the activity property.
        let result = {
            activity: obj.activity,
            type: obj.type,
            participants: obj.participants
        }

        // Display the text.
        let display = "------------ Are You Bored? ------------"
        display += `\n"${result.activity}"`;
        display += `\nType: ${result.type}`;
        display += `\nThis activity is perfect for ${result.participants} participant(s).`;
        display += "\n---------------------------------------";

        // Log out the text.
        console.log(display);
    }
});
