const mongoose = require('mongoose');

const courseLessonSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    lesson:  {type: Number, required: true , default: false},
    videos: [{type: String}]
});

const CourseLesson =  mongoose.model('CourseLesson', courseLessonSchema);

module.exports = CourseLesson;
