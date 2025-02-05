const express = require('express')
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary')

const { createQuiz, getQuiz, getQuizzes, deleteQuiz, updateQuiz } = require('../controllers/quizController');

const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'quizzes', // Folder in Cloudinary
        public_id: (req, file) => Date.now() + '-' + file.originalname.replace(/\s+/g, '-'),
    },
})

const upload = multer({ storage })

router.post('/', upload.single('image'), createQuiz)

router.get('/', getQuizzes)

router.get('/:id', getQuiz)

router.delete('/:id', deleteQuiz)

router.put('/:id', upload.single('image'), updateQuiz)

module.exports = router;