const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    selection:  {type: Number, default: false},
    hour: {type: Number, required: true},
    minute: {type: Number, required: true},
    part: {type: Number, required: true},
    videoUrl: {type: String, required: true},
    description: {type: String, required: true},
    comments: [{ type: String}]
});

module.exports = mongoose.model('CourseVideo', videoSchema);
