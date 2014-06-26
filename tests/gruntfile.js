/*global module*/
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        analyzecss: {
            prod: {
                sources: ['bootstrap.css']
            },
            options: {
                thresholds: {
                    
                }  
            }
        }
    });
    
    grunt.loadTasks('../tasks');

    grunt.registerTask('default', ['analyzecss']);
};