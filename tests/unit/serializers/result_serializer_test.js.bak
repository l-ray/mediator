/*global describe, it */
'use strict';

 (function () {

    describe('Mediator.Result (Serializer)', function () {

        var container, store;
        var run = Ember.run;

        beforeEach(function() {
            Mediator.ApplicationStore = DS.Store.extend({
                adapter: Mediator.ApplicationAdapter
            });
            container = new Ember.Container();
            container.register('serializer:result', Mediator.ResultSerializer);
            container.register('model:result', Mediator.Result);
            container.register('model:picture', Mediator.Picture);

            store = Mediator.ApplicationStore.create({
                container: container
            });

        });

        after(function () {
            run(function() {
                container.destroy();
                store.destroy();
            })
        });

        describe("Calling serializerFor looks up 'serializer:<type>' from the container",
            function () {
            it('initially ', function(){
                Ember.run( function() {
                    expect(store.serializerFor('result')).to.be.instanceof(Mediator.ResultSerializer)
                })
            });

        });

        describe(' convert a single picture on a result to a one element array of pictures', function () {
            it('returns an empty array for empty source ', function(){
                Ember.run( function() {
                    var serializer = store.serializerFor('result');
                    expect(serializer.extractArray(store,Mediator.Result,{"results":[]})).to.be.an.instanceOf(Array).and.have.lengthOf(0);
                })
            });

        });

    });
})();
