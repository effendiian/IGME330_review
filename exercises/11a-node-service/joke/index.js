const request = require('request');

let url = 'https://geek-jokes.sameerkumar.website/api';

request(url, (err, response, body) => {
    if (!err && response.statusCode == 200) {
        console.log(body);
    }
});
