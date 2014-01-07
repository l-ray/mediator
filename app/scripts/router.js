Mediator.Router.map(function () {
  
    /*
  this.resource('group_edit');
  this.resource('group_edit', { path: '/group_edit/:group_edit_id' });
  this.resource('group_edit.edit', { path: '/group_edit/:group_edit_id/edit' });
  
  this.resource('groupset_edit');
  this.resource('groupset_edit', { path: '/groupset_edit/:groupset_edit_id' });
  this.resource('groupset_edit.edit', { path: '/groupset_edit/:groupset_edit_id/edit' });
  
  this.resource('groupsets');
  this.resource('groupset', { path: '/groupset/:groupset_id' });
  this.resource('groupset.edit', { path: '/groupset/:groupset_id/edit' });
  
  this.resource('picture_edit');
  this.resource('picture_edit', { path: '/picture_edit/:picture_edit_id' });
  this.resource('picture_edit.edit', { path: '/picture_edit/:picture_edit_id/edit' });

     */

  this.resource('pictures');
  this.resource('picture', { path: '/picture/:picture_id' });

  this.resource('results');
  this.resource('result', { path: '/result/:result_id' });

  this.resource('groups');
  this.resource('group', { path: '/group/:group_id' });
  this.resource('group.edit', { path: '/group/:group_id/edit' });


    /* this.resource('source_edit');
     this.resource('source_edit', { path: '/source_edit/:source_edit_id' });
     this.resource('source_edit.edit', { path: '/source_edit/:source_edit_id/edit' });
     */
  
  this.resource('sources');
  this.resource('source', { path: '/source/:source_id' });
  /*this.resource('source.edit', { path: '/source/:source_id/edit' });*/

  this.resource('connections', function(){
    this.resource('connection', { path: '/:connection_id' }, function(){
        this.route('edit');
    });
    /* this.resource('connection', { path: '/connection/:source_id/:startDate' }); */
    this.route('create');
  });
});
