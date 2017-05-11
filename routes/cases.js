
const express = require('express'),
      router  = express.Router();

router.use(function timelog (req, res, next){
    let now

    now = Date.now()
    console.log('[ROUTING] /cases -- Time: ', now.toLocaleString())
    next()
})

router.get("/", function(req, res){
    res.send("Road suppose to load all cases!")
})

router.get("/:id", function(req, res){
    let param

    param = req.params.id
    console.log("User asked for case with id: ", param)
    res.send("Road suppose to load case by id: " + param)
})

module.exports = router