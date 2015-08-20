import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({

  isNewSerializerAPI: true,

  normalizeResponse: function ( store, primaryModelClass, payload, id, requestType) {
    console.log("serializer/result#normalize receiving primaryModelClass %@ with id %@ and requestType %@".fmt(primaryModelClass, id, requestType));
    return this._super(store, primaryModelClass, payload, id, requestType);
  },

  normalizeArrayResponse: function (store, type, payload) {

      // in case there is only one result in the json, this will be delivered
      // as single element instead of a correct single element array.
      if (!Ember.isEmpty(payload.results)) {
          payload.results = Ember.makeArray(payload.results);

          // in case there is only one picture in the json, this will be delivered
          // as single element instead of a correct single element array.
          payload.results.forEach(function(result) {
              if (! Ember.isEmpty(result.pictures)) {
                result.pictures = Ember.makeArray(result.pictures);
              }
          });
      }

      if (! Ember.isEmpty(payload.pictures)) {
        payload.pictures = Ember.makeArray(payload.pictures);
      }

      return this._super(store, type, payload);
  },



});
