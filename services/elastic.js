Cases = require('../models/casesModel');
ESClient = require('../utils/elasticsearch.js');

/*
** Service de gestion de l'index
** ElasticSearch. Pour l'instant, juste le add.
*/
const elastic = {
    "init": function init() {
        Cases.find({}, { '_id': 0 }, function (err, c) {// { '_id': 0 },
            if (err) {
                // console.log("[ES in /cases routes] indexation error: ", err)
            } else {
                index(c, 100)
            }
        })
    }
}

function index(c, limit, last) {
    if (!last)
        last = 0
    for (let key = last; key < c.length && key < limit; key++) {
        ESClient.index({
            index: 'cases',
            id: key,
            type: 'cases',
            body: c[key]
        }, function (err, resp, status) {
            if (key === limit - 1 && key !== (c.length - 1))
                index(c, limit + 100, key)
        });
    }
}
module.exports = elastic
