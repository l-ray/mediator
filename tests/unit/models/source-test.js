/* jshint expr:true */
import Mediator from '../../../app';
import { expect, assert } from 'chai';
import {
  describeModel,
  it
} from 'ember-mocha';

describeModel(
  'source',
  'Source Model',
  {
  needs: [
    'model:source',
    'model:connection',
    'model:group',
    'model:groupset',
    'model:picture',
    'model:result',
    'model:link'
    ]

  },
  function() {
        'use strict';

          it('should return the given parameters correctly', function(){
            var store = this.store();

                  var oItem = store.createRecord('source',{name:"myName"});

                  expect(oItem.get("name")).to.be.equal("myName");
                  expect(oItem.get("priority")).to.be.equal(0);
                  expect(oItem.get("lastMoved")).to.be.equal(0);
                  // expect(oItem.get("additional")).to.be.false();

              });
    });
