
/* provides markup,data and logic for the 'settings page' page  */
myApp.directive('mySettings', ['configService',function(configService) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl : 'scripts/templates/directiveTemplates/settingsForm.html',
        link: function (scope,iElement, iAttrs) {
            scope.serverType = configService.getServerType();
            scope.$watch('serverType', function(value) {
                configService.setServerType(value);
            });
        }
    };
}]);


/* provides markup,data and logic for the 'create cat' page  */
myApp.directive('myCreator', ['dataService','configService',function(dataService,configService) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: function (tElement, tAttrs) {
            if (configService.getServerType() == "node") {
                return 'scripts/templates/directiveTemplates/createForm.html';
            }
            else {
                return 'scripts/templates/directiveTemplates/createFormNative.html';
            }
        },
        link: function (scope,iElement, iAttrs) {
            if (configService.getServerType() == "node") {
                scope.formData = {
                    name: "",
                    id: "",
                    description: "",
                    birthday: "",
                    fur: "gray",
                    imageUrl: ""
                };

                scope.create = function() {
                    dataService.sendData(scope.formData);
                }
            }
        }
    };
}]);

/* provides markup,data and logic for the 'upload image' page  */
myApp.directive('myUploader', ['dataService','configService',function(dataService , configService) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: function (tElement, tAttrs) {
            if (configService.getServerType() == "node") {
                return 'scripts/templates/directiveTemplates/uploadFormNative2.html';
            }
            else {
                return 'scripts/templates/directiveTemplates/uploadFormNative.html';
            }
        }
    };
}]);


/* Provide logic for uploading a file with ng-model (angular's ngModel doesn't deal with files */
myApp.directive('ngFile', ['$parse','fileService',function($parse,fileService) {
    return {
        restrict: 'A',
        compile: function compile(tElement, tAttrs, transclude) {
            return {
                pre: function preLink($scope, iElement, iAttrs, controller) {
                    var modelGetter = $parse(iAttrs.ngFile);
                    var modelSetter = modelGetter.assign;

                    //One way data binding (DOM --> Model)
                    iElement.bind('change', function() {
                        modelSetter($scope, iElement[0].files[0]);
                        $scope.$apply();
                    });
                },
                post: function postLink($scope, iElement, iAttrs, controller) {
                    $scope.upload = function() {

                        var promise = fileService.sendFile($scope.catId,$scope.fileModel);
                        promise.then(
                            //Success callback
                            function(dataReturned) {
                                console.log('Success: ' + dataReturned);
                            },
                            //Error callback
                            function(reason) {
                                console.log('Failed: ' + reason);
                            });
                    }

                }
            }
        }
    };
}]);

/* Wrap up the jqueryUI plugin */
myApp.directive('myDatepicker', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                element.datepicker({
                    dateFormat:'dd/mm/yy',
                    onSelect:function (date) {
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(date);
                        });
                    }
                });
            });
        }
    }
});

/* Loads the image markup dynamically (depends if the item has an image or not) this is in order to avoid receiving an error when trying to load a missing image */
myApp.directive('myImage', function($compile,$parse,configService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div> </div> ',
        link : function (scope, iElement, iAttrs) {
            scope.$on('finishedPopulating', function (event) {
                var url = $parse(iAttrs.source)(scope);
                //Add the <img> tag only if there is a valid url
                if (url) {
                    //Just in case that we're using the node server - we need to perform some url clean up
                    if (configService.getServerType() == 'node') {
                        var strToRaplace = configService.getCatImageUrl();
                             url = url.replace(strToRaplace, "");
                    }
                    //The validation check for both cases
                    if ( (!(url.indexOf("undefined") > -1) ) && (url.length > 0) ) {
                        iElement.append('<img ng-src="{{cat.imageUrl}}" style="max-width:100%;height:auto;"/>');
                        $compile(iElement.contents())(scope);
                    }
                }
            });
        }
    }
});
