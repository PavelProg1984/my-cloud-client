(function(module) {
    "use strict";

    var express = require('express'),
        router = express.Router();

    require('./routes/home')(router);
    require('./routes/about')(router);
    require('./routes/files')(router);
    require('./routes/error')(router);
    require('./routes/upload')(router);
    require('./routes/downloadRouter')(router);
    require('./routes/createFolder')(router);

    module.exports = router;
}(module));