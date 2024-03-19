const express = require('express');
const router = express.Router();

// Controller
const blogController = require('../controllers/blog_controller');
// Check authentication
const checkAuth = require('../middleware/check-auth');

// Router
router.get('/', blogController.blog_get_all);
router.post('/', blogController.blog_create);
router.get('/:blogId', blogController.blog_get_by_id);
router.patch('/:blogId',checkAuth, blogController.blog_update);
router.delete('/:blogId',checkAuth, blogController.blog_delete);

module.exports = router;
