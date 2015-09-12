/* jshint expr:true */
import { expect } from 'chai';
import Ember from 'ember';
import Mediator from '../../../app';
import {
  describeModule,
  it
} from 'ember-mocha';

describeModule(
  'controller:groups',
  'Groups Controller',
  {
    // Specify the other units that are required for this test.
    needs: [
    'model:source',
    'model:connection',
    'model:result',
    'model:picture',
    'model:link',
    'model:groupset',
    'model:group'
    ]
  },
  function() {

    it('exists', function() {
      var controller = this.subject();
      expect(controller).to.be.ok;
    });

    it("initially holds the recycle mode to false.", function () {

      var controller = this.subject();
      var store = controller.get('store');

      var model = store.createRecord('group', {});
      var resultModel = store.createRecord('result', {
          connection: store.createRecord('connection', {active:true})
      });
      model.get('results').pushObject(resultModel);

      controller.set('content', [model]);

      expect(model.get('recycled'),"recycled").to.be.equal(false);
      expect(model.get('enabled'),"enabled").to.be.equal(true);

      });

    it("changes the recycle mode properly.", function () {

      var store = this.subject().get('store');

      var model = store.createRecord('group', {});
      var resultModel = store.createRecord('result', {
        connection: store.createRecord('connection', {})
      });
      model.get('results').pushObject(resultModel);

      var controller = this.subject();

      expect(model.get('recycled')).to.be.equal(false);

      controller.send('markRecycled', model);

      expect(model.get('recycled')).to.be.equal(true);
    });

    it(" restores the recycle mode properly.", function () {

      var controller = this.subject();

      var store = controller.get('store');
      var model = store.createRecord('group', {});
      var resultModel = store.createRecord('result', {
        connection: store.createRecord('connection', {"active":true})
      });
      model.get('results').pushObject(resultModel);

      controller.send('markRestored', model);

      expect(model.get('recycled'),"recycled").to.be.false;
      expect(model.get('enabled'), "enabled").to.be.true;
    });

    it("should show enabled groups only", function() {

      var controller = this.subject();

      var store = controller.get('store');

      var item1 = store.createRecord('group', {"enabled": true});
      var item2 = store.createRecord('group', {"enabled": false});

      controller.set('content',[item1, item2]);

      var underTest = controller.get('enabled');
      expect(underTest.toArray()).to.be.instanceof(Array).and.have.length(1);
      expect(underTest.toArray(), "enabled group shown").to.contain(item1);
      expect(underTest.toArray(), "disabled group hidden").to.not.contain(item2);

    });


      it(" Increasing a dataset works on individual Group, initially holds the priorities in natural order.", function () {

        var actionModel, comparisonModel;
        var controller;

        controller = this.subject();

        var store = controller.get('store');
        var resultModel = store.createRecord('result', {
          connection: store.createRecord('connection', {})
        });

        actionModel = store.createRecord('group', {});
        actionModel.get('results').pushObject(resultModel);

        comparisonModel = store.createRecord('group', {});
        comparisonModel.set('priorityByUser', comparisonModel.get('priorityByUser') + 1);
        comparisonModel.get('results').pushObject(resultModel);

        controller.set('content', [comparisonModel,actionModel]);

        expect(actionModel.get('priority')).to.be.below(comparisonModel.get('priority'));
        expect(controller.get('content').toArray()[0]).to.be.equal(comparisonModel);
        expect(controller.get('content').toArray()[1]).to.be.equal(actionModel);

      });

      it(" Increasing a dataset works on individual Group, updates the list order when increasing one group priority.", function () {

        var actionModel, comparisonModel;
        var controller = this.subject();

        var store = controller.get('store');
        var resultModel = store.createRecord('result', {
          connection: store.createRecord('connection', {})
        });

        actionModel = store.createRecord('group', {});
        actionModel.get('results').pushObject(resultModel);

        comparisonModel = store.createRecord('group', {});
        comparisonModel.set('priorityByUser', comparisonModel.get('priorityByUser') + 1);
        comparisonModel.get('results').pushObject(resultModel);

        controller.send('increaseUserPriority', actionModel);
        expect(actionModel.get('priority')).to.be.above(comparisonModel.get('priority'));
      });

      it(" Increasing a dataset works on individual Group,  lower the list order when decreasing one groups priority", function () {

        var actionModel, comparisonModel;
        var controller = this.subject();

        var store = controller.get('store');

        var resultModel = store.createRecord('result', {
          connection: store.createRecord('connection', {})
        });

        actionModel = store.createRecord('group', {});
        actionModel.get('results').pushObject(resultModel);

        comparisonModel = store.createRecord('group', {});
        comparisonModel.set('priorityByUser', comparisonModel.get('priorityByUser') + 1);
        comparisonModel.get('results').pushObject(resultModel);

        controller.send('decreaseUserPriority', actionModel);
        expect(actionModel.get('priority')).to.be.below(comparisonModel.get('priority'));
        /*expect(controller.get('model').toArray()[1]).to.be.equal(comparisonModel);
         expect(controller.get('model').toArray()[1]).to.be.equal(actionModel);
         */
      });

    });
