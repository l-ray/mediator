Mediator.Router.map(function () {

    this.resource('pictures', function() {
        this.resource('picture', { path: '/:picture_id' });
    });

    this.resource('results', function() {
        this.resource('result', { path: '/:result_id' });
    });

    this.resource('groups', function() {
        this.resource('group', { path: '/:group_id' }, function() {
            this.route('edit');
        });
    });

    this.resource('groupsets', function() {
        this.resource('groupset', { path: '/:groupset_id' }, function() {
            this.route('edit');
        });
        this.route('create');
    });

    this.resource('sources', function() {
        this.resource('source', { path: '/:source_id' }, function() {
            this.route('edit');
        });
    });

    this.resource('connections', function(){
        this.resource('connection', { path: '/:connection_id' }, function(){
            this.route('edit');
        });
        this.route('create');
    });

    this.resource('links', function(){
        this.resource('link', { path: '/:link_id' }, function(){
            this.route('edit');
        });
    });

});