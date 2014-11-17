
var DBDataManager = function () {

};

DBDataManager.prototype = function () {
    var Q = require('q');
    var collectionLength;

    var initData = function() {
        var myDb = require('./DBconfig').db;
        myDb.collection('catsData').insert(
          [
            {
                name: "Hamlet",
                id: "1",
                description: "cute and cudly",
                birthday: "2004-04-12",
                fur: "gray",
                imageUrl: "http://nirtest.cloudapp.net/interview/image?id=1"
            },
            {
                name: "Ashes",
                id: "2",
                description: "ruins the furniture",
                birthday: "2003-08-11",
                fur: "black",
                imageUrl: "http://nirtest.cloudapp.net/interview/image?id=2"
            },
            {
                name: "Rudikins",
                id: "3",
                description: "dumb as a brick",
                birthday: "2001-06-24",
                fur: "ginger",
                imageUrl: "http://nirtest.cloudapp.net/interview/image?id=3"
            },
            {
                name: "Kribbles",
                id: "4",
                description: "CUTE!",
                birthday: "2011-11-30",
                fur: "ginger",
                imageUrl: "http://nirtest.cloudapp.net/interview/image?id=14"
            },
            {
                name: "Grumples",
                id: "5",
                description: "Grumpy all the time",
                birthday: "2008-10-27",
                fur: "gray",
                imageUrl: "http://nirtest.cloudapp.net/interview/image?id=8",
            },
            {
                name: "myCat",
                id: "6",
                description: "aaaa",
                birthday: "2014-02-01",
                fur: "tricolor"
            },
            {
                name: "catty",
                id: "7",
                description: "aaa",
                birthday: "2014-01-01",
                fur: "tricolor",
                imageUrl: "http://nirtest.cloudapp.net/interview/image?id=10"
            },
            {
                name: "catty",
                id: "8",
                description: "aaa",
                birthday: "2014-01-01",
                fur: "tricolor",
                imageUrl: "http://nirtest.cloudapp.net/interview/image?id=16"
            },
            {
                name: "bunny",
                id: "9",
                description: "desc1",
                birthday: "2012-08-03",
                fur: "ginger",
                imageUrl: "http://nirtest.cloudapp.net/interview/image?id=13"
            },
            {
                name: "cittyCay",
                id: "10",
                description: "Meet citty",
                birthday: "2014-11-13",
                fur: "tricolor",
                imageUrl: "http://nirtest.cloudapp.net/interview/image?id=15"
            }
          ]
            ,function(err, result) {
                if (err) {
                    throw err;
                }
                console.log("Initializing pageContent data in Database: " +result);
            }
        );
    };

    var getCatsData = function () {
        var deferred = Q.defer();
        var myDb = require('./DBconfig').db;

        myDb.collection('catsData').find (
            function(err, document) {
                if (err) {
                    deferred.reject(err); // rejects the promise with `er` as the reason
                }
                else {
                    collectionLength = document.length;
                    deferred.resolve(document); // fulfills the promise with `data` as the value
                }
            });
        return deferred.promise; // the promise is returned
    };

    var saveNewCat = function (catJson) {
        var deferred = Q.defer();
        var myDb = require('./DBconfig').db;

        catJson["id"] = collectionLength+1;
        collectionLength++;

        myDb.collection('catsData').save (
            catJson,
            function(err, document) {
                if (err) {
                    deferred.reject(err); // rejects the promise with `er` as the reason
                }
                else {
                    deferred.resolve(document); // fulfills the promise with `data` as the value
                }
            });
        return deferred.promise; // the promise is returned
    };

    var updateImageUrl = function (catId, imageId) {
        var deferred = Q.defer();
        var myDb = require('./DBconfig').db;

        myDb.collection('catsData').update (
            {
               id: catId
            },
            {
                $set: { imageUrl:imageId }
            },
            function(err, document) {
                if (err) {
                    deferred.reject(err); // rejects the promise with `er` as the reason
                }
                else {
                    deferred.resolve(document); // fulfills the promise with `data` as the value
                }
            });
        return deferred.promise; // the promise is returned
    };

    return {
        initData:initData,
        getCatsData:getCatsData,
        saveNewCat:saveNewCat,
        updateImageUrl:updateImageUrl
    }
}();

module.exports = DBDataManager;




