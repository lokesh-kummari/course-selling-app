const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const objectId= mongoose.Schema.Types.ObjectId;
const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},

});
const adminSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
});
const courseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    imageurl: {type: String, required: true},
    creatorId: {type: objectId, required: true},
});
const purchaseSchema = new mongoose.Schema({
    userid: {type: objectId, required: true, ref : 'User'},
    courseid: {type: objectId, required: true, ref : 'Course'},
}); 

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);
const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = {User, Admin, Course, Purchase};

