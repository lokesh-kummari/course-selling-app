const express = require('express');
const router = express.Router();
const adminRouter = express.Router();
const jwt = require('jsonwebtoken');
const { jwt_admin_secret } = require('../config');
const { Admin, Course } = require('../database'); 
const { adminmiddleware } = require('../middlewares/adminmiddleware');

// Admin Signup
adminRouter.post('/signup', async (req, res) => {
    const { email, password, firstname, lastname } = req.body;
    await Admin.create({ email, password, firstname, lastname });
    res.json({ message: 'Signup successful' });
});

// Admin Signin
adminRouter.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email, password });

    if (admin) {
        const token = jwt.sign({ id: admin._id }, jwt_admin_secret);
        res.json({ message: 'Signin successful', token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Create Course
adminRouter.post('/course', adminmiddleware, async (req, res) => {
    const adminid = req.userid;
    const { title, description, price, imageurl } = req.body;

    const course = await Course.create({ creatorId: adminid, title, description, price, imageurl });

    res.json({
        message: 'Course created successfully',
        courseid: course._id
    });
});

// Update Course
adminRouter.put('/course', adminmiddleware, async (req, res) => {
    const adminid = req.userid;
    const { title, description, price, imageurl, courseid } = req.body;

    await Course.updateOne(
        { _id: courseid, creatorId: adminid }, 
        { title, description, price, imageurl }
    );

    res.json({
        message: 'Course updated successfully',
        courseid 
    });
});

// Get All Courses Created by Admin
adminRouter.get('/course/bulk', adminmiddleware, async (req, res) => {
    const adminid = req.userid;
    const courses = await Course.find({ creatorId: adminid });
    res.json({ courses });
});

module.exports = { adminRouter };
