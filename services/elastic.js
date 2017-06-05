Cases = require('../models/casesModel');
ESClient = require('../utils/elasticsearch.js');


    const elastic = {
    "init": function init(req, res, next) {

                console.log("[elastic] index cases deleted")
                Cases.find({},{ '_id': 0 }, function (err, c) {// { '_id': 0 },
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
                                //console.log("[ElasticSearch Cases indexation: ", resp)
                            });
                        }
                    }
                }).limit(100)
        req.ESClient = ESClient
        next();
    },
    /*
    ** "une_autre_fonction": 
    */
}

module.exports = elastic

/*
const elastic = {
    "init": function init(req, res, next) {
        Cases.find({}, function (err, c) {// { '_id': 0 },
            if (err) {
                console.log("[ES in /cases routes] indexation error: ", err)
            } else {
                for (let key in c) {
                    c[key].uuid = c[key]._id
                    delete c[key]._id
                    ESClient.index({
                        index: 'cases',
                        id: key,
                        type: 'cases',
                        body: c[key]
                    }, function (err, resp, status) {
                        //console.log("[ElasticSearch Cases indexation: ", resp)
                    });
                }
            }
        }).limit(100)
        req.ESClient = ESClient
        next();
    },
    ///////////////////////////////::
const elastic = {
    "init": function init(req, res, next) {
        ESClient.indices.delete({
            index: 'cases'
        }, function (err, res) {
            if (err)
                console.log(err)
            else {

                console.log("[elastic] index cases deleted")
                Cases.find({}, function (err, c) {// { '_id': 0 },
                    if (err) {
                        console.log("[ES in /cases routes] indexation error: ", err)
                    } else {
                        for (let key in c) {
                            c[key].uuid = c[key]._id
                            //delete c[key]._id
                            ESClient.index({
                                index: 'cases',
                                id: c[key].uuid,
                                type: 'cases',
                                body: c[key]
                            }, function (err, resp, status) {
                                //console.log("[ElasticSearch Cases indexation: ", resp)
                            });
                        }
                    }
                }).limit(100)
            }
        })
        req.ESClient = ESClient
        next();
    },

*/