"use strict";
/*
    Main.js - Ian Effendi
    Contains code for the palindrome HW assignment.
*/

// Import the palindrome class.
import {
    Palindrome
} from './palindrome.js';

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

// Palindrome object.
const parser = new Palindrome('');

// Prompt.
const inputPrompt = "Type your palindrome here...";
const focusPrompt = "You've lost focus by either clicking elsewhere or pressing the return key.";
const outputPrompt = "Type in a palindrome using the input box above.";

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

// Compare strings.
function compareStrings(lhs, rhs) {
    let l = lhs.trim().replace(/\s+/g, '').toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"]+/g, '');
    let r = rhs.trim().replace(/\s+/g, '').toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"]+/g, '');
    return l === r;
}

// Check if list already has item with content.
function isContentSaved(content) {
    for (let i = 0; i < el.palindromeList.childElementCount; i++) {
        if (compareStrings(`${el.palindromeList.children[i].innerHTML}`, `${content}`)) {
            setStatus(`Content '${content}' already exists in list.`);
            return true;
        }
    }
    return false;
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

// Set status message.
function setStatus(msg) {
    // Remove all classes.
    el.message.classList.remove('error');
    el.message.classList.remove('success');
    el.message.innerHTML = msg;
}

// Set success message.
function setSuccessStatus(msg) {
    // Set the message.
    setStatus(msg);
    // Add intended class.
    el.message.classList.add('success');
}

// Set error message.
function setErrorStatus(msg) {
    // Set the message.
    setStatus(msg);
    // Add intended class.
    el.message.classList.add('error');
}

// On successful palindrome entry.
function onSuccess() {
    el.input.classList.add('success');
    el.output.classList.add('success');
    setSuccessStatus("This is a palindrome!");
}

// On unsuccessful palindrome entry.
function onFailure() {
    el.input.classList.add('error');
    el.output.classList.add('error');
    setErrorStatus("This is not a palindrome!");
}

// Process palindrome input.
function processPalindrome(content) {
    // Get the palindrome information.
    parser.setInput(content);

    // Remove styling information.    
    el.input.classList.remove('success');
    el.input.classList.remove('success');
    el.output.classList.remove('error');
    el.output.classList.remove('error');

    // If it's a palindrome, apply the success class.
    if (parser.isPalindrome) {
        onSuccess(content);
    } else {
        onFailure(content);
    }
}

// Prepare events.
function prepareEvents() {

    // Setup input events. //

    el.input.addEventListener('input', (e) => {
        let text = el.input.value;
        text = (text === "") ? " " : text;
        el.output.innerHTML = text;
        processPalindrome(text);
    });

    // Setup change events. //

    el.input.addEventListener('change', (e) => {
        let text = el.input.value;
        if (text === "") {
            el.input.classList.remove("success");
            el.input.classList.remove("error");
            el.output.classList.remove("success");
            el.output.classList.remove("error");

            el.input.placeholder = el.input.placeholder || inputPrompt;
            el.output.innerHTML = focusPrompt;
            setStatus(outputPrompt);
        } else {
            el.output.innerHTML = text;
            processPalindrome(text);
        }
    });

    // Setup click events. //

    el.addToList.addEventListener('click', (e) => {
        // Check if the word in the input box is a palindrome.
        // console.log(`${e.target} - Adding text to list if it is a palindrome.`);
        let result = new Palindrome(el.input.value);
        if (result.isPalindrome && !isContentSaved(result.content)) {
            let item = createListItem(result.content);
            addItemToList(item);
            setSuccessStatus(`${result.content} has been saved!`);
        } else {
            if (!result.isPalindrome) {
                setErrorStatus(`'${result.content}' is not a palindrome!`);
            } else {
                setStatus(`${result.content} is already saved!`);
            }
        }
    });

    el.clearList.addEventListener('click', (e) => {
        setStatus(`Cleared the list.`);
        clearList();
    });

    // Fire input event once, after preparing events. //

    el.input.dispatchEvent(new Event("input"));
    el.clearList.dispatchEvent(new Event("click"));

    el.input.placeholder = inputPrompt;
    setStatus(outputPrompt);

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
