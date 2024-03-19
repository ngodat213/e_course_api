const express = require('express');
const router = express.Router();

// Controller
const commentController = require('../controllers/comment_controller');
// Check authentication
const checkAuth = require('../middleware/check-auth');

// Router
router.get('/', commentController.comment_get_all);
router.get('/:commentId', commentController.comment_get_by_id);
router.post('/', commentController.commment_create);
router.patch('/:commentId',checkAuth, commentController.comment_update);
router.delete('/:commentId',checkAuth, commentController.comment_delete);

module.exports = router;
