const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    teacherId: {type: String, required: true},
    courseImage: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    time: {type: String, required: true},
    category: {type: String, required: true},
    rating: {type: Number, required: true, default: 5},
    register: {type: Number, default: 0},
    lessons: [{ type: String}],
    feedbacks: [{type: String}]
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;