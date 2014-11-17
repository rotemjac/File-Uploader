

module.exports.getAllRoutes = function(app) {

    //Add headers to response in order to avoid the next bug: XMLHttpRequest cannot load http:// 'Access-Control-Allow-Origin' header is present on the requested resource.
    app.get('/*',function(req,res,next){
        //Add headers
        res.header('Access-Control-Allow-Origin', '*');
        // Request headers you wish to allow

        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        // Request methods you wish to allow
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.header('Access-Control-Allow-Credentials', true);
        next(); //
    });
    app.post('/*',function(req,res,next){
        //Add headers
        res.header('Access-Control-Allow-Origin', '*');
        // Request headers you wish to allow

        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, enctype");
        // Request methods you wish to allow
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.header('Access-Control-Allow-Credentials', true);
        next(); //
    });
    app.options('/*',function(req,res,next){
        //Add headers
        res.header('Access-Control-Allow-Origin', '*');
        // Request headers you wish to allow

        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        // Request methods you wish to allow
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.header('Access-Control-Allow-Credentials', true);
        next(); //
    });

    //---------- Http calls from website -----------//
    var appDataRequired = require('./dataCtrl.js');

    app.get ('/data',                      appDataRequired.getData);
    app.post('/data/create',               appDataRequired.saveData);
    app.get ('/data/image/:imageId',       appDataRequired.getImage);
    //app.post('/data/upload/:catId',        appDataRequired.saveImage);
    app.post('/data/upload/',        appDataRequired.saveImage);
};