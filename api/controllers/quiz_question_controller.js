const mongoose = require('mongoose');
const QuizQuestion = require('../models/quiz_question_model');

// Controller
exports.quizQuestion_get_all = (req, res, next) => {
    QuizQuestion.find()
    .exec()
    .then(quizQuestions => {
        res.status(200).json({
            count: quizQuestions.length,
            quizQuestions: quizQuestions.map(quizQuestion => {
                return {
                    _id: quizQuestion._id,
                    question: quizQuestion.question,
                    answer: quizQuestion.answer,
                    options: quizQuestion.options,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/quizQuestions/' + quizQuestion._id
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

exports.quizQuestion_create = (req, res, next) => {
    const quizQuestion = new QuizQuestion({
        _id: new mongoose.Types.ObjectId(),
        question: req.body.question,
        answer: req.body.answer,
        options: req.body.options,
    });
    quizQuestion.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Quiz question created successfully",
            createdQuizQuestion: {
                _id: result._id,
                question: result.question,
                answer: result.answer,
                options: result.options,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/quizQuestions/' + result._id
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

exports.quizQuestion_get_by_id = (req, res, next) => {
    const id = req.params.quizQuestionId;
    QuizQuestion.findById(id)
        .exec()
        .then(quizQuestion => {
            if (quizQuestion) {
                res.status(200).json({
                    quizQuestion: quizQuestion,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/quizQuestions'
                    }
                });
            } else {
                res.status(404).json({ message: 'Quiz question not found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.quizQuestion_update = (req, res, next) => {
    const id = req.params.quizQuestionId;
    const updateOps = {};
    
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    
    QuizQuestion.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Quiz question updated successfully",
                request: {
                    type: "GET",
                    url: 'http://localhost:3000/quizQuestions/' + id
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

exports.quizQuestion_delete = (req, res, next) => {
    const id = req.params.quizQuestionId;
    QuizQuestion.deleteOne({ _id: id })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Quiz question deleted successfully",
                request: {
                    type: "POST",
                    url: 'http://localhost:3000/quizQuestions',
                    body: { question: 'String', answer: 'Number', options: 'Array' }
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