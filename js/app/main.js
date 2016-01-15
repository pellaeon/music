//import $ from 'jquery';
window.Vue = require('vue');
Vue.use(require('vue-resource'));
Vue.http.options.root = window.location.pathname+'api';
Vue.http.headers.common['requesttoken'] = $('head').attr('data-requesttoken');
Vue.config.debug = true;

var App = require('./app.vue');

// Exit light,
// Enter night,
// Take my hand,
// We're off to never never land.
new Vue(require('./app.vue')).$mount('div#content');
