(function(){
    "use strict";

    var express = require('express');
    var path = require('path');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');

    var app = express();

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    if (app.get('env') === 'development') {
        // This will change in production since we'll use the dist folder
        app.use(express.static(path.join(__dirname, '../client')));

        // Error Handling
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    if (app.get('env') === 'production') {
        // changes it to use the optimized version for production
        app.use(express.static(path.join(__dirname, '/dist')));

        // production error handler
        // no stacktraces leaked to user
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });
    }

    var router = require('./routes/routes');

    app.use('/', router);

    module.exports = app;
})();
