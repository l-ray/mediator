    describe('Groups controller', function () {

        var store = null;

        beforeEach(function() {

            Mediator.ApplicationStore = DS.Store.extend({
                adapter: Mediator.ApplicationAdapter
            });
            var container = new Ember.Container();
            container.register('model:source', Mediator.Source);
            container.register('model:connection', Mediator.Connection);
            container.register('model:result', Mediator.Result);
            container.register('model:picture', Mediator.Picture);
            container.register('model:link', Mediator.Link);
            container.register('model:group', Mediator.Group);
            container.register('model:groupset', Mediator.Groupset);
            store = Mediator.ApplicationStore.create({
                container: container
            });
        });

        after(function () {
            store = null;
        });

        describe(' Recycling a dataset works on individual Group ', function () {

            var model;
            var controller;

            it("initially holds the recycle mode to false.", function () {
                Ember.run(function () {
                    model = store.createRecord('group', {});
                    var resultModel = store.createRecord('result', {
                        connection: store.createRecord('connection', {})
                    });

                    model.get('results').pushObject(resultModel);

                    controller = Mediator.GroupsController.create({});
                    controller.get('model').pushObject(model);

                    expect(model.get('recycled')).to.be.equal(false);
                    expect(model.get('enabled')).to.be.equal(true);

                });

                it("changes the recycle mode properly.", function () {
                    Ember.run(function () {

                        controller.send('markRecycled', model);
                        expect(model.get('recycled')).to.be.equal(true);
                        expect(model.get('enabled')).to.be.equal(false);
                    });
                });

                it(" restores the recycle mode properly.", function () {
                    Ember.run(function () {
                        controller.send('markRestored', model);
                        expect(model.get('recycled')).to.be.equal(false);
                        expect(model.get('enabled')).to.be.equal(true);
                    });
                });
            });

        });

        describe(' Increasing a dataset works on individual Group ', function () {

            var actionModel, comparisonModel;
            var controller;

            it("initially holds the priorities in natural order.", function () {
                Ember.run(function () {

                    var resultModel = store.createRecord('result', {
                        connection: store.createRecord('connection', {})
                    });

                    actionModel = store.createRecord('group', {});
                    actionModel.get('results').pushObject(resultModel);

                    comparisonModel = store.createRecord('group', {});
                    comparisonModel.set('priorityByUser', comparisonModel.get('priorityByUser') + 1)
                    comparisonModel.get('results').pushObject(resultModel);

                    controller = Mediator.GroupsController.create({});
                    controller.get('model').pushObject(comparisonModel);
                    controller.get('model').pushObject(actionModel);

                    expect(actionModel.get('priority')).to.be.below(comparisonModel.get('priority'));
                    expect(controller.get('model').toArray()[0]).to.be.equal(comparisonModel);
                    expect(controller.get('model').toArray()[1]).to.be.equal(actionModel);

                });
            });

            it("updates the list order when increasing one group priority.", function () {
                Ember.run(function () {
                    controller.send('increaseUserPriority', actionModel);
                    expect(actionModel.get('priority')).to.be.above(comparisonModel.get('priority'));
                });
                /*Ember.run(function () {
                    expect(controller.get('model').toArray()[1]).to.be.equal(comparisonModel);
                    expect(controller.get('model').toArray()[0]).to.be.equal(actionModel);
                });*/

            });

            it(" lower the list order when decreasing one groups priority", function () {
                Ember.run(function() {
                    controller.send('decreaseUserPriority', actionModel);
                    expect(actionModel.get('priority')).to.be.below(comparisonModel.get('priority'));
                    /*expect(controller.get('model').toArray()[1]).to.be.equal(comparisonModel);
                    expect(controller.get('model').toArray()[1]).to.be.equal(actionModel);
                    */
                });
            });

        });
    });
