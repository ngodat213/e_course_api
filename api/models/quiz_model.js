const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    description: {type: String, required: true},
    image:  {type: String, required: true},
    title: {type: String, required: true},
    type: {type: String, required: true},
    lessons: [{type: String}]
});

module.exports = mongoose.model('Quiz', quizSchema);