const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

// Functions
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.minetype === 'image/jpeg' || file.minetype == 'image/png'){
        cb(null, false);
    }else{
        cb(null, true);
    }
}

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


// Controller
const ProductController = require('../controllers/course_controller');

// Router

router.get('/', ProductController.course_get_all);
router.post('/',checkAuth, upload.single('courseImage'), ProductController.course_create);
router.get('/:courseId', ProductController.course_get);
router.patch('/:courseId', checkAuth, ProductController.course_patch);
router.delete('/:courseId', checkAuth, ProductController.course_delete);

module.exports = router;