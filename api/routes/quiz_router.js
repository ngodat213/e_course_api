const express = require('express');
const router = express.Router();

// Controller
const quizController = require('../controllers/quiz_controller');
// Check authentication
const checkAuth = require('../middleware/check-auth');

// Router
router.get('/', quizController.quiz_get_all);
router.post('/', quizController.quiz_create);
router.get('/:videoId', quizController.quiz_get_by_id);
router.patch('/:videoId',checkAuth, quizController.quiz_update);
router.delete('/:videoId',checkAuth, quizController.quiz_delete);

module.exports = router;
