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

router.get('/', function(req, res){
    ESClient.search({
        index: 'cases',
        body: {
            "from" : 0, "size" : 500,
            query: {
                "match_all": {}
            }
        }
    })
    .then(resp => res.status(200).json(resp), 
            err => console.log(err.message))
})
module.exports = router
