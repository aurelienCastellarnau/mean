const express = require('express'),
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    app = require('../api'),
    verify = require('../utils/verify'),
    Cases = require('../models/casesModel'),
    ESClient = require('../utils/elasticsearch.js');

router.use(function timelog(req, res, next) {
    let now

    now = Date.now()
    console.log('[ROUTING] /search -- Time: ', now.toLocaleString())
    next()
})

module.exports = router
