/*jshint undef:false */

// Karma configuration
module.exports = function(config) {

  config.set({

    // Base path that will be used to resolve files and exclude.
    basePath : '',

    // Testing framework to be used, default is `jasmine`.
    frameworks : [
      'mocha'
    ],


    // List of files / patterns to load in the browser.
    files : [
      'app/bower_components/jquery/dist/jquery.min.js',
      'app/bower_components/handlebars/handlebars.runtime.js',
      'app/bower_components/ember/ember.js',
      'app/bower_components/ember-data-shim/ember-data.js',

      'app/bower_components/simmetrix-levenshtein/lib/simmetrix.levenshtein.js',
      'app/bower_components/simmetrix-longestsubstring/lib/simmetrix.longestsubstring.js',
      'app/bower_components/simmetrix-qgram/lib/simmetrix.qgram.js',
      'app/bower_components/simmetrix-smithwaterman/lib/simmetrix.smithwaterman.js',
      'app/bower_components/momentjs/moment.js',
      
      'test/bower_components/chai/chai.js',
      'app/bower_components/ember-mocha-adapter/adapter.js',
      
      '.tmp/scripts/combined-scripts.js',
      '.tmp/scripts/compiled-templates.js',
      'test/support/*.js',
      'test/spec/*.js',
      'test/integration/*.js'
    ],


    // List of files to exclude.
    exclude : [],


    // Test results reporter to use.
    // Possible values: 'dots', 'progress', 'junit'
    reporters : ['progress'],


    // Web server port.
    port : 9876,


    // Cli runner port.
    runnerPort : 9100,


    // Enable / disable colors in the output (reporters and logs).
    colors : true,


    // Level of logging. Possible values are:
    //
    // * LOG_DISABLE
    // * LOG_ERROR
    // * LOG_WARN
    // * LOG_INFO
    // * LOG_DEBUG
    logLevel : config.LOG_INFO,


    // Enable / disable watching files and executing tests whenever any of them
    // changes.
    autoWatch : true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers : ['Chrome'],


    // If the browser does not capture in the given timeout [ms], then kill it.
    captureTimeout : 60000,


    // Continuous Integration mode.
    // If it's `true`, then it captures browsers, runs the tests and exits.
    singleRun : false

  });

};
