/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  compassOptions: {
    outputStyle: 'expanded',
    relativeAssets: false,
    imagesDir: 'assets/images',
    fontsDir: 'assets/fonts',
    appDir: 'public',
    sassDir: '../app/styles'
  }
});

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.
app.import('bower_components/momentjs/moment.js');
app.import('bower_components/simmetrix-smithwaterman/lib/simmetrix.smithwaterman.js');
app.import('bower_components/simmetrix-qgram/lib/simmetrix.qgram.js');

app.import('bower_components/bootstrap/dist/js/bootstrap.js');
app.import('bower_components/bootstrap/dist/css/bootstrap.css');

module.exports = app.toTree();
