/* jshint expr:true */
import { expect } from 'chai';
import Mediator from '../../../app';
import Ember from 'ember';

import {
  describeComponent,
  it
} from 'ember-mocha';

describeComponent(
  'connection-details',
  'ConnectionDetailsComponent',
  {
    // specify the other units that are required for this test
    needs: [
    'model:result',
    'model:source',
    'model:connection',
    'model:group',
    'model:groupset',
    'model:picture',
    'model:link'
]
  },
  function() {
    /*
    it('renders', function() {
      // creates the component instance
      var component = this.subject();
      expect(component._state).to.equal('preRender');
      // renders the component on the page
      this.render();
      expect(component._state).to.equal('inDOM');
    });
    */

    it("works on individual connection and sets the edit mode properly.", function () {

      Mediator.ApplicationStore = DS.Store.extend({
        adapter: DS.MochaAdapter
      });

      var store = Mediator.ApplicationStore.create({
        container: this.container
      });

      var model = store.createRecord('connection',{});
      var component = this.subject();
      //Ember.run(function(){
        component.send('edit',model);
      //});
      expect(model.get('editMode'),"switch into edit mode").to.be.equal(true);
      //Ember.run(function(){
        component.send('doneEditing',model);
      //});
      expect(model.get('editMode'),"switch into readonly mode").to.be.equal(false);

    });

  }
);
