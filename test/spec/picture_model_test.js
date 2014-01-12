/*global describe, it */
'use strict';

 (function () {

    describe('Mediator.Picture (Model)', function () {

        var store = null;

        beforeEach(function() {
            Mediator.Store = DS.Store.extend({
                adapter: Mediator.ApplicationAdapter
            });
            var container = new Ember.Container();
            container.register('model:picture', Mediator.Picture);
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

                  var item = store.createRecord('picture',
                                        {
                                            name:"myName",
                                            url:"myUrl",
                                            thumbnailUrl:"myThumbnail",
                                            "description":"myDescription",
                                            "priority":"myPriority"
                                        });

                  expect(item.get("name")).to.be.equal("myName");
                  expect(item.get("url")).to.be.equal("myUrl");
                  expect(item.get("thumbnailUrl")).to.be.equal("myThumbnail");
                  expect(item.get("description")).to.be.equal("myDescription");
                  expect(item.get("priority")).to.be.equal("myPriority");

              })
          })
           })
    });
})();