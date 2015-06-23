import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({


    extractArray: function (store, type, payload) {

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

    extract: function(store, typeClass, payload, id, requestType) {
      var something = this._super(store, typeClass, payload, id, requestType);

      console.log("HERE comes SOMETHING:"+something);
      var groups = store.get("model.groups");
      something.forEach(
        function (result) {
          console.log("working on result:"+result.get('id'));
          if (Ember.isEmpty(result.get('group'))) {
            groups.pushObject(
              this.__produceNewGroupForResult(result)
            );
          }
        },
        this
      );

      return something;

    },

  __produceNewGroupForResult: function(result) {
    var store = this.store;
    var tmpGroup = store.createRecord('group');
    var tmpGroupResults = tmpGroup.get('results');
    tmpGroupResults.pushObject(result);
    result.set('group', tmpGroup);
    return tmpGroup;
  }

});
