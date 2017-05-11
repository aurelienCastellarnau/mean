
const express = require('express'),
      router  = express.Router(),
      cases   = require('../models/models');

router.use(function timelog (req, res, next){
    let now

    now = Date.now()
    console.log('[ROUTING] /cases -- Time: ', now.toLocaleString())
    next()
})

router.get("/", function(req, res){
    cases.find(function(err, cases) {
        if (err) {
            return res.send(err)
        }
        res.json(cases)
    })
})

router.get("/:id", function(req, res){
    let param

    param = req.params.id
    cases.findById(param, function(err, cases) {
        if (err) {
            return res.send(err)
        }
        res.json(cases)
    })

})

module.exports = router
