/* jshint expr:true */
import { expect, assert } from 'chai';
import Ember from 'ember';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { beforeEach } from 'mocha';

describeComponent(
  'category-tagcloud',
  'Integration: CategoryTagcloudComponent',
  {
    integration:false
  },

  function() {

    var items;

    beforeEach(function() {
      items = [
        {key:"balla", value:"3", selected:false},
        {key:"tataaa", value:"2", selected:false}
      ];
    });

    it('renders', function() {
      this.render(hbs`{{category-tagcloud}}`);
      expect(this.$()).to.have.length(1);
    });

    it(' calculates computed property', function() {
      var component = this.subject();

      Ember.run(function() {
        component.set('items', items);
      });
      expect(component.get('allSelected'),"non-selected item list").to.be.true;

    });

    it('calculates computed property with elements selected', function() {
      var component = this.subject();

      items[1].selected=true;

      Ember.run(function() {
        component.set('items', items);
      });

      expect(component.get('allSelected'), "itemlist with selected item").to.be.false;

    });

    it('calculates computed property when undefined', function() {
      var component = this.subject();

      Ember.run(function() {
        component.set('items', undefined);
      });

      expect(component.get('allSelected'), "itemlist with selected item").to.be.false;

    });

    it('shows all categories active when none selected', function(){

      var component = this.subject();

      Ember.run(function() {
        component.set('items', items);
      });

      // append the component to the DOM
      this.render(hbs`{{category-tagcloud}}`);

      // assert default state
      expect(this.$('li:nth-child(1)').text().trim()).to.equal('balla');
      assert(this.$('li:nth-child(1)').hasClass('allActive'), "1st tag is marked active"+this.$('li:nth-child(1)').attr('class'));
      expect(this.$('li:nth-child(2)').text().trim()).to.equal('tataaa');
      assert(this.$('li:nth-child(2)').hasClass('allActive'), "2nd tag is marked active");
    });

    it('shows categories active/inactive when any are selected', function(){

      items[1].selected= true;

      var component = this.subject();

      Ember.run(function() {
        component.set('items', items);
      });
      // append the component to the DOM
      this.render(hbs`{{category-tagcloud}}`);

      // assert default state
      assert(!this.$('li:nth-child(1)').hasClass('allActive'), "none marked allActive");
      assert(!this.$('li:nth-child(2)').hasClass('allActive'), "none marked allActive");

      expect(this.$('li:nth-child(1)').text().trim()).to.equal('balla');
      assert(!this.$('li:nth-child(1)').hasClass('active'), "unselected tag is marked inactive");
      expect(this.$('li:nth-child(2)').text().trim()).to.equal('tataaa');
      assert(this.$('li:nth-child(2)').hasClass('active'), "selected tag is marked active");
    });

    it('triggers external action when button is clicked', function(assert) {

      // component instance
      var component = this.subject();

      Ember.run(function() {
        component.set('items', items);
      });

      // render it
      this.render(hbs`{{category-tagcloud}}`);

      var targetObject = {
        externalAction: function(something) {
          // we have the assertion here which will be
          // called when the action is triggered
          expect(something).to.eq(items[0].key);
          assert();
        }
      };

      // setup a fake external action to be called when
      // button is clicked
      component.set('addCategory', 'externalAction');
      component.set('remove', 'externalAction');

      // set the targetObject to our dummy object (this
      // is where sendAction will send its action to)
      component.set('targetObject', targetObject);

      // click the button
      this.$('li:nth-child(1)').click();
    });

    it('triggers correct external action when 2nd button is clicked', function(assert) {

      var component = this.subject();

      Ember.run(function() {
        component.set('items', items);
      });

      this.render(hbs`{{category-tagcloud}}`);

      var targetObject = {
        externalAction: function(something) {
          expect(something).to.eq(items[1].key);
          assert();
        }
      };

      component.set('addCategory', 'externalAction');
      component.set('remove', 'externalAction');
      component.set('targetObject', targetObject);

      // click the button
      this.$('li:nth-child(2)').click();
    });

    it('triggers correct external action when remove button is clicked', function(assert) {

      var component = this.subject();

      items[1].selected=true;

      Ember.run(function() {
        component.set('items', items);
      });

      this.render(hbs`{{category-tagcloud}}`);

      var targetObject = {
        externalAction: function(something) {
          expect(something).to.eq(items[1].key);
          assert();
        }
      };

      component.set('remove', 'externalAction');
      component.set('targetObject', targetObject);

      // click the button
      this.$('li:nth-child(2)').click();
    });
  }
);
