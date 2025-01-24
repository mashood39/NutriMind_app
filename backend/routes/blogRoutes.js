const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary')

const { createBlog, getBlogs, getBlog, deleteBlog } = require('../controllers/blogController');

const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'blogs', // Folder in Cloudinary
        // format: async (req, file) => 'png', // Optional: Specify file format
        public_id: (req, file) => Date.now() + '-' + file.originalname.replace(/\s+/g, '-'),
    },
})

const upload = multer({ storage })

// create a blog
router.post('/', upload.single('image'), createBlog)

// get all blogs
router.get('/', getBlogs)

// get a single blog by id
router.get('/:id', getBlog)

router.delete('/:id', deleteBlog)

module.exports = router;