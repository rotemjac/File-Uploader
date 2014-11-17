

myApp.factory('configService', function($q,$timeout) {

    var serverType =  "php";

    /* ---------- Urls ---------- */
    var baseUrl       = 'http://nirtest.cloudapp.net/interview';
    var listUrl       = baseUrl+'/cat/list';
    var catDetailsUrl = baseUrl+'/cat?id=';
    var catImageUrl   = baseUrl+'/image?id=';

    var nodeBaseUrl       = "http://localhost:3002/data";
    /* -------------------------- */

    return {
        getServerType: function () {
            return serverType;
        },
        setServerType: function (type) {
            serverType = type;
        },

        getListUrl :function() {
            return listUrl;
        },
        getCatDetailsUrl :function() {
            return catDetailsUrl;
        },
        getCatImageUrl :function() {
            return catImageUrl;
        },
        getAllCatsDataUrl : function () {
            return nodeBaseUrl;
        },
        getUploadUrl : function () {
            return nodeBaseUrl+'/upload';
        },
        getCreateUrl : function () {
            return nodeBaseUrl+'/create';
        },
        getCatImageUrl : function () {
            return nodeBaseUrl+'/image/';
        },
        getCatImageById : function (imageId) {
            return nodeBaseUrl+'/image/'+imageId;
        }
    }
});


