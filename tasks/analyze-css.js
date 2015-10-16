/*
 * grunt-analyze-css
 * https://github.com/DeuxHuitHuit/grunt-analyze-css
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 Deux Huit Huit, contributors
 * Licensed under the MIT license.
 * http://deuxhuithuit.mit-license.org
 */

var fs = require('fs');
var path = require('path');
var async = require('async');
var _ = require('lodash');
var chalk = require('chalk');

module.exports = function (grunt) {
	'use strict';
	
	var defaults = {
		encoding: 'utf-8', // encoding to read files
		analyzecss: {}, // analyze-css options
		warn: 0.95,
		error: 0.8,
		padLimit: 40,
		outputMetrics: false, // can be 'warn' or 'error'
		outputDuplicateSelectors: false,
		softFail: false,
		thresholds: { // all values are maximum values
			redundantBodySelectors: 0,
			comments: 1,
			commentsLength: 300,
			complexSelectors: 100,
			complexSelectorsByAttribute: 10,
			duplicatedSelectors: 7,
			emptyRules: 0,
			expressions: 0,
			oldIEFixes: 0,
			importants: 0,
			mediaQueries: 40,
			oldPropertyPrefixes: 0,
			qualifiedSelectors: 200,
			specificityIdAvg: null,
			specificityIdTotal: null,
			specificityClassAvg: null,
			specificityClassTotal: null,
			specificityTagAvg: null,
			specificityTagTotal: null,
			selectorsByAttribute: 200,
			selectorsByClass: null,
			selectorsById: 30,
			selectorsByPseudo: null,
			selectorsByTag: 50,
			universalSelectors: 1,
			length: 40000, // 40k
			rules: 600,
			selectors: 2000,
			declarations: 2000
		},
		reportFile: false,
		reportFormat: 'json'
	};
	
	grunt.registerMultiTask('analyzecss', 'Analyze your css', function() {
		var done = this.async();
		var analyzer = require( 'analyze-css');
		var options = this.options(defaults);
		var sources = this.filesSrc;
		var hasErrors = false;
		var resultCollection = {};

		// fix thresholds
		options.thresholds = options.thresholds || {};
		_.defaults(options.thresholds, defaults.thresholds);
		
		if (!sources || sources.length < 1) {
			grunt.log.warn('Did not analyze anything because no source files were provided.');
			return;
		}
		
		var pad = function (s, limit, right) {
			if (s === undefined) {
					s = '';
			}
			limit = limit || options.padLimit;
			for (var x = s.length || 0; x < limit; x++) {
					s = !right ? (s + '.') : (' ' + s);
			}
			return s;
		};
		
		var end = function () {
			if (options.reportFile) {
				grunt.file.write(options.reportFile, JSON.stringify(resultCollection, null, '  '));
			}
			grunt.log.writeln();
			if (hasErrors) {
					grunt[options.softFail ? 'log' : 'fail'].warn('Done, with errors.');
			} else {
					grunt.log.ok('Done.'); 
			}
			grunt.log.writeln();
			done();
		};
		
		var getChalks = function (value) {
			var color = 'green';
			if (value < options.error) {
				color = 'red';
			} else if (value < options.warn) {
				color = 'yellow';
			}
			return {
				font: chalk[color],
				bg: chalk['bg' + (color.charAt(0).toUpperCase() + color.slice(1))]
			};
		};
		
		var analyzeResults = function (file, results) {
			var stats = {};
			var metrics = results.metrics;
			var count = 0;
			
			_.forOwn(options.thresholds, function (limit, name) {
				if (limit !== null && limit !== undefined) {
					var value = metrics[name];
					if (value === undefined) {
						grunt.verbose.warn('Metric ' + name + ' was not found');
					} else {
						count++;
						stats[name] = {
							result: value,
							ratio: Math.min(1, limit === value || value === 0 ? 1 : limit / value)
						};
					}
				}
			});
			
			var avg = _.reduce(stats, function (sum, stat, key) {
					return sum + stat.ratio;
			}, 0) / count;
			
			// error
			hasErrors = hasErrors || avg < options.error;
			
			var chalks = getChalks(avg);
			
			grunt.log.writeln(chalks.font(pad(file)) + chalks.bg(pad(avg.toFixed(2), 8, true)));
			
			if (options.outputMetrics) {
				_.forOwn(stats, function (stat, name) {
					if (options.outputMetrics === 'warn' || options.outputMetrics === 'error') {
						if (options[options.outputMetrics] <= stat.ratio) {
							return;
						}
					}
					var chalks = getChalks(stat.ratio);
					grunt.log.writeln(
						chalks.font(pad('  ' + name)) + 
						chalks.bg(pad(stat.ratio.toFixed(2), 8, true)) +
						'  ' + stat.result + ' / ' + options.thresholds[name]
					);
				});
				grunt.log.writeln();
			}
			if (options.outputDuplicateSelectors && !!results.offenders.duplicatedSelectors) {
				count = results.offenders.duplicatedSelectors.length;
				grunt.log.writeln('Found ' + count + ' duplicate selectors in ' + file);
				_.forEach(results.offenders.duplicatedSelectors, function (sel) {
					grunt.log.writeln(chalk.red(sel.message));
				});
				grunt.log.writeln();
			}
		};
		
		grunt.log.writeln();
		
		async.eachSeries(sources, function (file, nextFileObj) {
			fs.readFile(file, defaults.encoding, function (err, css) {
				if (err) {
					grunt.log.error(err.message);
					nextFileObj();
					return;
				}
				new analyzer(css, defaults.analyzecss, function (err, results) {
					if (err) {
						grunt.log.error(err.message);
						nextFileObj();
						return;
					}
					resultCollection[file] = results;
					analyzeResults(file, results);
					nextFileObj();
				});
			});
		}, end);
	});
};