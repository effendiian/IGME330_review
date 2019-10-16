"use strict";
/*
    Main.js - Ian Effendi
    Contains code for the palindrome HW assignment.
*/

// Reference to classes we will add/remove.
const classes = {
    ERROR: 'error',
    SUCCESS: 'success'
};

// Object containing reference to all of the interaction elements we need.
const selectors = {
    input: 'input#input',
    output: 'p#output',
    message: 'p#message',
    addToList: 'button#addToList',
    clearList: 'button#clearList',
    palindromeList: 'ul#palindrome-list'
};

// Elements to use on the DOM.
const el = {};

// Wrapper for document.querySelector.
function loadElement(key) {
    el[key] = document.querySelector(selectors[key]);
}

// Gets all elements we'll need and places them in the elements object.
function loadElements() {
    loadElement('input');
    loadElement('output');
    loadElement('message');
    loadElement('addToList');
    loadElement('clearList');
    loadElement('palindromeList');
}

// Create new list item.
function createListItem(content) {

    // Create the list item.
    let item = document.createElement('li');

    // Add class to it.
    item.classList.add('list-item');

    // Add text node content to it.
    item.appendChild(document.createTextNode(content));

    // Return the list item.
    return item;

}

// Add item to the list.
function addItemToList(item) {

    // Add it to the list.
    el.palindromeList.appendChild(item);

}

// Clear the palindrome list.
function clearList() {
    while (el.palindromeList.firstChild) {
        el.palindromeList.removeChild(el.palindromeList.firstChild);
    }
}

// Prepare events.
function prepareEvents() {

    // Setup input events.
    el.input.addEventListener('input', (e) => {});

    // Setup change events.
    el.input.addEventListener('change', (e) => {});

    // Setup click events.
    el.addToList.addEventListener('click', (e) => {});
    el.clearList.addEventListener('click', (e) => {
        console.log(`${e.target} - Cleared list.`);
        clearList();
    });

    // Fire input event once, after preparing events.
    el.input.dispatchEvent(new Event("input"));

}

// The initialization function.
function init() {

    // Load all the elements.
    loadElements();

    // Prepare events.
    prepareEvents();

}

// Schedule the code to execute when the window loads.
window.addEventListener('load', init);
