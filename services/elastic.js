Cases = require('../models/casesModel');
ESClient = require('../utils/elasticsearch.js');

const elastic = {
    "init": function init(req, res, next) {
        Cases.find({}, { '_id': 0 }, function (err, c) {
            if (err) {
                console.log("[ES in /cases routes] indexation error: ", err)
            } else {
                for (let key in c) {
                    ESClient.index({
                        index: 'cases',
                        id: key,
                        type: 'cases',
                        body: c[key]
                    }, function (err, resp, status) {
                        console.log("[ElasticSearch Cases indexation: ", resp)
                    });
                }
            }
        }).limit(100)
        next();
    },
    /*
    ** "une_autre_fonction": 
    */
}

module.exports = elastic