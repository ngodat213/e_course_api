const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    imageUrl:  {type: String, required: true},
    lessons: [{type: String}]
});

module.exports = mongoose.model('Quiz', quizSchema);