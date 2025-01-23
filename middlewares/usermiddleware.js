const jwt = require('jsonwebtoken');
const {jwt_secret}= require('../config');

function usermiddleware(req,res,next){
    const token=req.headers.token;
    const decoded=jwt.verify(token,jwt_secret);
    if(decoded){
        req.userid=decoded.id;
        next();
    }
    else{
        res.json({message: 'Invalid token'});
    }
}
module.exports={usermiddleware};