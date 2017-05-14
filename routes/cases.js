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

router.post("/create", function (req, res){
    let case
    const role = req.cookies.role

    if (role) {
        if ("CHEF" !== role && "DETECTIVE" !== role) {
            res.json({ success: false, message: "you don't have rights to do this"})
        } else {
            case = new case(req.body)
            case
            .save(function(err, case) {
                if (err) {
                    return res.status(401).send(err)
                }
                res.json(case)
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
            cases.findById(id, function(err, case) {
                if (err) {
                    return res.send(err)
                }

            // c'est dégueulasse, faut que je change ça en fonction intelligente /!\
            case.compnos = req.body.compnos || case.compnos
            case.naturecode = req.body.naturecode || case.naturecode
            case.incident_type_description = req.body.incident_type_description || case.incident_type_description
            case.main_crimecode = req.body.main_crimecode || case.main_crimecode
            case.reptdistrict = req.body.reptdistrict || case.reptdistrict
            case.reportingarea = req.body.reportingarea || case.reportingarea
            case.fromdate = req.body.fromdate || case.fromdate
            case.weapontype = req.body.weapontype || case.weapontype
            case.shooting = req.body.shooting || case.shooting
            case.domestic = req.body.domestic || case.domestic
            case.shift = req.body.shift || case.shift
            case.year = req.body.year || case.year
            case.month = req.body.month || case.month
            case.day_weak = req.body.day_weak || case.day_weak
            case.ucrpart = req.body.ucrpart || case.ucrpart
            case.x = req.body.x || case.x
            case.y = req.body.y || case.y
            case.streetname = req.body.streetname || case.streetname
            case.xstreetname = req.body.xstreetname || case.xstreetname
            case.location = req.body.location || case.location

                case.save(function(err, current){
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
