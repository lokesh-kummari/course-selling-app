const jwt = require('jsonwebtoken');
const {jwt_admin_secret}= require('../config');

function adminmiddleware(req,res,next){
    const token=req.headers.token;
    const decoded=jwt.verify(token,jwt_admin_secret);
    if(decoded){
        req.userid=decoded.id;
        next();
    }
    else{
        res.json({message: 'Invalid token'});
    }
}
module.exports={adminmiddleware};