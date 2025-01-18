const express = require('express')
const multer = require('multer');
const { createQuiz, getQuiz, getQuizzes, submitQuiz } = require('../controllers/quizController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/quizzes')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage })

router.post('/', upload.single('image'), createQuiz)

router.get('/', getQuizzes)

router.get('/:id', getQuiz)


module.exports = router;