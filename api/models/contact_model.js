const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullName:  {type: String, default: false},
    mail: {type: String, required: true},
    text: {type: String, required: true},
    topic: {type: String, required: true},
});

module.exports = mongoose.model('Contact', contactSchema);
