const express = require('express');
const router = express.Router();

// Controller
const contactController = require('../controllers/contact_controller');
// Check authentication
const checkAuth = require('../middleware/check-auth');

// Router
router.get('/',contactController.contact_get_all);
router.post('/',contactController.contact_create);
router.get('/:videoId',contactController.contact_get_by_id);
router.patch('/:videoId',checkAuth, contactController.contact_update);
router.delete('/:videoId',checkAuth, contactController.contact_delete);

module.exports = router;
