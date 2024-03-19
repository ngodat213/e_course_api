const mongoose = require('mongoose');

const quizLessonSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    lesson: {type: String, required: true},
    title: {type: String, required: true},
    hour: {type: Number, required: true},
    minute:  {type: Number, required: true},
    second: {type: Number, required: true},
    questions: [{type: String}]
});

module.exports = mongoose.model('QuizLesson', quizLessonSchema);
