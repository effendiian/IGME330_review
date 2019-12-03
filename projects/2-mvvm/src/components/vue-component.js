"use strict";
/*
    VUE-COMPONENT.js
    Wrapper for vue component initialization functionality.
*/

// VueComponent class used to
export default class VueComponent {
    // Construct component.
    constructor(selector, props, content, data) {
        this.tag = selector;
        this.props = props;
        this.template = content;
        this.data = data;
    }

    // Initialize the component.
    init() {
        Vue.component(this.tag, {
            props: this.props,
            template: this.template,
            data: this.data
        });
    }
}
