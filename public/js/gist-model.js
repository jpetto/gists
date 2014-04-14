var GistApp = window.GistApp || {};

GistApp.Gist = Backbone.Model.extend({
    // mongo uses _id
    idAttribute: '_id',

    defaults: {
        github_id: 0,
        public: true,
        description: '',
        html_url: '',
        updated_at: null,
        categories: []
    }
});
