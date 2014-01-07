/*global describe, it */
'use strict';

 (function () {

    describe('Mediator.Group (Model)', function () {

        var store = null;

        beforeEach(function() {
            Mediator.Store = DS.Store.extend({
                adapter: Mediator.ApplicationAdapter
            });
            var container = new Ember.Container();
            container.register('model:group', Mediator.Group);
            container.register('model:result', Mediator.Result);
            store = Mediator.Store.create({
                container: container
            });
        });

        after(function () {
            store = null;
        });

        describe('calculate group priority dependent from properties', function () {
            it('should on standard return', function(){
              Ember.run( function() {
                  var item = store.createRecord('group',{});
                  expect(item.get("priority")).to.be.equal(0);
              })
            });
         })
    });
})();