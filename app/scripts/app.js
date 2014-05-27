// Ember.LOG_BINDINGS = true;

var Mediator = window.Mediator = Ember.Application.create({
    LOG_TRANSITIONS: true
});

Mediator.constants = Ember.Object.create({
     _CONST_LEVENSHTEIN_RATIO : 0.7,
     _CONST_LEVENSHTEIN_RATIO_SECOND_CHANCE : 0.36,
     _CONST_QGRAM_RATIO : 0.61,
     _CONST_QGRAM_LEVEL1_RATIO : 0.5,
    _RESULT_CATEGORY_SPLITTER: ',',
});

/* Order and include as you please. */
require('scripts/adapters/*');
require('scripts/components/*');
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/helpers/*');
require('scripts/router');
