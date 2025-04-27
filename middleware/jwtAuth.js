const jwt = require('jsonwebtoken');

const jwtAuth = (req,res,next)=>{

    console.log(req.headers);
    next();

}

module.exports = jwtAuth;