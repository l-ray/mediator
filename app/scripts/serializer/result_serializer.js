Mediator.ResultSerializer = DS.RESTSerializer.extend({


    extractArray: function (store, type, payload) {
        console.log("in extractArray for Results");

        // in case there is only one picture in the json, this will be delivered
        // as single element instead of a correct single element array.
        payload.results.forEach(function(result) {
            if (! Ember.empty(result.pictures))
                result.pictures = Ember.makeArray(result.pictures)
        })

        return this._super(store, type, payload);
    }

});
