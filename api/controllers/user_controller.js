const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
// Models
const User = require("../models/user_model");

exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              username: req.body.username,
              created: Date.now(),
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "User created",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};
exports.user_login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {
          user.signedIn = Date.now(); // Update signedIn field
          user.save(); // Save the updated user
          const token = jwt.sign(
            {
              userId: user._id,
              email: user.email,
              username: user.username,
              photoUrl: user.photoUrl,
              blogs: user.blogs,
              qAs: user.qAs,
              courses: user.courses,
              favouritesCourses: user.favouritesCourses,
              favouritesQuizs: user.favouritesQuizs,
              favouritesTeachers: user.favouritesTeachers,
              finishedQuizs: user.finishedQuizs,
              favouritesBlogs: user.favouritesBlogs,
              favouritesQAs: user.favouritesQAs,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "7d",
            }
          );
          return res.status(200).json({
            token: token,
            message: "Login successfull"
          });
        }
        return res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.user_delete = (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
