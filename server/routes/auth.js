const jwt = require('jsonwebtoken');

const secret = require('../config/variables').secret;
const User = require('../models/user');

exports.verifyToken = (req, res, next) => {
    if(req.headers.authorization){
        const token = req.headers.authorization;
        jwt.verify(token, secret, (err, payload) => {
            if(err) return res.status(400).json(err);
            User.findById( payload.userId, (err, user) => {
                if(err) return res.status(500).json(err);
				req.user = user;
				next();
            });
        });
    } else {
        res.status(401).json({error: 'Token Required'});
        next();
    }
}


