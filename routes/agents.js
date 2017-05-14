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
        .then(function(err, agents) {
            if (err) {
                return res.send(err)
            }
            res.json(agents)
    })
})

router.get("/:id", function(req, res){
    let param

    param = req.params.id
    agents.findById(param, function(err, agents) {
        if (err) {
            return res.send(err)
        }
        res.json(agents)
    })

})

router.post("/create", function (req, res){
    let agent
    const role = req.cookies.role

    if (role) {
        if ("CHEF" !== role && "DETECTIVE" !== role) {
            res.json({ success: false, message: "you don't have rights to do this"})
        } else {
            agent = new agents(req.body)
            agent
            .save(function(err, agent) {
                if (err) {
                    return res.status(401).send(err)
                }
                res.json(agent)
            })
        }
    } else {
        res.status(403).json({
            success: false,
            message: 'no role provided.'
        })
    }
})

router.put("/:id/edit", function(req, res){
    const id = req.params.id;
    const role = req.cookies.role

    if (role) {
        if ("CHEF" !== role && "DETECTIVE" !== role) {
            res.json({ success: false, message: "you don't have rights to do this"})
        } else {
            agents.findById(id, function(err, agent) {
                if (err) {
                    return res.send(err)
                }
                for (elem in agent) {
                    agent[elem] = req.body[elem] || agent[elem]
                }

                agent.save(function(err, current){
                    if (err) {
                        return res.send(err)
                    }
                    res.send(current);
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
    const role  = req.cookies.role;

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
