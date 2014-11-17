


myApp.service('dataService', function($http,$q,configService) {

    return {

        /* --- Used in mainCtrl --- */
        getDataFromPhpServer: function(dataType) {
            var url;
            switch(dataType) {
                case "list":
                    url = configService.getListUrl();
                    break;
                case "cat":
                    url = configService.getCatDetailsUrl()+arguments[1];
                    break;
                case "image":
                    url = configService.getCatImageUrl()+arguments[1];
                    break;
            }

            var deferObj = $q.defer();
            $http({
                url: url,
                method: "GET"
            })
            .success(function (responseData) {
                deferObj.resolve(responseData);
            })
            .error(function (err) {
                console.log("Error inside fileService.sendFile: " +err);
            });

            return deferObj.promise;
        },
        getDataFromNodeServer: function() {
            var deferObj = $q.defer();
            $http({
                url: configService.getAllCatsDataUrl(),
                method: "GET"
            })
                .success(function (responseData) {
                    deferObj.resolve(responseData);
                })
                .error(function (err) {
                    console.log("Error inside fileService.sendFile: " +err);
                });

            return deferObj.promise;
        },

        /* --- Used to send json in the myCreator directive when we're using node*/
        sendData: function (dataToPass) {
            var deferObj = $q.defer();
            $http({
                url: configService.getCreateUrl(),
                method: "POST",
                contentType: 'application/json; charset=utf-8',
                data: angular.toJson(dataToPass)
            })
                .success(function (responseData) {
                    deferObj.resolve(responseData);
                })
                .error(function (err) {
                    console.log("Error inside fileService.sendFile: " +err);
                });

            return deferObj.promise;
        }
    }

});


myApp.service('fileService', function($http,$q,configService) {

    var uploadUrl = configService.getUploadUrl();

    return {
        sendFile: function(catId,fileToUpload) {

            // create a form with a couple of values
            var formData = new FormData();
            formData.append('photo',fileToUpload);


            var deferObj = $q.defer();
            $http({
                url: uploadUrl+ "/"+catId,
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                transformRequest: angular.indentity,
                contentType: undefined,
                data: formData
            })
                .success(function (responseData) {
                    deferObj.resolve(responseData);
                })
                .error(function (err) {
                    console.log("Error inside fileService.sendFile: " +err);
                });

            return deferObj.promise;
        }
    }
});
