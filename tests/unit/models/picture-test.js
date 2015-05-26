/* jshint expr:true */
import Mediator from '../../../app';
import { expect, assert } from 'chai';
import {
  describeModel,
  it
} from 'ember-mocha';

describeModel(
  'picture',
  'Picture Model',
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

                  var item = store.createRecord('picture',
                                        {
                                            name:"myName",
                                            url:"myUrl",
                                            thumbnailUrl:"myThumbnail",
                                            "description":"myDescription",
                                            "priority":"myPriority"
                                        });

                  expect(item.get("name")).to.be.a('string').and.equal("myName");
                  expect(item.get("url")).to.be.a('string').and.equal("myUrl");
                  expect(item.get("thumbnailUrl")).to.be.a('string').and.equal("myThumbnail");
                  expect(item.get("src")).to.be.a('string').and.equal("myThumbnail");
                  expect(item.get("description")).to.be.a('string').and.equal("myDescription");
                  expect(item.get("priority")).to.be.a('string').and.equal("myPriority");
          });
          it('should adapt correctly to missing thumbnail', function(){
                  var store = this.store();

                  var item = store.createRecord('picture',
                      {
                          name:"myName",
                          url:"myUrl",
                          "description":"myDescription",
                          "priority":"myPriority"
                      });

                  expect(item.get("url")).to.be.a('string').and.equal("myUrl");
                  expect(item.get("src")).to.be.a('string').and.equal("myUrl");

        });
});
