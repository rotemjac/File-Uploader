
myApp.config(function($routeProvider,$httpProvider) {

    // Below is the code to allow cross domain request from web server through angular.js
    $httpProvider.defaults.useXDomain = true;
    //$httpProvider.defaults.withCredentials = true;
    //$httpProvider.defaults.headers.common = 'Content-Type: undefined';
    delete $httpProvider.defaults.headers.common["X-Requested-With"];


    $routeProvider.when('/home',
        {
            templateUrl:'scripts/templates/routeTemplates/homePage.html',
            controller: 'mainCtrl'
    })
    .when('/create',
        {
            templateUrl:'scripts/templates/routeTemplates/createPage.html'
        }
    )
    .when('/upload',
        {
            templateUrl:'scripts/templates/routeTemplates/uploadPage.html'
        }
    )
    .when('/settings',
        {
            templateUrl:'scripts/templates/routeTemplates/settingsPage.html'
        }
    )
    .otherwise({redirectTo: '/home'});

});

