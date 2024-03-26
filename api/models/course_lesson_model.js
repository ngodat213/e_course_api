const mongoose = require('mongoose');

const courseLessonSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    selection:  {type: Number, required: true},
    videos: [{type: mongoose.Schema.ObjectId, ref: 'CourseVideo'}]
});

const CourseLesson =  mongoose.model('CourseLesson', courseLessonSchema);

module.exports = CourseLesson;
