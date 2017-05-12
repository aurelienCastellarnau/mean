const express = require('express'),
      app     = express(),
      router  = express.Router(),
      agent   = require('../models/agentsModel'),
      config  = require('../config.js'),
      jwt     = require('jsonwebtoken');

app.set('superSecret', config.secret);

router.get("/", function(req,res){
    const user = "toto";
    const token = jwt.sign(user, app.get('superSecret'), {

        });
    res.json({
        token: token
    });
});

router.post("/", function(req, res){
    console.log("toto");
})

module.exports = router
