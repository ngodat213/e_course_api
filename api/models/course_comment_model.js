const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    like:  {type: Number, default: 0},
    userId: [{type: String}]
});

const courseComment = mongoose.model('CourseComment', commentSchema);

module.exports = courseComment;
