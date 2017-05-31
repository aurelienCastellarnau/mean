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

// router.get("/:param", function (req, res) {
//     let param = [];
//     let keywords = [];
//     let query = Cases.find();

//     if ((param = req.params.param) == "")
//         res.send("no parameters in query")
//     param = param.split(",");
//     console.log("[API stacktrace] GET /cases/:param with param: ", param)
//     for (let i = 0; i < param.length; i++) {
//         let word = param[i].trim()
//         keywords[i] = { naturecode: word };
//     }
//     console.log("mots clés: ", keywords)
//     query.or(keywords)
//     query.exec(function (err, c) {
//         if (err) {
//             return res.send(500, err)
//         }
//         console.log("[API stacktrace] result from textsearch: ", c)
//         res.json(c)
//     })
// })
//
router.get("/:id", function(req, res){
    let param
    console.log("/id");
    param = req.params.id
    Cases.findById(param, function(err, c) {
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
});

module.exports = router
