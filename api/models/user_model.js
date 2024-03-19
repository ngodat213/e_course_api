const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {type: String, required: true},
    username: {type: String, required: true},
    photoUrl: {type: String, default: "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"},
    blogs: [{type: String}],
    qAs:[{type: String}],
    courses:[{type: String}],
    favouritesCourses: [{type: String}],
    favouritesQuizs: [{type: String}],
    favouritesTeachers: [{type: String}],
    finishedQuizs: [{type: String}],
    favouritesBlogs: [{type: String}],
    favouritesQAs:[{type: String}],
    created: {type: Date},
    signedIn: {type: Date, default: null},
});

module.exports = mongoose.model('User', userSchema);