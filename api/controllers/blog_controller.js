const mongoose = require('mongoose');
const Blog = require('../models/blog_model');
const User = require('../models/user_model');

exports.blog_get_all = (req, res, next) => {
    Blog.find()
        .select('title description type imageUrl comments category likes dislike mark _id')
        .populate({
            path: 'user',
            select: '_id username photoUrl'
        })
        .exec()
        .then(blogs => {
            res.status(200).json({
                count: blogs.length,
                blogs: blogs.map(blog => {
                    return {
                        _id: blog._id,
                        title: blog.title,
                        description: blog.description,
                        type: blog.type,
                        imageUrl: blog.imageUrl,
                        comments: blog.comments,
                        category: blog.category,
                        likes: blog.likes,
                        dislike: blog.dislike,
                        mark: blog.mark,
                        user: blog.user,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/blogs/' + blog._id
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

exports.blog_create = (req, res, next) => {
    const blog = new Blog({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        imageUrl: req.body.imageUrl,
        comments: req.body.comments,
        category: req.body.category,
        likes: req.body.likes || 0,
        dislike: req.body.dislike || 0,
        mark: req.body.mark || 0,
        user: req.body.user,
    });

    blog.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Blog created successfully",
                createdBlog: {
                    _id: result._id,
                    title: result.title,
                    description: result.description,
                    type: result.type,
                    imageUrl: result.imageUrl,
                    comments: result.comments,
                    category: result.category,
                    likes: result.likes,
                    dislike: result.dislike,
                    mark: result.mark,
                    user: result.user,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/blogs/' + result._id
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

exports.blog_get_by_id = (req, res, next) => {
    const id = req.params.blogId;
    Blog.findById(id)
        .select('title description type imageUrl comments category likes dislike mark _id')
        .populate({
            path: 'user',
            select: '_id username photoUrl'
        })
        .exec()
        .then(blog => {
            if (blog) {
                res.status(200).json({
                    blog: blog,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/blogs'
                    }
                });
            } else {
                res.status(404).json({ message: 'Blog not found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.blog_update = (req, res, next) => {
    const id = req.params.blogId;
    const updateOps = {};
    
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    
    Blog.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Blog updated successfully",
                request: {
                    type: "GET",
                    url: 'http://localhost:3000/blogs/' + id
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

exports.blog_delete = (req, res, next) => {
    const id = req.params.blogId;
    Blog.deleteOne({ _id: id })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Blog deleted successfully",
                request: {
                    type: "POST",
                    url: 'http://localhost:3000/blogs',
                    body: {
                        title: 'String',
                        description: 'String',
                        type: 'bit',
                        imageUrl: 'String',
                        comments: ['Array of Strings'],
                        category: 'String',
                        likes: 'Number',
                        dislike: 'Number',
                        mark: 'Number',
                        user: 'Object id'
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
