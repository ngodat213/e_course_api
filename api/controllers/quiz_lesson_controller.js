const mongoose = require('mongoose');
const QuizLesson = require('../models/quiz_lesson_model');

// Controller
exports.quizLesson_get_all = (req, res, next) => {
    QuizLesson.find()
    .exec()
    .then(quizLessons => {
        res.status(200).json({
            count: quizLessons.length,
            quizLessons: quizLessons.map(quizLesson => {
                return {
                    _id: quizLesson._id,
                    title: quizLesson.title,
                    hour: quizLesson.hour,
                    minute: quizLesson.minute,
                    second: quizLesson.second,
                    lesson: quizLesson.lesson,
                    point: quizLesson.point,
                    questions: quizLesson.questions,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/quizLessons/' + quizLesson._id
                    }
                }
            })
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.quizLesson_create = (req, res, next) => {
    const quizLesson = new QuizLesson({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        hour: req.body.hour,
        minute: req.body.minute,
        second: req.body.second,
        lesson: req.body.lesson,
        point: req.body.point,
        questions: req.body.questions,
    });
    quizLesson.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Quiz lesson created successfully",
            createdQuizLesson: {
                _id: result._id,
                title: result.title,
                hour: result.hour,
                minute: result.minute,
                second: result.second,
                lesson: result.lesson,
                point: result.point,
                questions: result.questions,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/quizLessons/' + result._id
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.quizLesson_get_by_id = (req, res, next) => {
    const id = req.params.quizLessonId;
    QuizLesson.findById(id)
        .exec()
        .then(quizLesson => {
            if (quizLesson) {
                res.status(200).json({
                    quizLesson: quizLesson,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/quizLessons'
                    }
                });
            } else {
                res.status(404).json({ message: 'Quiz lesson not found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.quizLesson_update = (req, res, next) => {
    const id = req.params.quizLessonId;
    const updateOps = {};
    
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    
    QuizLesson.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Quiz lesson updated successfully",
                request: {
                    type: "GET",
                    url: 'http://localhost:3000/quizLessons/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.quizLesson_delete = (req, res, next) => {
    const id = req.params.quizLessonId;
    QuizLesson.deleteOne({ _id: id })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Quiz lesson deleted successfully",
                request: {
                    type: "POST",
                    url: 'http://localhost:3000/quizLessons',
                    body: { title: 'String', hour: 'Number', minute: 'Number', second: 'Number', lesson: 'String', point: 'Number', questions: 'Array' }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}
