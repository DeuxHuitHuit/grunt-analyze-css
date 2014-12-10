/*global module*/
var md = module.require('matchdep');

module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		jshint: {
			files: ['gruntfile.js', 'tests/*.js', 'tasks/*.js'],
			//force: true,
			options: {
				bitwise: false,
				camelcase: false,
				curly: true,
				eqeqeq: false, // allow ==
				forin: true,
				//freeze: true,
				immed: false, //
				latedef: true, // late definition
				newcap: false, // capitalize ctos
				noempty: true,
				noarg: true,
				plusplus: false,
				quotmark: 'single',
				undef: true,
				maxparams: 5,
				maxdepth: 5,
				maxstatements: 30,
				maxlen: 100,
				maxcomplexity: 10,

				// env
				node: true,

				// relax options
				esnext: true,
				regexp: true,
				strict: true,
				trailing: false,
				sub: true, // [] notation
				smarttabs: true,
				lastsemic: false, // enforce semicolons
				white: true
			}
		}
	});

	md.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerTask('default', ['jshint']);
};