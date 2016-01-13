/**
 * ownCloud - Music app
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Morris Jobke <hey@morrisjobke.de>
 * @copyright Morris Jobke 2013, 2014
 */

module.exports = function(grunt) {

	// load needed modules
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-wrap');
	grunt.loadNpmTasks('grunt-angular-gettext');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-sass');


	grunt.initConfig({

		meta: {
			pkg: grunt.file.readJSON('package.json'),
			version: '<%= meta.pkg.version %>',
			production: '../js/public/'
		},

		concat: {
			options: {
				// remove license headers
				stripBanners: true
			},
			dist: {
				src: [
					'../js/config/app.js',
					'../js/app/**/*.js',
					'../js/l10n/*.js'
				],
				dest: '<%= meta.production %>app.js'
			}
		},

		wrap: {
			app: {
				src: ['<%= meta.production %>app.js'],
				dest: '',
				wrapper: [
					'(function(angular, $, oc_requesttoken, undefined){\n\n\'use strict\';\n\n',
					'\n})(angular, jQuery, oc_requesttoken);'
				]
			}
		},

		jshint: {
			files: [
				'Gruntfile.js',
				'../js/app/**/*.js',
				'../js/config/*.js',
				'../js/l10n/*.js',
				'../tests/js/unit/**/*.js',
				'../js/public/**/*.js'
			],
			exclude: [
				'../js/public/app.js'
			],
			options: {
				// options here to override JSHint defaults
				globals: {
					console: true,
					sub: true
				}
			}
		},

		watch: {
			// this watches for changes in the app directory and runs the concat
			// and wrap tasks if something changed
			concat: {
				files: [
					'../js/app/**/*.js',
					'../js/config/*.js',
					'../js/l10n/*.js'
				],
				tasks: ['build']
			},
		},

		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'../css/app.css': '../sass/app.scss' 
				}
			}
		},

		browserify: {
			dist: {
				options: {
					transform: ['browserify-shim', 'vueify'],
					paths: ['./']
				},
				files: {
					'../js/public/app.js': '../js/app/main.js'
				}
			}
		},

		nggettext_extract: {
			pot: {
				files: {
					'../l10n/templates/music.pot': ['../templates/*.php', '../js/public/app.js']
				}
			},
		},

		nggettext_compile: {
			all: {
				options: {
					module: 'Music'
				},
				files: {
					'../js/l10n/translations.js': ['../l10n/**/music.po']
				}
			},
		}

	});

	// make tasks available under simpler commands
	grunt.registerTask('build', ['jshint', 'sass', 'browserify']);

};
