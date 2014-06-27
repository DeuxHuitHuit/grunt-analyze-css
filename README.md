# grunt-contrib-analyze-css  - v0.1.0

> Grunt task that analyze your css with [analyze-css](https://github.com/macbre/analyze-css) 
and compare the results to a user-defined benchmark.

This plugin requires Grunt ^0.4.0

## Installation

`npm i grunt-contrib-analyze-css --save-dev`

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
            thresholds: {
                
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
issue an errror.

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
ouput to set a cap on output by usign 'warn' or 'error'.

Possible values:
> true, false, 'warn', 'error'

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
the [defaults in the source code](https://github.com/DeuxHuitHuit/grunt-contrib-analyze-css/blob/master/tasks/analyze-css.js#L20).
      
## Credits

Made with love in Montréal by <http://deuxhuithuit.com>

Licensed under the MIT License: <http://deuxhuithuit.mit-license.org>

