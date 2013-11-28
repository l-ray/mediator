Mediator.Router.map(function () {
  
  this.resource('connection_edit');
  this.resource('connection_edit', { path: '/connection_edit/:connection_edit_id' });
  this.resource('connection_edit.edit', { path: '/connection_edit/:connection_edit_id/edit' });
  
  this.resource('connections');
  this.resource('connection', { path: '/connection/:connection_id' });
  this.resource('connection.edit', { path: '/connection/:connection_id/edit' });
  
  this.resource('picture_edit');
  this.resource('picture_edit', { path: '/picture_edit/:picture_edit_id' });
  this.resource('picture_edit.edit', { path: '/picture_edit/:picture_edit_id/edit' });
  
  this.resource('pictures');
  this.resource('picture', { path: '/picture/:picture_id' });
  this.resource('picture.edit', { path: '/picture/:picture_id/edit' });
  
  this.resource('result_edit');
  this.resource('result_edit', { path: '/result_edit/:result_edit_id' });
  this.resource('result_edit.edit', { path: '/result_edit/:result_edit_id/edit' });
  
  this.resource('group_edit');
  this.resource('group_edit', { path: '/group_edit/:group_edit_id' });
  this.resource('group_edit.edit', { path: '/group_edit/:group_edit_id/edit' });
  
  this.resource('groups');
  this.resource('group', { path: '/group/:group_id' });
  this.resource('group.edit', { path: '/group/:group_id/edit' });
  
  this.resource('results');
  this.resource('result', { path: '/result/:result_id' });
  this.resource('result.edit', { path: '/result/:result_id/edit' });
  
  this.resource('source_edit');
  this.resource('source_edit', { path: '/source_edit/:source_edit_id' });
  this.resource('source_edit.edit', { path: '/source_edit/:source_edit_id/edit' });
  
  this.resource('sources');
  this.resource('source', { path: '/source/:source_id' });
  this.resource('source.edit', { path: '/source/:source_id/edit' });
  
});
