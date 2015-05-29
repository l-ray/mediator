import Ember from 'ember';

export default Ember.TextField.extend({
    type: 'range',
    attributeBindings: ['min', 'max', 'step']
});
