/*global module*/
module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		analyzecss: {
			files: [
				'empty.css',
				'bootstrap.css',
				'ie.css',
				'symphony.css'
			],
			prod: {
				options: {
					reportFile: 'report.json'
				}
			},
			options: {
				outputMetrics: 'error',
				outputDuplicateSelectors: true,
				thresholds: {
					
				}
			}
		}
	});
	
	grunt.loadTasks('../tasks');

	grunt.registerTask('default', ['analyzecss']);
};