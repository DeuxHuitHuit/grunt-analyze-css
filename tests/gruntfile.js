/*global module*/
module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		analyzecss: {
			prod: {
				sources: [
					'empty.css',
					'bootstrap.css',
					'ie.css',
					'symphony.css'
				]
			},
			options: {
				outputMetrics: 'error',
				thresholds: {
					
				}
			}
		}
	});
	
	grunt.loadTasks('../tasks');

	grunt.registerTask('default', ['analyzecss']);
};