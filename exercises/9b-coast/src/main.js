"use strict";
/*
    Main.js - Ian Effendi
    Simple lost coast name generator.
*/

const GENERATE_COUNT = {
    min: 10,
    max: 25,
    get: function (count = undefined) {
        if (count == null) {
            return this.min + (Math.random() * (this.max - this.min));
        } else {
            return (typeof count === "number") ? count : this.get(null);
        }
    }
}

function init(e) {
    document.querySelector("#min").innerHTML = GENERATE_COUNT.min;
    document.querySelector("#max").innerHTML = GENERATE_COUNT.max;
    prepareGrammar();
}

function prepareList(coastArray) {
    // Clear children.
    let list = document.querySelector("ul");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    // Fill children.    
    coastArray.forEach((coast) => {
        let listItem = prepareListItem(coast);
        list.appendChild(listItem);
    });
}

function prepareListItem(coast) {
    let listItem = document.createElement("li");
    listItem.classList.add("list-item");
    listItem.innerHTML = coast;
    return listItem;
}

function prepareGrammar() {
    let grammar = new RiGrammar();
    grammar.loadFrom("./src/grammar.json", (json) => {

        let button = document.querySelector('#expand');
        button.onclick = (e) => {

            let coasts = [];
            for (let i = 0; i < GENERATE_COUNT.get(); i++) {

                let story = grammar.expand();
                let terms = story.split(" ");
                let result = [];
                terms.forEach((term) => {
                    let word = new RiString(term.toLowerCase());
                    let firstLetter = word.charAt(0).toUpperCase();
                    word.replaceChar(0, firstLetter);
                    result.push(word.text());
                });
                coasts.push(result.join(" "));

            }

            prepareList(coasts);

        };

    });
}

window.addEventListener('load', init);
