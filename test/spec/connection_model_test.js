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
            container.register('model:link', Mediator.Link);
            container.register('model:group', Mediator.Group);
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

                  item.get('results').then(function(n) {
                      var currentLength = n.get('length');
                      n.pushObject(store.createRecord('result'));
                      item.enumerableContentDidChange();
                      expect(item.get('length')).to.be.equal(currentLength + 1);
                      expect(item.get('lastObject')).to.be.an.instanceOf(Mediator.Result);
                      expect(item.get('firstObject')).to.be.equal(item.get('lastObject'));
                  });
              })
          });
          it('should give correct result set size', function(){
            Ember.run( function() {

                var item = store.createRecord('connection',{});
                expect(item.get("length")).to.be.zero;

                var firstResult = store.createRecord('result',{connection:item});
                item.get('results').then(function(n) {
                    n.pushObject(firstResult);
                    item.enumerableContentDidChange();
                    expect(item.get('length')).to.be.one;
                });
            })
          })
        });

        describe('The Connection ', function () {
            it('should provide a name and url attribute', function(){
                Ember.run( function() {

                    var item = store.createRecord('connection',{});
                    expect(item.get("name")).to.be.not.undefined;
                    expect(item.get("name")).to.be.null;
                    expect(item.get("sourceUrl")).to.be.not.undefined;
                    expect(item.get("sourceUrl")).to.be.null;

                    item.set('source',store.createRecord('source',{name:'testSource', url:'http://web.de'}));
                    expect(item.get("name")).to.be.a('string').and.equal('testSource');
                    expect(item.get("sourceUrl")).to.be.a('string').and.equal('http://web.de');
                })
            });
        });
    });
})();