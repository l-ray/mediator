/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';

describeComponent(
  'recycled-groups',
  'Integration: RecycledGroupsComponent',
  { },
  function() {

    it(' toggles results ', function() {

      var component = this.subject();
      expect(component.get('showRecycledGroups'), "recycled groups hidden").to.be.equal(false);
      component.send('toggleShowRecycledGroups');
      expect(component.get('showRecycledGroups'),"recycled groups shown").to.be.equal(true);

    });
  }
);
