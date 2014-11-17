

/* Get data of all cats */
module.exports.getData = function(req, res) {
    console.log("In dataCtrl.getData");
	var DataManager = require('../services/dataManager.js');
	var dataManagerObj = new DataManager();

    var promise = dataManagerObj.getCatsData();
    promise.then(function (document) {
        res.send(document);
    })
    .fail(function(err) {
            console.log("Error: " +err);
            throw err;
    });
};



/* Save data of a new cat. */
module.exports.saveData = function(req, res) {
    console.log("In dataCtrl.getData");
    var DataManager = require('../services/dataManager.js');
    var dataManagerObj = new DataManager();

    var catJson = req.body;

    var promise = dataManagerObj.saveNewCat(catJson);
    promise.then(function (document) {
        res.send(document);
    })
    .fail(function(err) {
            console.log("Error: " +err);
            throw err;
    });
};

module.exports.getImage = function(req, res) {
    console.log("In dataCtrl.getImage");
    var imageId = req.params.imageId;
    res.sendFile('cat_' + imageId + '.jpg', { root: path.join(__dirname, '../images') });
};



module.exports.saveImage = function(req, res) {
    console.log("In dataCtrl.saveImage");
    var DataManager = require('../services/dataManager.js');
    var dataManagerObj = new DataManager();

    var dirToStore = __dirname.replace("controllers","images");
    var catId;

    var formidable = require('formidable'),
        http = require('http'),
        util = require('util');
        fs   = require('fs');

    var maximum = -1;
    fs.readdir(dirToStore, function (err, files) {
        files.forEach(function(entry,index) {
            tempValue = entry.replace("cat_", "");
            files[index] = parseInt( tempValue.replace(".jpg", "") );
            if ( files[index] > maximum ) {
                maximum = files[index];
            }
        });

        // parse a file upload
        var form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {

            catId = parseInt( fields.cat_id );

            // `file` is the name of the <input> field of type `file`
            var   old_path  = files.photo.path;
            var   file_size = files.photo.size;
            var   file_ext  = files.photo.name.split('.').pop();


            var   file_name = "cat_"+(maximum+1);
            var   new_path  = path.join(dirToStore, file_name + '.' + file_ext);

            fs.readFile(old_path, function(err, data) {
                fs.writeFile(new_path, data, function(err) {
                    fs.unlink(old_path, function(err) {
                        if (err) {
                            res.status(500);
                            res.json({'success': false});
                        }
                        else {
                            dataManagerObj.updateImageUrl(catId, maximum+1);
                            res.status(200);
                            res.json({'success': true});
                        }
                    });
                });
            })
        });

    });
};