var Mediator = window.Mediator = Ember.Application.create();

Mediator.constants = Ember.Object.create({
     _CONST_LEVENSHTEIN_RATIO : 0.7,
     _CONST_LEVENSHTEIN_RATIO_SECOND_CHANCE : 0.5,
     _CONST_QGRAM_RATIO : 0.61,
     _CONST_QGRAM_LEVEL1_RATIO : 0.5
});

/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');
