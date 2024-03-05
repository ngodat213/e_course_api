const express = require('express');
const router = express.Router();

// Controller
const quizLessonController = require('../controllers/quiz_lesson_controller');
const checkAuth = require('../middleware/check-auth');

// Router
router.get('/', quizLessonController.quizLesson_get_all);
router.post('/', quizLessonController.quizLesson_create);
router.get('/:videoId', quizLessonController.quizLesson_get_by_id);
router.patch('/:videoId',checkAuth, quizLessonController.quizLesson_update);
router.delete('/:videoId',checkAuth, quizLessonController.quizLesson_delete);

module.exports = router;
