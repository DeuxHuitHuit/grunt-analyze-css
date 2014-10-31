/*global module*/
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        analyzecss: {
            prod: {
                sources: [
                    'tests/empty.css',
                    'tests/bootstrap.css',
                    'tests/ie.css',
                    'tests/symphony.css'
                ]
            },
            options: {
                outputMetrics: 'error',
                softFail: true,
                showDuplicateSelectors: true,
                thresholds: {

                }
            }
        }
    });

    grunt.loadTasks('tasks');

    grunt.registerTask('default', ['analyzecss']);
};
