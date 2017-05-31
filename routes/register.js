const express = require('express'),
      router  = express.Router(),
      agents  = require('../models/agentsModel'),
      verify  = require('../utils/verify'),
      promise = require('bluebird');

router.use(function timelog (req, res, next){
    let now

    now = Date.now()
    console.log('[ROUTING] /register -- Time: ', now.toLocaleString())
    next()
})

router.post("/", function (req, res){
    let agent
    agent = new agents(req.body)
    agent.status = 'waiting'
    console.log(agent)
    agent
    .save(function(err, a) {
        if (err) {
            return res.status(401).send(err)
        }
        res.json(a)
    })
})

module.exports = router
