const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: {type: String, required: true},
    topic: {type: String, required: true},
});

module.exports = mongoose.model('Contact', contactSchema);
