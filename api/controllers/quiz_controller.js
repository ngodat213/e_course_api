const mongoose = require('mongoose');
const Quiz = require('../models/quiz_model');

// Controller
exports.quiz_get_all = (req, res, next) => {
    Quiz.find()
    .exec()
    .then(quizs => {
        res.status(200).json({
            count: quizs.length,
            quizs: quizs.map(quiz => {
                return {
                    _id: quiz._id,
                    description: quiz.description,
                    image: quiz.image,
                    title: quiz.title,
                    type: quiz.type,
                    lessons: quiz.lessons,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/quiz/' + quiz._id
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

exports.quiz_create = (req, res, next) => {
    const quiz = new Quiz({
        _id: new mongoose.Types.ObjectId(),
        description: req.body.description,
        image: req.body.image,
        title: req.body.title,
        type: req.body.type,
        lessons: req.body.lesson,
    });
    quiz.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Quiz created successfully",
            createdQuiz: {
                _id: result._id,
                description: result.description,
                image: result.image,
                title: result.title,
                type: result.type,
                lessons: result.lessons,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/quiz/' + result._id
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

exports.quiz_get_by_id = (req, res, next) => {
    const id = req.params.quizId;
    Quiz.findById(id)
        .exec()
        .then(quiz => {
            if (quiz) {
                res.status(200).json({
                    quiz: quiz,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/quiz'
                    }
                });
            } else {
                res.status(404).json({ message: 'Quiz comment not found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.quiz_update = (req, res, next) => {
    const id = req.params.quizId;
    const updateOps = {};
    
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    
    Quiz.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Quiz comment updated successfully",
                request: {
                    type: "GET",
                    url: 'http://localhost:3000/quiz/' + id
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

exports.quiz_delete = (req, res, next) => {
    const id = req.params.quizId;
    Quiz.deleteOne({ _id: id })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Quiz deleted successfully",
                request: {
                    type: "POST",
                    url: 'http://localhost:3000/quiz',
                    body: { description: 'String', image: 'Number', title: "String", type: "String",  }
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