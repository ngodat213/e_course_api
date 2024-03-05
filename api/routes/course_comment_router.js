const express = require('express');
const router = express.Router();

// Controller
const courseCommentController = require('../controllers/courseCommentController');
const checkAuth = require('../middleware/check-auth');

// Router
router.get('/', courseCommentController.getAllCourseComments);
router.get('/:commentId', courseCommentController.getCourseCommentById);
router.post('/', courseCommentController.createCourseComment);
router.patch('/:commentId',checkAuth, courseCommentController.updateCourseComment);
router.delete('/:commentId',checkAuth, courseCommentController.deleteCourseComment);

module.exports = router;
