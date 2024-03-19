const mongoose = require('mongoose');
const CourseVideo = require('../models/course_video_model');

// Controller to get all course videos
exports.courseVideo_get_all = (req, res, next) => {
    CourseVideo.find()
        .exec()
        .then(videos => {
            res.status(200).json({
                count: videos.length,
                videos: videos.map(video => {
                    return {
                        _id: video._id,
                        title: video.title,
                        hour: video.hour,
                        minute: video.minute,
                        part: video.part,
                        videoUrl: video.videoUrl,
                        description: video.description,
                        comments: video.comments,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/videos/' + video._id
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

// Controller to create a new course video
exports.courseVideo_create = (req, res, next) => {
    const video = new CourseVideo({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        hour: req.body.hour,
        minute: req.body.minute,
        part: req.body.part,
        videoUrl: req.body.videoUrl,
        description: req.body.description,
        comments: req.body.comments
    });

    video.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Course video created successfully",
                createdVideo: {
                    _id: result._id,
                    title: result.title,
                    hour: result.hour,
                    minute: result.minute,
                    part: result.part,
                    videoUrl: result.videoUrl,
                    description: result.description,
                    comments: result.comments,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/videos/' + result._id
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

exports.courseVideo_get_by_id = (req, res, next) => {
    const id = req.params.videoId;
    CourseVideo.findById(id)
        .populate('comments') // Populate comments field with referenced documents
        .exec()
        .then(video => {
            if (video) {
                res.status(200).json({
                    video: {
                        _id: video._id,
                        title: video.title,
                        hour: video.hour,
                        minute: video.minute,
                        part: video.part,
                        videoUrl: video.videoUrl,
                        description: video.description,
                        comments: video.comments,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/videos'
                        }
                    }
                });
            } else {
                res.status(404).json({ message: 'Course video not found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.courseVideo_update = (req, res, next) => {
    const id = req.params.videoId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    CourseVideo.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Course video updated successfully",
                request: {
                    type: "GET",
                    url: 'http://localhost:3000/videos/' + id
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

exports.courseVideo_delete = (req, res, next) => {
    const id = req.params.videoId;
    CourseVideo.deleteOne({ _id: id })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Course video deleted successfully",
                request: {
                    type: "POST",
                    url: 'http://localhost:3000/videos',
                    body: { title: 'String', hour: 'Number', minute: 'Number', part: 'Number', videoUrl: 'String', description: 'String', comments: ['Array of Comment IDs'] }
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
