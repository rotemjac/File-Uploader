
var initDataService = function () {
    console.log("In initDataService constructor");
};

initDataService.prototype = function () {
    var DbDataManager = require('../dao/dbDataManager.js');
    var dbDataManager = new DbDataManager();



    var initAllData = function() {
        dbDataManager.initData();
    };

    return {
        initAllData:initAllData
    };
}();

module.exports = initDataService;

