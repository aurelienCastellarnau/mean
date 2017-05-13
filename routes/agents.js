const express = require('express'),
      router  = express.Router(),
      agents  = require('../models/agentsModel')
      promise = require('bluebird');

router.use(function timelog (req, res, next){
    let now

    now = Date.now()
    console.log('[ROUTING] /agents -- Time: ', now.toLocaleString())
    next()
})

router.get("/", function(req, res){
    agents
        .find()
        .select('-password')
        .then(function(err, agents) {
            if (err) {
                return res.send(err)
            }
            res.json(agents)
    })
})

module.exports = router
