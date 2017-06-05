Cases = require('../models/casesModel');
ESClient = require('../utils/elasticsearch.js');


const elastic = {
    "init": function init() {
        Cases.find({}, { '_id': 0 }, function (err, c) {// { '_id': 0 },
            if (err) {
               // console.log("[ES in /cases routes] indexation error: ", err)
            } else {
                for (let key in c) {
                    ESClient.index({
                        index: 'cases',
                        id: key,
                        type: 'cases',
                        body: c[key]
                    }, function (err, resp, status) {
                      //  console.log("[ElasticSearch Cases indexation: ", resp)
                    });
                }
            }
        }).limit(100)
    }
}
module.exports = elastic
