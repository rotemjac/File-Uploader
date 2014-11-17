
var DataManager = function () {
    console.log("In DataManager constructor");
};

DataManager.prototype = function () {
    var Q = require('q');
        fs = require('fs');

    //------- require dao object -------- //
    var DBDataManager = require('../dao/dbDataManager.js');
    var dbDataManagerObj = new DBDataManager();
    // ----------------------------------- //

	var getCatsData = function() {
        var deferred = Q.defer();
        var promise;

        //Get the relevant content
        promise = dbDataManagerObj.getCatsData();

        //When the promise is returned - handle it
        promise.then(function (document) {
            deferred.resolve(document); // fulfills the promise with `data` as the value
        })
        .fail(function(err) {
                console.log("Error: " +err);
                deferred.reject(err); // rejects the promise with `er` as the reason
        });

        return deferred.promise; // the promise is returned
	};

    var saveNewCat = function(catJson) {
        var deferred = Q.defer();
        var promise;

        //Get the relevant content
        promise = dbDataManagerObj.saveNewCat(catJson);

        //When the promise is returned - handle it
        promise.then(function (document) {
            deferred.resolve(document); // fulfills the promise with `data` as the value
        })
            .fail(function(err) {
                console.log("Error: " +err);
                deferred.reject(err); // rejects the promise with `er` as the reason
            });

        return deferred.promise; // the promise is returned
    };

    var updateImageUrl = function(catId, imageId) {
        var deferred = Q.defer();
        var promise;

        //Get the relevant content
        promise = dbDataManagerObj.updateImageUrl(catId, imageId);

        //When the promise is returned - handle it
        promise.then(function (document) {
            deferred.resolve(document); // fulfills the promise with `data` as the value
        })
        .fail(function(err) {
                console.log("Error: " +err);
                deferred.reject(err); // rejects the promise with `er` as the reason
        });

        return deferred.promise; // the promise is returned
    };


    //Public methods
	return {
        getCatsData: getCatsData,
        saveNewCat : saveNewCat,
        updateImageUrl:updateImageUrl
	}
}();

module.exports = DataManager;