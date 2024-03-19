const mongoose = require('mongoose');
const Comment = require('../models/comment_model');

exports.comment_get_all = (req, res, next) => {
    Comment.find()
        .exec()
        .then(comments => {
            res.status(200).json({
                count: comments.length,
                comments: comments.map(comment => {
                    return {
                        _id: comment._id,
                        title: comment.title,
                        like: comment.like,
                        userId: comment.userId,
                        feedbacks: comment.feedbacks,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/comments/' + comment._id
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

exports.commment_create = (req, res, next) => {
    const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        like: req.body.like,
        userId: req.body.userId,
        feedbacks: req.body.feedbacks,
    });

    comment.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Course comment created successfully",
                createdComment: {
                    _id: result._id,
                    title: result.title,
                    like: result.like,
                    userId: result.userId,
                    feedbacks: result.feedbacks,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/comments/' + result._id
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

exports.comment_get_by_id = (req, res, next) => {
    const id = req.params.commentId;
    Comment.findById(id)
        .exec()
        .then(comment => {
            if (comment) {
                res.status(200).json({
                    comment: comment,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/comments'
                    }
                });
            } else {
                res.status(404).json({ message: 'Course comment not found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.comment_update = (req, res, next) => {
    const id = req.params.commentId;
    const updateOps = {};
    
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    
    Comment.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Course comment updated successfully",
                request: {
                    type: "GET",
                    url: 'http://localhost:3000/comments/' + id
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

exports.comment_delete = (req, res, next) => {
    const id = req.params.commentId;
    Comment.deleteOne({ _id: id })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Course comment deleted successfully",
                request: {
                    type: "POST",
                    url: 'http://localhost:3000/comments',
                    body: { title: 'String', like: 'Number', userId: ['Array of User IDs'] ,feedbacks: ['Array of Comment IDs']}
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