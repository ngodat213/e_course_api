const mongoose = require('mongoose');
const CourseLesson = require('../models/course_lesson_model');
const CourseVideo = require('../models/course_video_model');

// Controller functions for course lessons
exports.courseLesson_get_all = (req, res, next) => {
    CourseLesson.find()
        .select('title selection _id videos')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                courseLessons: docs.map(doc => {
                    return {
                        _id: doc._id,
                        title: doc.title,
                        selection: doc.selection,
                        videos: doc.videos,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/courseLesson/' + doc._id,
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

exports.courseLesson_create = (req, res, next) => {
    const courseLesson = new CourseLesson({
        _id: new mongoose.Types.ObjectId(),
        courseId: req.body.courseId,
        title: req.body.title,
        selection: req.body.selection,
        videos: req.body.videos
    });
    courseLesson
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Lesson created successfully",
                createdLesson: {
                    _id: result._id,
                    title: result.title,
                    selection: result.selection,
                    videos: result.videos,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/courseLesson/' + result._id,
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

exports.courseLesson_get_by_id = (req, res, next) => {
    const id = req.params.lessonId;
    CourseLesson.findById(id)
        .select('_id title lesson videos')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if(doc){
                res.status(200).json({
                    courseLesson: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/courseLesson/',
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

exports.courseLesson_patch =  (req, res, next) => {
    const id = req.params.lessonId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    CourseLesson.updateOne({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Lesson updated",
                request: {
                    type: "GET",
                    url: 'http://localhost:3000/courseLesson/' + id,
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

exports.courseLesson_delete = (req, res, next) => {
    const id = req.params.lessonId;
    CourseLesson.deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Lesson deleted",
                request: {
                    type: "GET",
                    url: 'http://localhost:3000/courseLesson/',
                    body: {course: 'ID', title: "String", lesson: "Number"}
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
