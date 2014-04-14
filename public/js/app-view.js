var GistApp = window.GistApp || {};

GistApp.AppView = Backbone.View.extend({
    el: $('#gist-app'),

    events: {
        'click #edit-gist': 'edit_gist'
    },

    initialize: function() {
        GistApp.Gists.bind('add', this.add_one, this);

        GistApp.Gists.fetch();
    },

    add_one: function(gist) {
        var view = new GistApp.GistView({ model: gist });

        this.$('#gist-list').append(view.render().el);
    },

    populate_form: function(gist) {
        $('#_id').val(gist.get('_id'));
        $('#github_id').val(gist.get('github_id'));
        $('#description').val(gist.get('description'));
        $('#categories').val(gist.get('categories'));
    },

    edit_gist: function(e) {
        e.preventDefault();

        // find model in collection
        var gist = GistApp.Gists.findWhere({ github_id: $('#github_id').val() });

        gist.save({ 'description': $('#description').val() });

        // TODO: parse lines of textarea into array to get/save categories

        console.log(gist);
    }
});
