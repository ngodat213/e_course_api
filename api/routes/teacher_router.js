const express = require('express');
const router = express.Router();

// Controller
const teacherController = require('../controllers/teacher_controller');
// Check authentication
const checkAuth = require('../middleware/check-auth');

router.get('/', teacherController.teacher_get_all);
router.post('/', teacherController.teacher_create);
router.get('/:blogId', teacherController.teacher_get_by_id);
router.patch('/:blogId',checkAuth, teacherController.teacher_update);
router.delete('/:blogId',checkAuth, teacherController.teacher_delete);

module.exports = router;
