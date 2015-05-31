/* jshint expr:true */
import Mediator from '../../../app';
import { expect, assert } from 'chai';
import {
  describeModel,
  it
} from 'ember-mocha';

describeModel(
  'group',
  'Group',
  {
  needs: [
    'model:source',
    'model:connection',
    'model:groupset',
    'model:result',
    'model:group',
    'model:picture',
    'model:link'
    ]

  },
  function() {
        'use strict';

        it('should allow to add results', function(){
          var store = this.store();
                var item = store.createRecord('group',{});
                expect(item.get("lastObject")).to.be.undefined;
                expect(item.get("firstObject")).to.be.undefined;

                var results = item.get('results');

                results.pushObject(store.createRecord('result'));
                item.enumerableContentDidChange();
                expect(item.get('firstObject')).to.be.equal(item.get('lastObject'));

        });
        it('should give correct result set size', function(){
          var store = this.store();
                var item = store.createRecord('group',{});
                expect(item.toArray()).to.have.length(0);

                var firstResult = store.createRecord('result',{});
                var results = item.get('results');

                results.pushObject(firstResult);
                item.enumerableContentDidChange();
                expect(item.toArray()).to.have.length(1);

        });

        it('should show enabled results', function(){
          var store = this.store();
          var item = store.createRecord('group',{});

          var firstResult = store.createRecord('result',{
              connection : store.createRecord('connection',{active:true })
          });
          var secondResult = store.createRecord('result',{
            connection : store.createRecord('connection',{active:false })
          });
          var results = item.get('results');

          results.pushObjects([firstResult,secondResult]);
          item.enumerableContentDidChange();
          expect(item.toArray()).to.have.length(2);
          expect(item.get('results'),"all results").to.have.length(2);
          expect(item.get('enabledResults'),"enabled results only").to.have.length(1);

        });

        it('should on standard have an empty title', function(){
          var store = this.store();
          var item = store.createRecord('group',{});
                expect(item.get("title")).to.be.a('string').and.to.be.empty;
        });

        it('should show first non-empty title', function(){
          var store = this.store();
          var item = store.createRecord('group',{});
                var results = item.get('results');
                results.pushObject(store.createRecord('result', {}));

                item.enumerableContentDidChange();
                expect(item.toArray()).to.have.length(1);
                expect(item.get("title")).to.be.a('string').and.to.be.empty;

                var testTitle = "cool, bro";
                results.pushObject(store.createRecord('result', {'title':testTitle}));
                item.enumerableContentDidChange();
                expect(item.toArray()).to.have.length(2);
                expect(item.get("title")).to.be.a('string').and.to.equal(testTitle);

                results.pushObject(store.createRecord('result', {'title':"dontShowThis"}));
                item.enumerableContentDidChange();
                expect(item.toArray()).to.have.length(3);
                expect(item.get("title")).to.be.a('string').and.to.equal(testTitle);

        });

        it('should show reduced title(lower case, only letters/numbers)', function(){
          var store = this.store();
                var item = store.createRecord('group',{});

                var results = item.get('results');
                results.pushObject(store.createRecord('result', {'title':"cooL, bro"}));

                item.enumerableContentDidChange();
                expect(item.get("reducedTitle")).to.be.a('string').and.to.equal("cool bro");

                item.get('firstObject').set('title',"  .-DiLemM ? ");
                expect(item.get("reducedTitle")).to.match(/dilemm/,"upperCase and umlaute");

                item.get('firstObject').set('title',"  .-DiLemMÖ ? ");
                expect(item.get("reducedTitle")).to.match(/dilemmö/,"upperCase and umlaute");

                item.get('firstObject').set('title',"U96");
                expect(item.get("reducedTitle")).to.match(/u96/,"numbers");

                item.get('firstObject').set('title',"###\ test  -. -Me---");
                expect(item.get("reducedTitle")).to.be.a('string').and.to.equal("test me","Stripping spaces");
            });

        it('should on standard have an empty sub-title', function(){
          var store = this.store();
          var item = store.createRecord('group',{});
                expect(item.get("subtitle")).to.be.empty;
        });

        it('should show first non-empty sub-title', function(){
          var store = this.store();
          var item = store.createRecord('group',{});
                var results = item.get('results');
                results.pushObject(store.createRecord('result', {}));

                item.enumerableContentDidChange();
                expect(item.toArray()).to.have.length(1);
                expect(item.get("subtitle")).to.be.a('string').and.to.be.empty;

                var subTitle = "cool, bro";
                results.pushObject(store.createRecord('result', {'subtitle':subTitle}));
                item.enumerableContentDidChange();
                expect(item.toArray()).to.have.length(2);
                expect(item.get("subtitle")).to.be.a('string').and.to.equal(subTitle);

                results.pushObject(store.createRecord('result', {'subtitle':"dontShowThis"}));
                item.enumerableContentDidChange();
                expect(item.toArray()).to.have.length(3);
                expect(item.get("subtitle")).to.be.a('string').and.to.equal(subTitle);
            });

        it('should on standard have an empty price', function(){
          var store = this.store();
          var item = store.createRecord('group',{});
                expect(item.get("price")).to.be.empty;
        });

        it('should show first non-empty price', function(){
          var store = this.store();
                var item = store.createRecord('group',{});
                var results = item.get('results');
                results.pushObject(
                    store.createRecord('result', {})
                );

                item.enumerableContentDidChange();
                expect(item.toArray()).to.have.length(1);
                expect(item.get("price")).to.be.empty;

                var price = "5 Euro";
                results.pushObject(
                    store.createRecord('result', {'price':price })
                );
                item.enumerableContentDidChange();
                expect(item.toArray()).to.have.length(2);
                expect(item.get("price")).to.be.equal(price);

                results.pushObject(
                    store.createRecord('result', {'price':"dontShowThis"})
                );
                item.enumerableContentDidChange();
                expect(item.toArray()).to.have.length(3);
                expect(item.get("price")).to.be.equal(price);

        });

        it('should on standard have an empty location', function(){
          var store = this.store();
          var item = store.createRecord('group',{});
                expect(item.get("location")).to.be.a('string').and.to.be.empty;
        });

        it('should show first non-empty location', function(){
          var store = this.store();
          var item = store.createRecord('group',{});
                var results = item.get('results');
                results.pushObject(store.createRecord('result', {}));

                item.enumerableContentDidChange();
                expect(item.toArray()).to.have.length(1);
                expect(item.get("location")).to.be.a('string').and.to.be.empty;

                var location = "Himmelreich";
                results.pushObject(store.createRecord('result', {'location':location}));
                item.enumerableContentDidChange();
                expect(item.toArray()).to.have.length(2);
                expect(item.get("location")).to.be.a('string').and.to.equal(location);

                results.pushObject(store.createRecord('result', {'location':"dontShowThis"}));
                item.enumerableContentDidChange();
                expect(item.toArray()).to.have.length(3);
                expect(item.get("location")).to.be.a('string').and.to.equal(location);
        });

        it('should show reduced location (lower case, only letters/numbers)', function(){
          var store = this.store();
          var item = store.createRecord('group',{});

                var results = item.get('results');
                results.pushObject(
                    store.createRecord('result', {'location':'cooL, bro'})
                );

                item.enumerableContentDidChange();
                expect(item.get("reducedLocation")).to.be.a('string').and.to.equal("cool bro");

                item.get('firstObject').set('location',"  .-DiLemM ? ");
                expect(item.get("reducedLocation")).to.match(/dilemm/,"upperCase and umlaute");

                item.get('firstObject').set('location',"  .-DiLemMÖ ? ");
                expect(item.get("reducedLocation")).to.match(/dilemmö/,"upperCase and umlaute");

                item.get('firstObject').set('location',"U96");
                expect(item.get("reducedLocation")).to.match(/u96/,"numbers");

                item.get('firstObject').set('location',"###\ test  -. -Me---");
                expect(item.get("reducedLocation")).to.be.a('string').and.to.equal("test me","Stripping spaces");
        });

        it('should on standard have an empty startDate', function(){
          var store = this.store();
          var item = store.createRecord('group',{});
                expect(item.get("startDate")).to.be.empty;
        });

        it('should show first non-empty startDate', function(){
          var store = this.store();
          var item = store.createRecord('group',{});
                var results = item.get('results');
                results.pushObject(store.createRecord('result', {}));

                item.enumerableContentDidChange();
                expect(item.toArray()).to.have.length(1);
                expect(item.get("startDate")).to.be.empty;

                var startDate = "2013-12-11 20:00";
                results.pushObject(store.createRecord('result', {'start':startDate}));
                item.enumerableContentDidChange();
                expect(item.toArray()).to.have.length(2);
                expect(item.get("startDate")).to.be.equal(startDate);

                results.pushObject(store.createRecord('result', {'start':"dontShowThis"}));
                item.enumerableContentDidChange();
                expect(item.toArray()).to.have.length(3);
                expect(item.get("startDate")).to.be.equal(startDate);

        });

        it('should on standard have an empty summary', function(){
          var store = this.store();
          var item = store.createRecord('group',{});
                expect(item.get("reducedSummary")).to.be.a('string').and.to.empty;
        });

        it('should show nothing double)', function(){

          var store = this.store();
          var title ="bro coOl bro yeah cool";
          var location ="cool what yeah-";
          var item = store.createRecord('group',{});

          var results = item.get('results');
          results.pushObject(
              store.createRecord('result', {'title':title, 'location':location})
          );

          item.enumerableContentDidChange();

          assert.lengthOf(item.get('reducedSummary').split(" "),4);
          expect(item.get('reducedSummary').split(" "))
              .to.contain("bro")
              .and.to.contain("cool")
              .and.to.contain("yeah")
              .and.to.contain("what");
        });

        it('should be lower case letter/numbers only)', function(){

          var store = this.store();
          var title ="mQGiyQFsPJHwpPprgv7DWW3lxFC!%$&%$§´é´qôb";
                var location ="vvueBBZK7QqoBlF2txZXtqMNF";
                var item = store.createRecord('group',{});

                var results = item.get('results');
                results.pushObject(
                    store.createRecord('result', {'title': title, 'location': location})
                );

                item.enumerableContentDidChange();

                expect(item.get('reducedSummary')).to.be.a('string').and.have.length.gt.zero;
                expect(item.get('reducedSummary')).to.have.length.lt(title.length + location.length);
                expect(item.get('reducedSummary')).to.be.equal(item.get('reducedSummary').toLowerCase());
                expect(item.get('reducedSummary')).to.match(/[\d\s ]/);
        });

        it('should on standard have no pictures', function(){
          var store = this.store();
          var item = store.createRecord('group',{});

                expect(item.get('pictures')).that.is.not.undefined;
                expect(item.get('pictures')).to.be.an('array');
                expect(item.get("pictures")).to.be.empty;
        });

        it('should show all nested pictures)', function(){
          var store = this.store();
                var item = store.createRecord('group',{});

                var firstResult = store.createRecord('result', {});
                firstResult.get('pictures')
                    .pushObject(store.createRecord('picture', {'url':'http://test.co/img1.src'}));

                var secondResult = store.createRecord('result', {});
                var p2 = secondResult.get('pictures');
                p2.pushObject(store.createRecord('picture', {'url':'http://test.co/img2.src'}));
                p2.pushObject(store.createRecord('picture', {'url':'http://test.co/img3.src'}));

                var results = item.get('results');

                results.pushObject(firstResult);
                results.pushObject(secondResult);
                item.enumerableContentDidChange();

                expect(item.get('pictures')).to.have.an.property('length');
                expect(item.get('pictures')).to.be.not.empty;
                assert.lengthOf(item.get('pictures'),3);
        });

        it('should recognize empty system priority', function(){
          var store = this.store();
          var item = store.createRecord('group',{});
                expect(item.get("priority")).to.equal(0);
        });

        it('should recognize filled system priority', function(){
          var store = this.store();
                var item = store.createRecord('group',{});

                var result1 = store.createRecord('result', {});
                var result2 = store.createRecord('result', {'price': 5});

                var results = item.get('results');
                results.pushObject(result1);

                item.enumerableContentDidChange();
                expect(item.toArray()).to.have.length(1);
                expect(item.get("priority")).to.be.equal(0);

                item.get('results').pushObject(result2);
                item.enumerableContentDidChange();
                expect(item.toArray()).to.have.length(2);
                expect(item.get('priority')).to.be.equal(result2.get('priority'));
        });

        it('should recognize empty ruleset priority', function(){
          var store = this.store();
          var item = store.createRecord('group',{});
                expect(item.get("priorityByRuleSet")).to.be.equal(0);
        });

        it('should recognize filled ruleset priority', function() {
          var store = this.store();
          var item = store.createRecord('group', {});

            var result1 = store.createRecord('result', {
                connection: store.createRecord('connection', {
                    source: store.createRecord('source', {
                        priority: 5,
                        additional: false
                    })
                })
            });

            var result2 = store.createRecord('result', {
                connection: store.createRecord('connection', {
                    source: store.createRecord('source', {
                        priority: 3,
                        additional: false
                    })
                })
            });

            item.get('results').pushObject(result1);
            item.enumerableContentDidChange();
            expect(item.get('priorityByRuleSet')).to.equal(5);

            item.get('results').pushObject(result2);
            item.enumerableContentDidChange();
            expect(item.get('priorityByRuleSet')).to.equal(4);

        });

        it('should ignore filled ruleset priority marked as additional', function () {
          var store = this.store();
          var item = store.createRecord('group', {});

                var result1 = store.createRecord('result', {
                    connection: store.createRecord('connection', {
                        source: store.createRecord('source', {
                            priority: 5,
                            additional: false
                        })
                    })
                });

                var result2 = store.createRecord('result', {
                    connection: store.createRecord('connection', {
                        source: store.createRecord('source', {
                            priority: 3,
                            additional: true
                        })
                    })
                });

                item.get('results').pushObject(result1);
                item.get('results').pushObject(result2);
                item.enumerableContentDidChange();
                expect(item.get('priorityByRuleSet')).to.equal(5);

            });

        it('should on standard return 0 priority', function(){
          var store = this.store();
                var item = store.createRecord('group',{});
                expect(item.get("priority")).to.be.zero;
        });

        it('should on standard have no links', function(){
          var store = this.store();
          var item = store.createRecord('group',{});

                expect(item.get('links')).that.is.not.undefined;
                expect(item.get('links')).to.be.an('array');
                expect(item.get("links")).to.be.empty;
        });

        it('should show all nested links)', function(){
          var store = this.store();
          var item = store.createRecord('group',{});

                var firstResult = store.createRecord('result', {});
                firstResult.get('links')
                    .pushObject(store.createRecord('link', {'url':'http://test.co/img1.src'}));

                var secondResult = store.createRecord('result', {});
                var p2 = secondResult.get('links');
                p2.pushObject(store.createRecord('link', {'url':'http://test.co/img2.src'}));
                p2.pushObject(store.createRecord('link', {'url':'http://test.co/img3.src'}));

            var results = item.get('results');
                results.pushObject(firstResult);
                results.pushObject(secondResult);
                item.enumerableContentDidChange();

                expect(item.get('links')).to.have.an.property('length');
                expect(item.get('links')).to.be.not.empty;
                assert.lengthOf(item.get('links'),3);
            });

        it('should on standard have no links', function(){
          var store = this.store();
          var item = store.createRecord('group',{});

                expect(item.get('categories')).that.is.not.undefined;
                expect(item.get('categories')).to.be.an('array').and.to.be.empty;
        });

        it('should show all nested links)', function(){
          var store = this.store();
                var item = store.createRecord('group',{});

                var firstResult = store.createRecord('result', {id:"p1"});
                firstResult.set('categories', "jazz");

                var secondResult = store.createRecord('result', {id:"p2"});
                var p2 = secondResult.set('categories',"pop,jazz,etc");

                var results = item.get('results');
                results.pushObject(firstResult);
                results.pushObject(secondResult);
                item.enumerableContentDidChange();

                expect(item.get('categories')).to.have.an.property('length').and.to.be.not.empty;
                assert.lengthOf(item.get('categories'),3);
        });

});
