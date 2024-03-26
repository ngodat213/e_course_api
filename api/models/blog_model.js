const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    description: {type: String, required: true},
    type: {type: Boolean, required: true},
    imageUrl: {type: String},
    comments: [{type: String}],
    category: {type: String, required: true},
    likes: {type: Number, default: 0},
    dislike: {type: Number, default: 0},
    mark: {type: Number, default: 0},
    userId: {type: mongoose.Schema.ObjectId, ref: "User",required: true}
});

module.exports = mongoose.model('Blog', blogSchema);
