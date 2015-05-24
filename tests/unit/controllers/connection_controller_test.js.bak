    describe('Connections controller', function () {

        var store = null;

        beforeEach(function() {

            Mediator.ApplicationStore = DS.Store.extend({
                adapter: Mediator.ApplicationAdapter
            });
            var container = new Ember.Container();
            container.register('model:source', Mediator.Source);
            container.register('model:connection', Mediator.Connection);
            container.register('controller:connectionsController', Mediator.ConnectionsController);
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

        describe(' Works on individual Connection ', function () {

            it("sets the edit mode properly.", function () {
                Ember.run(function() {
                    var model = store.createRecord('connection',{});
                    var controller = Mediator.ConnectionsController.create({});
                    controller.send('edit',model);
                    expect(model.get('editMode')).to.be.equal(true);
                    controller.send('doneEditing',model);
                    expect(model.get('editMode')).to.be.equal(false);
                });
            });
        });
    });
