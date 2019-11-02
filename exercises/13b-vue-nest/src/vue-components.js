"use strict";

const Components = {

    // Table row component.
    "friend-list-row": {
        props: ['name', 'index'],
        template: `<tr>` +
            `\n\t<td>{{ index + 1}}</td>` +
            `\n\t<td v-text="name"></td>` +
            `\n</tr>`,
    },

    "friend-list": {
        props: ['names', 'title'],
        template: `<div>` +
            `\n\t<h2>{{ title }}</h2>` +
            `\n\t<table class="pure-table-striped">` +
            `\n\t\t<thead><th>Guest #</th><th>Guest Name</th></thead>` +
            `\n\t\t<tr is="friend-list-row" v-for="(name,index) in names" v-bind:name="name" v-bind:index="index" v-bind:key="index"></tr>` +
            `\n\t</table>` +
            `\n</div>`,
    },

}

// Export initialize component function.
export function init() {

    // For each component described in the Components object,
    // create a Vue component out of it.
    Object.keys(Components).forEach((key) => {

        let component = Components[key];
        Vue.component(key, {
            props: component.props ? component.props : undefined,
            template: component.template
        });

    });

};
