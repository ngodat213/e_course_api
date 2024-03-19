const mongoose = require('mongoose');
const Course = require('../models/course_model');
const Lesson = require('../models/course_lesson_model');

exports.course_get_all = (req, res, next) => {
    Course.find()
        .select('title category description rating teacher order courseImage lessons feedbacks')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                courses: docs.map(doc => {
                    return {
                        _id: course._id,
                        teacherId: course.teacherId,
                        courseImage: course.courseImage,
                        title: course.title,
                        description: course.description,
                        time: course.time,
                        category: course.category,
                        rating: course.rating,
                        register: course.register,
                        lessons: course.lessons,
                        feedbacks: course.feedbacks,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/course/' + doc._id,
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.course_create = (req, res, next) => {
    const course = new Course({
        _id: new mongoose.Types.ObjectId(),
        teacherId: req.body.teacherId,
        courseImage: req.body.courseImage,
        title: req.body.title,
        description: req.body.description,
        time: req.body.time,
        category: req.body.category,
        rating: req.body.rating,
        register: req.body.register,
        lessons: req.body.lessons,
        feedbacks: req.body.feedbacks
    });

    course.save()
    .then(result => {
        console.log(result);
            res.status(201).json({
                message: "Course created successfully",
                createdCourse: {
                    _id: result._id,
                    teacherId: result.teacherId,
                    courseImage: result.courseImage,
                    title: result.title,
                    description: result.description,
                    time: result.time,
                    category: result.category,
                    rating: result.rating,
                    register: result.register,
                    lessons: result.lessons,
                    feedbacks: result.feedbacks,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/course/' + result._id,
                    }
                },
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
}

exports.course_get = (req, res, next) => {
    const id = req.params.courseId;
    Course.findById(id)
    .select('_id teacherId time register title category description rating teacher order courseImage lessons feedbacks')
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if(doc){
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/course/',
                }
            });
        }else{
            res.status(404).json({message: 'No valid entry found for provided ID'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}

exports.course_patch = (req, res, next) => {
    const id = req.params.courseId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Course.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Course updated",
                request: {
                    type: "GET",
                    url: 'http://localhost:3000/course/' + id,
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

exports.course_delete = (req, res, next) => {
    const id = req.params.courseId;
    Course.deleteOne({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Corse deleted",
            request: {
                type: "POST",
                url: 'http://localhost:3000/courses',
                body: {
                    teacherId: 'String',
                    courseImage: 'String',
                    title: 'String',
                    description: 'String',
                    time: 'String',
                    category: 'String',
                    ratting: 'String',
                    register: 'Number',
                    lessons: ['Array of Strings'],
                    feedbacks: ['Array of Strings']
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