/* jshint expr:true */
import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';

describeModule(
  'adapter:group',
  'GroupAdapter',
  {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  },
  function() {

    it('creates new instance in case none exists', function() {
      var adapter = this.subject();
      var createdNewInstance = false;
      var newId = "123";
      var dummyModel = new DS.Model("group",{id:newId});
      var result = adapter.findRecord(
        // mocked store
        {
          findRecord:function(){return undefined;},
          createRecord:function(type, options) {
            if (options.id === newId) { createdNewInstance = true; return dummyModel;}
          }
        },
        "dummyType",
        newId
      );
      expect(createdNewInstance).to.equal(true);
      expect(result).to.equal(dummyModel);
    });

    it('uses existing instance were existing', function() {
      var adapter = this.subject();
      var newId = "123";
      var dummyModel = new DS.Model("group",{id:newId});
      var result = adapter.findRecord(
        // mocked store
        {
          findRecord:function(){return dummyModel;},
          createRecord:function(type, options) {
            throw "createRecord should not be called, as correct result was returned earlier - %@ %@".fmt(type, options);
          }
        },
        "dummyType",
        newId
      );
      expect(result).to.equal(dummyModel);
    });
  }
);
