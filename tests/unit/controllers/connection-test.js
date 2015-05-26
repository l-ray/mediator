/* jshint expr:true */
import { expect } from 'chai';
import Ember from 'ember';
import Mediator from '../../../app';
import {
  describeModule,
  it
} from 'ember-mocha';

describeModule(
  'controller:connections',
  'Connections Controller',
  {
    // Specify the other units that are required for this test.
    needs: [
    'model:source',
    'model:connection',
    'model:result',
    'model:picture',
    'model:link',
    'model:group',
    'model:groupset'
    ]
  },
  function() {

      it('exists', function() {
        var controller = this.subject();
        expect(controller).to.be.ok;
      });


      it("works on individual connection and sets the edit mode properly.", function () {

            Mediator.ApplicationStore = DS.Store.extend({
              adapter: DS.MochaAdapter
            });

            var store = Mediator.ApplicationStore.create({
              container: this.container
            });

            var model = store.createRecord('connection',{});
              var controller = this.subject();
              controller.send('edit',model);
              expect(model.get('editMode')).to.be.equal(true);
              controller.send('doneEditing',model);
              expect(model.get('editMode')).to.be.equal(false);

        });
    });
