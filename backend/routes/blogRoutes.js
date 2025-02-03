const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary')

const { createBlog, getBlogs, getBlog, deleteBlog, updateBlog } = require('../controllers/blogController');

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

router.post('/', upload.single('image'), createBlog)

router.get('/', getBlogs)

router.get('/:id', getBlog)

router.delete('/:id', deleteBlog)

router.put('/:id', updateBlog)

module.exports = router;