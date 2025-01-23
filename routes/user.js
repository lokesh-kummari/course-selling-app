const express= require('express');
const router= express.Router();
const jwt= require('jsonwebtoken');
const {jwt_secret}= require('../config');
const userRouter=express.Router();
const {User}= require('../database');
const {Purchase}= require('../database');

userRouter.post('/signup', async (req, res) => {
    //todo implement hashing of password
    const email= req.body.email;
    const password= req.body.password;
    const firstname= req.body.firstname;
    const lastname= req.body.lastname;

    await User.create({email, password, firstname, lastname});
    res.json({message: 'Signup successful'});
});
userRouter.post('/signin', async (req, res) => {
    const email=req.body.email;
    const password=req.body.password;
    const user= await User.findOne({email: email, password: password});
    if(user){
        const token= jwt.sign({id:user._id}, jwt_secret);
        res.json({message: 'Signin successful', token: token});
    }
    else{
        res.json({message: 'Invalid credentials'});
    }
});   
userRouter.get('/purchases', async (req, res) => {
    const userid=req.userid;
    const purchases= await Purchase.find({userid});
    const courseids=purchases.map(purchase=>purchase.courseid);
    res.json(courseids);
    res.json(purchases);
});

module.exports={userRouter};
 