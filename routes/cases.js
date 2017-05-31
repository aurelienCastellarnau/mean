const express = require('express'),
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    app = require('../api'),
    verify = require('../utils/verify'),
    Cases = require('../models/casesModel'),
    ESClient = require('../utils/elasticsearch.js');

router.use(function timelog(req, res, next) {
    let now

    now = Date.now()
    console.log('[ROUTING] /cases -- Time: ', now.toLocaleString())
    next()
})

// router.use(function elasticsearchIndexCases(req, res, next) {
//     Cases.find({}, {'_id': 0}, function (err, c) {
//         if (err) {
//             console.log("[ES in /cases routes] indexation error: ", err)
//         } else {
//             for(let key in c) {
//                 ESClient.index({
//                     index: 'cases',
//                     id: key,
//                     type: 'cases',
//                     body: c[key]
//                 }, function(err, resp, status){
//                     console.log("[ElasticSearch Cases indexation: ", resp)
//                 });
//             }
//         }
//    }).limit(100)
// })

//petit middleware qui permet la vérif des token
//elle renvoie dans req.decoded le token décodé
router.use(verify.token)

router.get("/", function (req, res) {
    console.log("[API stacktrace] GET /cases", req.decoded._doc)
    Cases.find(function (err, c) {
        if (err) {
            console.log("[API stacktrace] Error rised on GET /cases")
            return res.send(err)
        }
        console.log("[API stacktrace] GET /cases success")
        res.json(c)
    }).limit(100)
})

router.get('/properties', function (req, res) {
    let properties = [];

    Cases.aggregate([
        {
            "$group": {
                _id: null,
                naturecode: { $addToSet: "$naturecode" },
                incident_type_description: { $addToSet: "$incident_type_description" },
                main_crimecode: { $addToSet: "$main_crimecode" },
                reptdistrict: { $addToSet: "$reptdistrict" },
                reportingarea: { $addToSet: "$reportingarea" },
                weapontype: { $addToSet: "$weapontype" },
                shift: { $addToSet: "$shift" },
                day_week: { $addToSet: "$day_week" },
                ucrpart: { $addToSet: "$ucrpart" },
                streetname: { $addToSet: "$streetname" },
                xstreetname: { $addToSet: "$xstreetname" }
            }
        }
    ], function (err, properties) {
        if (err) {
            console.log("[API] GET /cases/properties failed: ", err)
            res.status(500).json(err)
        }
        console.log("[API stacktrace] GET /properties success: ", properties)
        res.status(200).json(properties)
    })
});

router.get("/:id", function (req, res) {
    let param
    console.log("/id");
    param = req.params.id
    Cases.findById(param, function (err, c) {
        if (err) {
            return res.send(err)
        }
        res.json(c)
    })

})

router.post("/create", function (req, res) {
    let newCase
    const role = req.decoded._doc.role

    if (role) {
        if ("CHEF" !== role && "DETECTIVE" !== role) {
            res.json({ success: false, message: "you don't have rights to do this" })
        } else {
            newCase = new Cases(req.body)
            newCase
                .save(function (err, c) {
                    if (err) {
                        return res.status(401).send(err)
                    }
                    res.json(c)
                })
        }
    } else {
        res.status(403).json({
            success: false,
            message: 'no role provided.'
        })
    }
})

router.put("/:id/edit", function (req, res) {
    const id = req.params.id;
    const role = req.decoded._doc.role

    if (role) {
        if ("CHEF" !== role && "DETECTIVE" !== role) {
            res.json({ success: false, message: "you don't have rights to do this" })
        } else {
            Cases.findById(id, function (err, c) {
                if (err) {
                    return res.send(err)
                }
                for (elem in c) {
                    c[elem] = req.body[elem] || c[elem]
                }

                c.save(function (err, c) {
                    if (err) {
                        return res.send(err)
                    }
                    res.send(c);
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

router.delete('/:id', function (req, res) {
    let id = req.params.id;
    const role = req.decoded._doc.role

    if (role) {
        if ('CHEF' !== role) {
            return res.json({ success: false, message: "you don't have rights to do this" })
        } else {
            Cases.remove({ _id: id }, function (err, result) {
                if (err) return res.status(500).send({ err: 'Error: Could not delete this case' });
                if (!result) return res.status(400).send({ err: 'case deleted from database' });
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
})



module.exports = router
