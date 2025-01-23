const express= require('express');
const router= express.Router();
const courseRouter=express.Router();
const {Course}= require('../database');
const {Purchase}= require('../database');
const { usermiddleware } = require('../middlewares/usermiddleware');

courseRouter.post('/purchase',usermiddleware, async (req, res) => {
    const courseid=req.body.courseid;
    const userid=req.userid;
    await Purchase.create({courseid, userid});
    res.json({message: 'Course purchased successfully'});
});
courseRouter.get('/preview', async (req, res) => {
    try {
        const courses = await Course.find({}); // No callback, using await
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching courses", error });
    }
});
module.exports={ courseRouter };