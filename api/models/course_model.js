const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    description: {type: String},
    ratting: {type: String},
    order: {type: Number},
    teacherId: {type: String},
    courseImage: {type: String},
    time: {type: String},
    lessons: [{ type: String}]
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;