/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'groups-detail-list',
  'Integration: GroupsDetailListComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#groups-detail-list}}
      //     template content
      //   {{/groups-detail-list}}
      // `);

      this.render(hbs`{{groups-detail-list}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
