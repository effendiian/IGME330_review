"use strict";
/*
    Entry point for the Vue application.
*/

import {
    initComponents
} from './vue-components.js';

initComponents();

const app = new Vue({
    el: '#app',
    data: {
        title: "Random Joke Machine",
        question: "",
        answer: "",
        copyrightYear: "2019",
        copyrightName: "Ian Effendi"
    },
    created: function () {
        this.search()
    },
    methods: {
        search() {
            //if (! this.term.trim()) return;
            fetch("https://igm.rit.edu/~acjvks/courses/2018-fall/330/php/get-a-joke.php")
                .then(response => {
                    if (!response.ok) {
                        throw Error(`ERROR: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(json => {
                    console.log(json);
                    this.question = json.q;
                    this.answer = json.a;
                })
        } // end search
    } // end methods
});
