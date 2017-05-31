const express = require('express'),
      router  = express.Router(),
      agents  = require('../models/agentsModel'),
      verify  = require('../utils/verify'),
      promise = require('bluebird');

router.use(function timelog (req, res, next){
    let now

    now = Date.now()
    console.log('[ROUTING] /agents -- Time: ', now.toLocaleString())
    next()
})

router.use(verify.token)

router.get("/", function(req, res){
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
})

router.get('/properties', function(req, res){
    agents.aggregate([{
        "$group": {
                _id:    null,
                role:   { $addToSet: "$role" },
                status: { $addToSet: "$status" },
        }
    }], function(err, properties){
        if (err){
            console.log("[API stacktrace] Error rised on GET /agents/properties")
            res.status(500).json(err)
        }
        console.log("[API stacktrace] GET /agents/properties succeed: ", properties)
        res.status(200).json(properties)
    })
})

router.get("/:id", function(req, res){
    let param

    param = req.params.id
    agents.findById(param, function(err, a) {
        if (err) {
            return res.send(err)
        }
        res.json(a)
    })

})

router.put("/:id/edit", function(req, res){
    const id = req.params.id;
    const role = req.decoded._doc.role
    console.log('edit');
    if (role) {
        if ("CHEF" !== role && "DETECTIVE" !== role) {
            res.json({ success: false, message: "you don't have rights to do this"})
        } else {
            agents.findById(id, function(err, a) {
                if (err) {
                    return res.send(err)
                }
                for (elem in a) {
                    a[elem] = req.body[elem] || a[elem]
                }

                a.save(function(err, a){
                    if (err) {
                        return res.send(err)
                    }
                    res.send(a);
                })
            })
        }
    } else {
        res.status(403).json({
            success: false,
            message: 'no role provided.'
        })
    }
})

router.delete('/:id', function(req,res){
    const id    = req.params.id;
    const role  = req.decoded._doc.role

    if (role) {
        if ('CHEF' !== role) {
            return res.json({ success: false, message: "you don't have rights to do this"})
        } else {
            agents.remove({ _id: id}, function(err, result){
            if (err) return res.status(500).send({err: 'Error: Could not delete this case'});
            //si ça a déjà été delet on te le dit gentillement
            if(!result) return res.status(400).send({err: 'case deleted from database'});
            console.log('deleted!!!');
            res.send(result);
            });
        }
    } else {
        res.status(403).json({
            success: false,
            message: 'no role provided.'
        })
    }
});

module.exports = router
