var GistApp = window.GistApp || {};

GistApp.GistCollection = Backbone.Collection.extend({
    model: GistApp.Gist,

    url: '/api/gists'
});

GistApp.Gists = new GistApp.GistCollection();
