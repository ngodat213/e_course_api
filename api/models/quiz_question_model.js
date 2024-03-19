const mongoose = require('mongoose');

const quizQuestionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    questions: {type: String, required: true},
    answer:  {type: Number, default: -1},
    option: [{ type: String }],
    imageUrl: [{type: String}]
});

module.exports = mongoose.model('QuizQuestion', quizQuestionSchema);
