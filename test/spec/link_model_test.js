/*global describe, it */
'use strict';

 (function () {

    describe('Mediator.Link (Model)', function () {

        var store = null;

        beforeEach(function() {
            Mediator.Store = DS.Store.extend({
                adapter: Mediator.ApplicationAdapter
            });
            var container = new Ember.Container();
            container.register('model:link', Mediator.Link);
            container.register('model:connection', Mediator.Connection);
            container.register('model:result', Mediator.Result);
            container.register('model:source', Mediator.Source);
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

                  var item = store.createRecord(
                        'link',
                        {
                            url:"myUrl",
                            result: store.createRecord(
                                'result',
                                {
                                    'sourceName':'testName'
                                }
                            )
                        });

                  expect(item.get("name")).to.be.a('string').and.equal("testName");
                  expect(item.get("url")).to.be.a('string').and.equal("myUrl");

              })
          })
        })
    });
})();