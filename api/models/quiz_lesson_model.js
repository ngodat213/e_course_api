const mongoose = require('mongoose');

const quizLessonSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    hour: {type: Number, required: true},
    minute:  {type: Number, required: true},
    second: {type: Number, required: true},
    lesson: {type: String, required: true},
    point: {type: Number, default: 0},
    questions: [{type: String}]
});

module.exports = mongoose.model('QuizLesson', quizLessonSchema);
