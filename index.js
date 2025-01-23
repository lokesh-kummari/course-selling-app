require('dotenv').config();
const express= require('express');
const app=  express();
const mongoose = require('mongoose');
app.use(express.json());
const {userRouter}= require('./routes/user');
const {courseRouter}= require('./routes/course');
const {adminRouter}= require('./routes/admin');
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/course', courseRouter);
async function connect(){
    await mongoose.connect(process.env.MOGODB_URL);
    app.listen(3000);
    console.log('Server started at http://localhost:3000');
}
connect();
