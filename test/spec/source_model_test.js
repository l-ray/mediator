/*global describe, it */
'use strict';

 (function () {

    describe('Mediator.Source (Model)', function () {

        var store = null;

        beforeEach(function() {
            Mediator.Store = DS.Store.extend({
                adapter: Mediator.ApplicationAdapter
            });
            var container = new Ember.Container();
            container.register('model:source', Mediator.Source);
            container.register('model:connection', Mediator.Connection);
            store = Mediator.Store.create({
                container: container
            });
        });

        after(function () {
            store = null;
        });

        describe('initialize like expected', function () {
          it('should return the given parameters correctly', function(){
              Ember.run( function() {

                  var oItem = store.createRecord('source',{name:"myName"});

                  expect(oItem.get("name")).to.be.equal("myName");
                  expect(oItem.get("priority")).to.be.equal(0);
                  expect(oItem.get("lastMoved")).to.be.equal(0);
                  // expect(oItem.get("additional")).to.be.false();

              })
          })
           })
    });
})();