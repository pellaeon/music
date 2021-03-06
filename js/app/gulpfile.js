require('events').EventEmitter.defaultMaxListeners = 30;

var elixir = require('laravel-elixir');
require('laravel-elixir-vueify');
require('babel-preset-es2015');

elixir.config.publicPath = '../public';
elixir.config.assetsPath = '';
elixir.config.js.folder = '';
elixir.config.js.outputFolder = '';
elixir.config.js.browserify.options.debug = true;
elixir.config.css.folder = '';
elixir.config.css.outputFolder = '../../css';
elixir(function (mix) {
    mix.browserify('main.js');
	mix.copy('vendor/fontawesome/fonts', '../../fonts');
	mix.styles([
			'vendor/fontawesome/css/font-awesome.min.css',
			'vendor/plyr/dist/plyr.css'
	], '../../css/vendor.css');
});
