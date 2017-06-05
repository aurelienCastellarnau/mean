const express = require('express'),
    router = express.Router(),
    verify = require('../utils/verify'),
    Cases = require('../models/casesModel'),
    ESClient = require('../utils/elasticsearch.js');

router.use(function timelog(req, res, next) {
    let now

    now = Date.now()
    console.log('[ROUTING] /elasticsearch -- Time: ', now.toLocaleString())
    next()
})

router.use(verify.token)

router.get('/', function (req, res) {
    ESClient.search({
        index: 'cases',
        body: {
            "from": 0, "size": 500,
            query: {
                "match_all": {}
            }
        }
    })
        .then(resp => res.status(200).json(resp),
        err => console.log(err.message))
})

router.get('/:param', function (req, res) {
    let param = req.params.param;

    console.log("[api stacktrace] on elasticsearch/param: ", param);
    /*
    ** Le client elastic/node fonctionne comme les requêtes elasticsearch
    ** La composition de l'objet est type... les champs index, body, query etc... 
    ** regarde là : https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html
    ** on peut faire, genre, beaucoup, beaucoup de choses...
    */
    ESClient.search({
        index: 'cases',
        body: {
            "from": 0,
            "size": 500,
            "query": {
                "match": {
                    "_all": param
                }
            }
        }
    })
        .then(resp => res.status(200).json(resp),
        err => console.log(err.message))
})
module.exports = router
