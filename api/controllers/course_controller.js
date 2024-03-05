const mongoose = require('mongoose');
const Course = require('../models/course_model');
const Lesson = require('../models/course_lesson_model');

exports.course_get_all = (req, res, next) => {
    Course.find()
        .select('title price category description rating teacher order courseImage lessons')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                courses: docs.map(doc => {
                    return {
                        _id: doc._id,
                        title: doc.title,
                        price: doc.price,
                        category: doc.category,
                        description: doc.description,
                        rating: doc.rating,
                        teacher: doc.teacher,
                        order: doc.order,
                        courseImage: doc.courseImage,
                        lessons: doc.lessons, // Include lessons associated with the course
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
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        rating: req.body.rating,
        teacherId: req.body.teacherId,
        courseImage: req.body.courseImage,
        time: req.body.time,
        lessons: req.body.lessons,
    });

    course.save()
    .then(result => {
        console.log(result);
            res.status(201).json({
                message: "Course created successfully",
                createdCourse: {
                    _id: result._id,
                    title: result.title,
                    price: result.price,
                    category: result.category,
                    description: result.description,
                    rating: result.rating,
                    teacherId: result.teacherId,
                    courseImage: result.courseImage,
                    time: result.time,
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
    .select('_id title price category description rating teacher order courseImage')
    .populate('lessons', '_id title lesson') 
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
                type: "GET",
                url: 'http://localhost:3000/course/' + id,
                body: {name: 'String', price: "Number"}
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