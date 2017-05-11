const   fs       = require('fs'),
        excluded = ['index'];

const   load_roads = function(app) {
    fs.readdir(__dirname, function(err, files) {
        files.forEach(function(file, value, index, array){
            let basename = file.split('.')[0];

            if (basename != "index"){
                fs.lstat( __dirname + '/' + file, function(err, stat){
                    if (!stat.isDirectory()) {
                        app.use('/' + basename, require('./' + file));
                    }
                });
            }
        })
    });
};
module.exports = load_roads;