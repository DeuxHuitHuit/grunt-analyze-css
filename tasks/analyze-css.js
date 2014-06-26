
var fs = require('fs');
var path = require('path');
var async = require('async');

module.exports = function (grunt) {
  'use strict';
  
  var defaults = {
      
  };
  
  grunt.registerMultiTask('analyzecss', 'Analyze your css', function() {
      var done = this.async();
      
    var analyzer = require( 'analyze-css');
    console.log('!');
    var options = this.options(defaults);
    var sources = this.data.sources;
    console.dir(this);
    console.dir(options);
    if (!sources || sources.length < 1) {
      grunt.log.warn('Did not analyze anything because no source files were provided.');
      return;
    }
    console.dir(sources);
    console.dir(async);
    
    var end = function () {
        grunt.log.ok('Done.');
    };
    
    async.eachSeries(sources, function(file, nextFileObj) {
        console.log('reading ', file);
        fs.readFile(file, 'utf-8', function (err, css) {
            if (err) {
                grunt.log.error(err.message);
                nextFileObj();
                return;
            }
           new analyzer(css, {}, function(err, results) {
               if (err) {
                   grunt.log.error(err.message);
                nextFileObj();
                return;
               }
               console.dir(results);
               nextFileObj();
           });
        });
    }, end, done);
});
};