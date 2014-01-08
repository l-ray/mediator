/*global describe, it */
'use strict';

 (function () {

    describe('Mediator.Connection (Model)', function () {

        var store = null;

        beforeEach(function() {
            Mediator.Store = DS.Store.extend({
                adapter: Mediator.ApplicationAdapter
            });
            var container = new Ember.Container();
            container.register('model:source', Mediator.Source);
            container.register('model:connection', Mediator.Connection);
            container.register('model:result', Mediator.Result);
            container.register('model:picture', Mediator.Picture);
            store = Mediator.Store.create({
                container: container
            });
        });

        after(function () {
            store = null;
        });

        describe('Extends Ember.Enumerable ', function () {
          it('should allow to add results', function(){
              Ember.run( function() {

                  var item = store.createRecord('connection',{});
                  expect(item.get("lastObject")).to.be.undefined;
                  expect(item.get("firstObject")).to.be.undefined;

                  item.get('results').pushObject(store.createRecord('result'));
                  item.enumerableContentDidChange();
                  expect(item.get('lastObject')).to.be.an.instanceOf(Mediator.Result);
                  expect(item.get('firstObject')).to.be.equal(item.get('lastObject'));
              })
          });
          it('should give correct result set size', function(){
            Ember.run( function() {

                var item = store.createRecord('connection',{});
                expect(item.get("length")).to.be.zero;

                var firstResult = store.createRecord('result',{connection:item});
                item.get('results').pushObject(firstResult);
                item.enumerableContentDidChange();

                expect(item.get('length')).to.be.one;
            })
          })
        })
    });
})();