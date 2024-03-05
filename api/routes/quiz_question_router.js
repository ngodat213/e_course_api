const express = require('express');
const router = express.Router();

// Controller
const quizQuestionController = require('../controllers/quiz_question_controller');
const checkAuth = require('../middleware/check-auth');

// Router
router.get('/', quizQuestionController.quizQuestion_get_all);
router.post('/', quizQuestionController.quizQuestion_create);
router.get('/:videoId', quizQuestionController.quizQuestion_get_by_id);
router.patch('/:videoId',checkAuth, quizQuestionController.quizQuestion_update);
router.delete('/:videoId',checkAuth, quizQuestionController.quizQuestion_delete);

module.exports = router;
