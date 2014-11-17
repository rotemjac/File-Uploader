
/* Controller of the 'home' page*/
myApp.controller('mainCtrl', ['$scope','$timeout','dataService','configService',function($scope,$timeout,dataService,configService) {

    $scope.catsDetails = [];

    /* Wait that all other functions will be defined and then choose the server */
    $timeout(function () {
        if ( configService.getServerType() == "php" ) {
            initDataFromPhpServer();
        }
        else if ( configService.getServerType() == "node" ){
            initDataFromNodeServer();
        }
        else {
            console.log("Error - wrong server type was chosen");
        }
    },100);

    /* ------------------------- Data for the php app ------------------------- */

    /* --- Fields --- */
    var numberOfCats;
    var currentNumberOfCats=0; //I'm using this variable and not '$scope.catsDetails.length' because the length of an object array is wrong

    /* --- Methods --- */
    //Get the cats list from server and start populating the 'catsDetails' array
    var initDataFromPhpServer = function () {
        var promise = dataService.getDataFromPhpServer("list");
        promise.then(
            //Success callback
            function(returnedList) {
                numberOfCats = returnedList.cats.length;
                populateCats(returnedList);
            },
            //Error callback
            function(reason) {
                console.log('Failed: ' + reason);
            }
        );
    };

    var populateCats = function (data) {
        $.each(data.cats, function( index, value ) {
            populateCatData(index,value.id);
        });
    };

    var populateCatData = function (index,idOfCat) {
        var promise = dataService.getDataFromPhpServer("cat",idOfCat);
        promise.then(
            //Success callback
            function(returnedCat) {
                //#1 - increment callback counter (Each returned callback will increment the counter,and when we'll reach the last callback the broadcast event will be fired - step #3).
                currentNumberOfCats++;

                //#2 - populate data of cat
                $scope.catsDetails[index] = returnedCat;
                if (returnedCat.images[0]) {
                    $scope.catsDetails[index]["imageUrl"] = configService.getCatImageUrl()+returnedCat.images[0].id;
                }
                $scope.catsDetails[index]["id"] = idOfCat;

                //#3 - check if we can fire broadcast event
                if (currentNumberOfCats == numberOfCats) {
                    //Give the last updated cat some time to settle (populating the 'imageUrl' field) before firing the event
                    $timeout(function() {
                        $scope.$broadcast('finishedPopulating');
                        currentNumberOfCats=0; //For next time..
                    }, 100);
                }
            },
            //Error callback
            function(reason) {
                console.log('Failed: ' + reason);
            }
        );
    };

    /* ------------------------- Data for the node app ------------------------- */
    var initDataFromNodeServer = function () {
        var promise = dataService.getDataFromNodeServer();
        promise.then(
            //Success callback
            function(returnedList) {
                $scope.catsDetails = returnedList;
                $.each($scope.catsDetails, function( index, value ) {
                    currentNumberOfCats++;
                    var imageId = value.imageUrl;
                    value.imageUrl = configService.getCatImageById(imageId);
                });

                //Give the last updated cat some time to settle (populating the 'imageUrl' field) before firing the event
                $timeout(function() {
                     $scope.$broadcast('finishedPopulating');
                }, 100);
            },
            //Error callback
            function(reason) {
                console.log('Failed: ' + reason);
            }
        );
    };

}]);

