const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const dbUrl = `mongodb+srv://hydra:${process.env.password}@cluster0.d0dwiwa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Router -- course
const courseRoutes = require('./api/routes/course_router');
const courseLessonRoutes = require('./api/routes/course_lesson_router');
const courseVideoRoutes = require('./api/routes/course_video_router');
// Router -- quiz
const quizRoutes = require('./api/routes/quiz_router');
const quizLessonRoutes = require('./api/routes/quiz_lesson_router');
const quizQuestionRoutes = require('./api/routes/quiz_question_router');
// Router -- user
const userRoutes = require('./api/routes/user_router');
const contactRoutes = require('./api/routes/contact_router');

mongoose.connect(dbUrl);

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Access
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json();
    }
    next();
});

// routes which should handle requests
// --------- course --------------
app.use('/course', courseRoutes);
app.use('/courseLesson', courseLessonRoutes);
app.use('/courseVideo', courseVideoRoutes);
// ----------- quiz ---------------
app.use('/quiz', quizRoutes);
app.use('/quizLesson', quizLessonRoutes);
app.use('/quizQuestion', quizQuestionRoutes);
// ----------- user ---------------- 
app.use('/contact', contactRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        err: {
            message: err.message
        }
    })
})

module.exports = app;