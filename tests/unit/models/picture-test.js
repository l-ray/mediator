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
            expect(item.get("description")).to.be.a('string').and.equal("myDescription");
            expect(item.get("priority")).to.be.a('string').and.equal("myPriority");
        });

        it('should return picture Urls unchanged if absolute', function(){
          var item = mockPictureWithRelativeUrl(this.store(),"dontUse");

          ["http","https"].forEach(function(protocol){
            item.set("url", protocol+"://ge.co/myUrl");
            item.set("thumbnailUrl", protocol+"://ge.co/hello");
            var pRegex = new RegExp("^"+protocol);
            var noUrlAdded = /dontUse/;
            expect(item.get("url")).to.be.a('string').and.match(pRegex).and.not.match(noUrlAdded);
            expect(item.get("absoluteUrl")).to.be.a('string').and.match(pRegex).and.not.match(noUrlAdded);
            expect(item.get("thumbnailUrl")).to.be.a('string').and.match(pRegex).and.not.match(noUrlAdded);
            expect(item.get("absoluteThumbnailUrl")).to.be.a('string').and.match(pRegex).and.not.match(noUrlAdded);
          });
        });

        it('should calculate picture absolute Url correctly', function(){
          var item = mockPictureWithRelativeUrl(this.store(),"http://whatever.com/");
          item.set("url","myUrl");
          expect(item.get("url")).to.be.a('string').and.equal("myUrl");
          expect(item.get("absoluteUrl")).to.be.a('string').and.equal("http://whatever.com/myUrl");
        });

        it('should calculate absolute thumbnail correctly', function(){
          var item = mockPictureWithRelativeUrl(this.store(),"http://whatever.com/");
          item.set("thumbnailUrl","myThumbnail");
          expect(item.get("thumbnailUrl")).to.be.a('string').and.equal("myThumbnail");
          expect(item.get("absoluteThumbnailUrl")).to.be.a('string').and.equal("http://whatever.com/myThumbnail");
        });

        it('should updated on a changed resultUrl', function(){
          var item = mockPictureWithRelativeUrl(this.store(),"http://whatever.com/");
          item.set("thumbnailUrl","myThumbnail");
          item.set("result.resultUrl","http://alternative.url/");
          expect(item.get("absoluteThumbnailUrl")).to.be.a('string').and.equal("http://alternative.url/myThumbnail");
          expect(item.get("absoluteUrl")).to.be.a('string').and.equal("http://alternative.url/myUrl");
        });

        it('should show absolute url as src if no thumbnail exists', function(){
                  var item = mockPictureWithRelativeUrl(this.store(),"http://whatever.com/");
             expect(item.get("src")).to.be.a('string').and.equal("http://whatever.com/myUrl");
        });

        it('should show absolute thumbnail url as src', function(){
          var item = mockPictureWithRelativeUrl(this.store(),"http://whatever.com/");
          item.set("thumbnailUrl","myThumbnail");
          expect(item.get("src")).to.be.a('string').and.equal("http://whatever.com/myThumbnail");
        });

        function mockPictureWithRelativeUrl(store, externalResultUrl) {
          return store.createRecord('picture',
            {
              name:"myName",
              url:"myUrl",
              result: store.createRecord('result',{
                resultUrl: externalResultUrl
              }),
              "description":"myDescription",
              "priority":"myPriority"
            });
        }

  });
