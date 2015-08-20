import Ember from 'ember';
import Mediator from '../../app';
import config from '../../config/environment';

export default function startApp(attrs) {
  var application;

  var attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(function() {
    application = Mediator.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
