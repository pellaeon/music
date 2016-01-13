require('events').EventEmitter.defaultMaxListeners = 30;

var elixir = require('laravel-elixir');
require('laravel-elixir-vueify');
require('babel-preset-es2015');

elixir.config.publicPath = '../public';
elixir.config.assetsPath = '';
elixir.config.js.folder = '';
elixir.config.js.outputFolder = '';
elixir(function (mix) {
    mix.browserify('main.js');
});
