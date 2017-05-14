const express = require('express'),
      router  = express.Router(),
      jwt     = require('jsonwebtoken'),
      app     = require('../api'),
      verify  = require('../utils/verify'),
      cases   = require('../models/casesModel');

router.use(function timelog (req, res, next){
    let now

    now = Date.now()
    console.log('[ROUTING] /cases -- Time: ', now.toLocaleString())
    next()
})
//petit middleware qui permet la vérif des token
router.use(verify.token)

router.get("/", function(req, res, decoded){
    console.log(req.decoded)
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

router.post("/create", function (req, res) {
    let newCase
    const role = req.cookies.role

    if (role) {
        if ("CHEF" !== role && "DETECTIVE" !== role) {
            res.json({ success: false, message: "you don't have rights to do this"})
        } else {
            newCase = new cases(req.body)
            newCase
            .save(function(err, newCase) {
                if (err) {
                    return res.status(401).send(err)
                }
                res.json(newCase)
            })
        }
    } else {
        res.status(403).json({
            success: false,
            message: 'no role provided.'
        })
    }
})

router.post("/:id/edit", function(req, res){
    const id = req.params.id;
    const role = req.cookies.role

    if (role) {
        if ("CHEF" !== role && "DETECTIVE" !== role) {
            res.json({ success: false, message: "you don't have rights to do this"})
        } else {
            cases.findById(id, function(err, c) {
                if (err) {
                    return res.send(err)
                }
                for (elem in c) {
                    c[elem] = req.body[elem] || c[elem]
                }

                c.save(function(err, current){
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
    let id      = req.params.id;
    const role  = req.cookies.role;

    if (role) {
        if ('CHEF' !== role) {
            return res.json({ success: false, message: "you don't have rights to do this"})
        } else {
            cases.remove({ _id: id}, function(err, result){
            if (err) return res.status(500).send({err: 'Error: Could not delete this case'});
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
