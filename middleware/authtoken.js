const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const bearerheader = req.headers['authorization'];

    if(typeof bearerheader !== 'undefined') {
        const token = bearerheader.split(" ")[1];    
        jwt.verify(token, process.env.KEY, (err, authData) => {
            if (err) {
                return res.status(403).json({message: "token expired"});                
            } else {
                req.authData = authData;
                next();
            }
        });        
    } else {
        return res.status(403).json({message: "Token is required"});
    }
}

module.exports = verifyToken;