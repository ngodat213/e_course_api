const mongoose = require('mongoose');
const Teacher = require('../models/teacher');

exports.teacher_get_all = (req, res, next) => {
    Teacher.find()
        .exec()
        .then(teachers => {
            res.status(200).json({
                count: teachers.length,
                teachers: teachers.map(teacher => {
                    return {
                        _id: teacher._id,
                        userId: teacher.userId,
                        description: teacher.description,
                        courses: teacher.courses,
                        quizs: teacher.quizs,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/teachers/' + teacher._id
                        }
                    };
                })
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.teacher_create = (req, res, next) => {
    const teacher = new Teacher({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        description: req.body.description,
        courses: req.body.courses,
        quizs: req.body.quizs
    });

    teacher.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Teacher created successfully",
                createdTeacher: {
                    _id: result._id,
                    userId: result.userId,
                    description: result.description,
                    courses: result.courses,
                    quizs: result.quizs,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/teachers/' + result._id
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
};

exports.teacher_get_by_id = (req, res, next) => {
    const id = req.params.teacherId;
    Teacher.findById(id)
        .exec()
        .then(teacher => {
            if (teacher) {
                res.status(200).json({
                    teacher: teacher,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/teachers'
                    }
                });
            } else {
                res.status(404).json({ message: 'Teacher not found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.teacher_update = (req, res, next) => {
    const id = req.params.teacherId;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Teacher.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Teacher updated successfully",
                request: {
                    type: "GET",
                    url: 'http://localhost:3000/teachers/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.teacher_delete = (req, res, next) => {
    const id = req.params.teacherId;
    Teacher.deleteOne({ _id: id })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Teacher deleted successfully",
                request: {
                    type: "POST",
                    url: 'http://localhost:3000/teachers',
                    body: {
                        userId: 'String',
                        description: 'String',
                        courses: ['Array of Strings'],
                        quizs: ['Array of Strings']
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
};
