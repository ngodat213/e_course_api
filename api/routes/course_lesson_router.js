const express = require('express');
const router = express.Router();

// Controller
const lessonController = require('../controllers/course_lesson_controller');
const checkAuth = require('../middleware/check-auth');

// Router
router.get('/', lessonController.courseLesson_get_all);
router.post('/', lessonController.courseLesson_create);
router.get('/:lessonId', lessonController.courseLesson_get_by_id);
router.patch('/:lessonId',checkAuth, lessonController.courseLesson_patch);
router.delete('/:lessonId',checkAuth, lessonController.courseLesson_delete);

module.exports = router;
