Mediator.Router.map(function () {
  
  this.resource('connection_edit');
  this.resource('connection_edit', { path: '/connection_edit/:connection_edit_id' });
  this.resource('connection_edit.edit', { path: '/connection_edit/:connection_edit_id/edit' });
  
  this.resource('connections');
  this.resource('connection', { path: '/connection/:connection_id' });
  this.resource('connection.edit', { path: '/connection/:connection_id/edit' });
  
  this.resource('source_edit');
  this.resource('source_edit', { path: '/source_edit/:source_edit_id' });
  this.resource('source_edit.edit', { path: '/source_edit/:source_edit_id/edit' });
  
  this.resource('sources');
  this.resource('source', { path: '/source/:source_id' });
  this.resource('source.edit', { path: '/source/:source_id/edit' });
  
});
