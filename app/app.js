import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

var Mediator;

Ember.LOG_BINDINGS = true;
Ember.MODEL_FACTORY_INJECTIONS = true;

Mediator = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  Resolver: Resolver
});

Mediator.constants = Ember.Object.create({
     _CONST_LEVENSHTEIN_RATIO : 0.7,
     _CONST_LEVENSHTEIN_RATIO_SECOND_CHANCE : 0.36,
     _CONST_QGRAM_RATIO : 0.61,
     _CONST_QGRAM_LEVEL1_RATIO : 0.5,
     _RESULT_CATEGORY_SPLITTER: ','
});

loadInitializers(Mediator, config.modulePrefix);

export default Mediator;
