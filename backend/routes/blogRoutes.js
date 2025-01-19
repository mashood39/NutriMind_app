const express = require('express');
const multer = require('multer');
const { createBlog, getBlogs, getBlog } = require('../controllers/blogController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/blogs')
    },
    filename: (req, file, cb) => {
        const sanitizedFilename = file.originalname.replace(/\s+/g, '-');
        cb(null, Date.now() + '-' + sanitizedFilename);
    }
})

const upload = multer({ storage })

// create a blog
router.post('/', upload.single('image'), createBlog)

// get all blogs
router.get('/', getBlogs)

// get a single blog by id
router.get('/:id', getBlog)

module.exports = router;