/*global describe, it */
'use strict';

 (function () {

    describe('Mediator.GroupSet (Model)', function () {

        var store = null;

        beforeEach(function() {
            Mediator.ApplicationStore = DS.Store.extend({
                adapter: Mediator.ApplicationAdapter
            });
            var container = new Ember.Container();
            container.register('model:group', Mediator.Group);
            container.register('model:groupset', Mediator.Groupset);
            container.register('model:result', Mediator.Result);
            container.register('model:picture', Mediator.Picture);
            container.register('model:link', Mediator.Link);
            container.register('model:connection', Mediator.Connection);

            store = Mediator.ApplicationStore.create({
                container: container
            });
        });

        after(function () {
            store = null;
        });

        describe('Extends Ember.Enumerable ', function () {
            it('should allow to add results', function(){
                Ember.run( function() {
                    var item = store.createRecord('groupset',{});
                    expect(item).to.be.an.instanceof(Mediator.Groupset);
                    expect(item.get("lastObject")).to.be.an('undefined');
                    expect(item.get("firstObject")).to.be.an('undefined');

                    var groups = item.get('groups');
                    groups.pushObject(store.createRecord('group'));
                    item.enumerableContentDidChange();
                    expect(item.get('lastObject')).to.be.an.instanceOf(Mediator.Group);
                    expect(item.get('firstObject')).to.be.equal(item.get('lastObject'));
                })
            });
            it('should give correct result set size', function(){
                Ember.run( function() {

                    var item = store.createRecord('groupset',{});
                    expect(item).to.be.an.instanceof(Mediator.Groupset);
                    item.toArray().should.have.length(0);

                    var firstResult = store.createRecord('group',{});
                    var groups = item.get('groups');
                    groups.pushObject(firstResult);

                    item.enumerableContentDidChange();

                    expect(item.get('length')).to.equal(1);
                })
            })
        });
    });
})();