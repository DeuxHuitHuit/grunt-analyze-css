# grunt-analyze-css - v1.0.x [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) [![npm version](https://badge.fury.io/js/grunt-analyze-css.svg)](http://badge.fury.io/js/grunt-analyze-css) [![David DM](https://david-dm.org/DeuxHuitHuit/grunt-analyze-css.svg?style=flat)](https://david-dm.org/DeuxHuitHuit/grunt-analyze-css#info=dependencies) [![David DM](https://david-dm.org/DeuxHuitHuit/grunt-analyze-css/dev-status.svg?style=flat)](https://david-dm.org/DeuxHuitHuit/grunt-analyze-css#info=devDependencies)

> Grunt task that analyze your css with [analyze-css](https://github.com/macbre/analyze-css) 
and compare the results to a user-defined benchmark.

This plugin requires Grunt ^0.4.5

## Installation

`npm i grunt-analyze-css --save-dev`

## Analyze css task

*Run this task with the `grunt analyzecss` command.*

### Example

````javascript
grunt.initConfig({
    analyzecss: {
        prod: {
            sources: ['stylesheet.css']
        },
        options: {
            outputMetrics: 'error',
            analyzecss: {
                // analyzecss specific options
            }
            thresholds: {
                // custom thresholds values
            }
        }
    }
});
````

## Options

These are the possible config values. The format is `optionName: 'defaultValue'`.

### encoding: 'utf-8'

Defines the encoding when reading css files.

Possible values:
> All supported values for `fs.readFile` can be used

### analyzecss: {}

The analyzecss options. This object is directly passed on to analyzecss api.

Possible values:
> See [analyze-css](https://github.com/macbre/analyze-css) readme file.

### warn: 0.95

The score at which warning begins. Any metric that is below this mark will
issue a warning.

Possible values:
> 0...1

### error: 0.8

The score at which errors are thrown. Any metric that is below this mark will
issue an error.

Possible values:
> 0...1

### padLimit: 40

The length for default string padding in the results

Possible values:
> Integer

### outputMetrics: false

This options controls if and how metrics are shown to the screen.
By default only the global score of each css document is shown.
If set to true, ever metric score will show up. You can limit the
output to set a cap on output by using 'warn' or 'error'.

Possible values:
> true, false, 'warn', 'error'

### outputDuplicateSelectors: false

This options will output duplicated selectors in stdout.

Possible values:
> true, false

### softFail: false

Prevents the grunt task to be halted if this task failed.

Possible values:
> true, false

### thresholds: { ... }

This object should contains all the maximum values allowed for each metric.
The results of your css files will be compared to those maximum values
and issue warning and errors if they surpass warn/error levels.

**If you want to ignore certain metric, be sure to set them to null**

Possible values:
> See [analyze-css](https://github.com/macbre/analyze-css) readme file or 
the [defaults in the source code](https://github.com/DeuxHuitHuit/grunt-analyze-css/blob/master/tasks/analyze-css.js#L20).

### reportFile: false

Enables writing the report to a file. In the case of a `string`, it will be
used as a file path where the report is written in the format given in `options.reportFormat`.

Possible values:
> false | string

### reportFormat: 'json'

Determines the format of the `options.reportFile`.

JSON will be pretty printed, with two character indentation.

Possible values:
> 'json' | 'text'

## Credits

Made with love in Montréal by <http://deuxhuithuit.com>

Licensed under the MIT License: <http://deuxhuithuit.mit-license.org>

