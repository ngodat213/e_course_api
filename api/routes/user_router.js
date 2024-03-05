const express = require('express');
const router = express.Router();

// Controller
const UserController = require('../controllers/user_controller')

// Router
router.post('/signup', UserController.user_signup);
router.post('/login', UserController.user_login)
router.delete("/:userId", UserController.user_delete);

module.exports = router;