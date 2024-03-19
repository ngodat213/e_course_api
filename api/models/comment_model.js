const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: [{type: String}],
    title: {type: String, required: true},
    like:  {type: Number, default: 0},
    feedbacks: [{type: String}]
});

const courseComment = mongoose.model('Comment', commentSchema);

module.exports = courseComment;
