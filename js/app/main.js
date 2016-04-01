//import $ from 'jquery';
window.Vue = require('vue');
var VueRouter = require('vue-router');
Vue.use(VueRouter);
Vue.use(require('vue-resource'));
Vue.http.options.root = window.location.pathname+'api';
Vue.http.headers.common['requesttoken'] = $('head').attr('data-requesttoken');
Vue.config.debug = true;

var isMobile = require('ismobilejs')

var App = require('./app.vue');
var albums = require( './components/main-wrapper/main-content/albums.vue');
var albumSongs = require( './components/main-wrapper/main-content/album-list-songs.vue');
var artists = require( './components/main-wrapper/main-content/artists.vue');
var songs = require( './components/main-wrapper/main-content/songs.vue');
var settings = require( './components/main-wrapper/main-content/settings.vue');
var users = require( './components/main-wrapper/main-content/users.vue');
var queue = require( './components/main-wrapper/main-content/queue.vue');
var playlist = require( './components/main-wrapper/main-content/playlist.vue');
var favorites = require( './components/main-wrapper/main-content/favorites.vue');
var profile = require( './components/main-wrapper/main-content/profile.vue');

var preferenceStore = require('./stores/preference');

var router = new VueRouter();
router.map({
	'/': {
		component: queue
	},
	'/albums': {
		component: albums
	},
	'/album/:id': {
		name: 'album',
		component: albumSongs
	},
	'/artists': {
		component: artists
	},
	'/songs': {
		component: songs
	},
	'/favorites': {
		component: favorites
	},
	'/queue': {
		component: queue
	}
});

/* FIXME this doesn't work yet
router.beforeEach(function (transition) {
	if (isMobile.phone) {
		preferenceStore.state.showExtraPanel = false;
	}
});*/

// Exit light,
// Enter night,
// Take my hand,
// We're off to never never land.
//window.vueroot = new vue(require('./app.vue')).$mount('div#content');
var App = require('./app.vue');
router.start(App, 'div#content');
