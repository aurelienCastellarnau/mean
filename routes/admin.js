const express = require('express'),
      router  = express.Router(),
      agents  = require('../models/agentsModel'),
      verify  = require('../utils/verify'),
      promise = require('bluebird');

router.use(function timelog (req, res, next){
    let now

    now = Date.now()
    console.log('[ROUTING] /admin -- Time: ', now.toLocaleString())
    next()
})

router.use(verify.token)

router.get("/", function(req, res){
  const role = req.decoded._doc.role
  if (role) {
        if ("CHEF" !== role) {
            res.json({ success: false, message: "you don't have rights to do this"})
        } else {
          agents
                .find()
                .select('-password')
                .then(function(err, a) {
                    if (err) {
                        return res.send(err)
                    }
                    console.log(a);
                    res.json(a)
                })
            }
        } else {
        res.status(403).json({
            success: false,
            message: 'no role provided.'
        })
    }
})

module.exports = router
