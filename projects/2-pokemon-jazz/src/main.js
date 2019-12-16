"use strict";

// main.js
// Entry point for Vue application.

import Vue from 'vue';
import VueMaterial from 'vue-material';
import Vuelidate from 'vuelidate';
// import { MdButton, MdContent, MdIcon, MdDivider } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default-dark.css';
import App from './App.vue';

// Vue.use(MdButton);
// Vue.use(MdContent);
// Vue.use(MdDivider);
// Vue.use(MdIcon);
Vue.use(Vuelidate);
Vue.use(VueMaterial);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')

// $mount allows us to explicitly mount the application when we want to. It serves us the same purpose as the 'el' property.
