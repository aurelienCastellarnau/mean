const express = require('express'),
      router  = express.Router(),
      jwt     = require('jsonwebtoken'),
      app     = require('../api'),
      cases   = require('../models/casesModel');

router.use(function timelog (req, res, next){
    let now

    now = Date.now()
    console.log('[ROUTING] /cases -- Time: ', now.toLocaleString())
    next()
})

router.get("/", function(req, res){
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                cases.find(function(err, cases) {
                    if (err) {
                        return res.send(err)
                    }
                res.json(cases)
                })
                req.decoded = decoded;
            }
        })
    } else {
        res.status(403).json({
            success: false,
            message: 'No token provided.'
        })
    }
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
