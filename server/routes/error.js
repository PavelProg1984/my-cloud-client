(function(module) {
    "use strict";

    var path = require('path');

    module.exports = function(router) {
        router.get('/error', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/index.html'));
        });
        return router;
    };
}(module));
