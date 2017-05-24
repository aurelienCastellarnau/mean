const jwt     = require('jsonwebtoken'),
      app     = require('../api')
//Petit module contenant des fonctions de vérification.
module.exports = {
    //ici on vérifie que le token a bien été set et qu'il est valide.
    token : function (req, res, next) {
        token = req.cookies.token
        res.status(200).json();
        if (token){
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                if (err) {
                    res.json({ success: false, message: 'Failed to authenticate token.'});
                } else {
                    req.decoded = decoded
                    next()
                }
            })
        } else {
            res.status(403).json({
            success: false,
            message: 'No token provided.'
            })
        }
    }
}
