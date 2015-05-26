/* jshint expr:true */
import Mediator from '../../../app';
import { expect, assert } from 'chai';
import {
  describeModel,
  it
} from 'ember-mocha';

describeModel(
  'link',
  'Link Model',
  {
  needs: [
    'model:source',
    'model:connection',
    'model:result',
    'model:group',
    'model:groupset',
    'model:picture',
    'model:link'
    ]

  },
  function() {
        'use strict';

          it('should return the given parameters correctly', function(){
            var store = this.store();

                  var item = store.createRecord(
                        'link',
                        {
                            url:"http://myUrl.de",
                            result: store.createRecord(
                                'result',
                                {
                                    'sourceName':'testName'
                                }
                            )
                        });

                  expect(item.get("name")).to.be.a('string').and.equal("testName");
                  expect(item.get("url")).to.be.a('string').and.equal("http://myUrl.de");
              });

        });
