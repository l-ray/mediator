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

    });
