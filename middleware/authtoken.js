const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const bearerheader = req.headers['authorization'];

    if(typeof bearerheader !== 'undefined') {
        const token = bearerheader.split(" ")[1];    
        jwt.verify(token, process.env.KEY, (err, authData) => {
            if (err) {
                res.status(403).json({message: "token expired"});                
            } else {
                req.authData = authData;
                next();
            }
        });
        next();
    } else {
        res.status(403).json({message: "Token is required"});
    }
}

module.exports = verifyToken;