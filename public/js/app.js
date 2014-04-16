var GistApp = window.GistApp || {};

window.GistAppView = new GistApp.AppView();

(function($) {
    'use strict';

    var _gist_data;

    var _init = function() {
        $('#cache-gists').on('click', function() {
            console.log('caching gists!');

            $.getJSON('/api/populate', function(data) {
                for (var i = 0; i < data.length; i++) {
                    // make sure gist isn't already cached
                    if (!GistApp.Gists.findWhere({ github_id: data[i].id })) {
                        _gist_data = {
                            github_id: data[i].id,
                            public: data[i].public,
                            description: data[i].description,
                            html_url: data[i].html_url,
                            updated_at: data[i].updated_at,
                        };

                        GistApp.Gists.create(_gist_data);
                    } else {
                        console.log('skipping - gist already cached');
                    }
                }
            });
        });
    };

    _init();
})(window.jQuery);
