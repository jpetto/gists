var GistApp = window.GistApp || {};

GistApp.GistView = Backbone.View.extend({
    tagName: 'li',
    className: 'gist gist-item',
    template: _.template($('#gist-item-template').html()),

    events: {
        'click .edit': 'edit_gist'
    },

    initialize: function() {
        // re-render the gist when it changes
        this.model.bind('change', this.render, this);
    },

    edit_gist: function(e) {
        e.preventDefault();

        window.GistAppView.populate_form(this.model);
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));

        // need to authenticate to get private gists
        if (!this.model.get('public')) {
            this.$el.addClass('private');
        }

        return this;
    }
});
