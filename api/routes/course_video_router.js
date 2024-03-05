const express = require('express');
const router = express.Router();

// Controller
const videoController = require('../controllers/course_video_controller');
const checkAuth = require('../middleware/check-auth');

// Router
router.get('/', videoController.courseVideo_get_all);
router.post('/', videoController.courseVideo_create);
router.get('/:videoId', videoController.courseVideo_get_by_id);
router.patch('/:videoId',checkAuth, videoController.courseVideo_update);
router.delete('/:videoId',checkAuth, videoController.courseVideo_delete);

module.exports = router;
