Mediator.Router.map(function () {

    this.resource('pictures');
    this.resource('picture', { path: '/picture/:picture_id' });

    this.resource('results');
    this.resource('result', { path: '/result/:result_id' });

    this.resource('groups');
    this.resource('group', { path: '/group/:group_id' });
    this.resource('group.edit', { path: '/group/:group_id/edit' });

    this.resource('groupsets');
    this.resource('groupset', { path: '/groupset/:groupset_id' });
    this.resource('groupset.edit', { path: '/groupset/:groupset_id/edit' });

    this.resource('sources');
    this.resource('source', { path: '/source/:source_id' });

    this.resource('connections', function(){
        this.resource('connection', { path: '/:connection_id' }, function(){
            this.route('edit');
        });
        this.route('create');
    });

  /*
    this.resource('connections', function(){
    this.resource('connection', { path: '/:connection_id' }, function(){
      this.route('edit');
    });
    this.route('create');
  });
  
  this.resource('groups', function(){
    this.resource('group', { path: '/:group_id' }, function(){
      this.route('edit');
    });
    this.route('create');
  });
  
  this.resource('groupsets', function(){
    this.resource('groupset', { path: '/:groupset_id' }, function(){
      this.route('edit');
    });
    this.route('create');
  });
  
  this.resource('links', function(){
    this.resource('link', { path: '/:link_id' }, function(){
      this.route('edit');
    });
    this.route('create');
  });
  
  this.resource('pictures', function(){
    this.resource('picture', { path: '/:picture_id' }, function(){
      this.route('edit');
    });
    this.route('create');
  });
  
  this.resource('results', function(){
    this.resource('result', { path: '/:result_id' }, function(){
      this.route('edit');
    });
    this.route('create');
  });
  
  this.resource('sources', function(){
    this.resource('source', { path: '/:source_id' }, function(){
      this.route('edit');
    });
    this.route('create');
  }); */


  
});