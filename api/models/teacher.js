const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: String, required: true},
    description: {type: String , required: true},
    courses: [{type: String}],
    quizs: [{type: String}],
});

module.exports = mongoose.model('Teacher', teacherSchema);
