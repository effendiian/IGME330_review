"use strict";
/*
    V-HEADER.js
    Component template for the header.
*/

import {
    default as VueComponent
} from './vue-component.js';

const template = `<h1>{{ title }}</h1>`;
const component = new VueComponent(
    "v-header",
    ['title'],
    template
);

export default component;
