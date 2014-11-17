
var express = require('express');
    path = require('path'),
    fs = require('fs'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

var app = express();
app.use(bodyParser()); //If i remove this 'req.body' will be undefined
app.use(logger('dev'));
app.use(cookieParser());
 
/**
 * Development Settings
 */
 
if ('development' == app.get('env')) {
    // This will change in production since we'll be using the dist folder
    app.use(express.static(path.join(__dirname, '../client/.tmp')));

    // This covers serving up the index page
    app.use(express.static(path.join(__dirname, '../client/app')));

    // This is the new way to handle errors in Express 4. not errorHandler().
    // For more about error-first best practices see http://fredkschott.com/post/2014/03/understanding-error-first-callbacks-in-node-js/
    app.use(function(err, req, res, next){
      console.error(err.stack);
      res.send(500, 'Something broke!');
    });
}
 
/**
 * Production Settings
 */
if('production' == app.get('env')) {
app.use(express.static(path.join(__dirname, '/dist')));
}


/* ------------------- Server setup  ---------------------*/
var server = app.listen(3002, function() {
    console.log('Listening on port %d', 3002);
});

//---------------- Routing ----------------//
var routes = require('./app/controllers');
routes.getAllRoutes(app);
//-----------------------------------------//

//---------------- Initialize data in db ----------------//
/*
 var InitDataService = require('./app/services/initDataService.js');
 var initDataService = new InitDataService();
 initDataService.initAllData();
 */
//-----------------------------------------//


module.exports = app;
