const express = require('express')
const { getSubmittedQuiz, submitQuiz, resetQuiz, getSubmittedQuizzes } = require('../controllers/submitQuizController');

const router = express.Router();

router.post('/:quizId/submit', submitQuiz)

router.get('/', getSubmittedQuizzes)

router.get('/:quizId', getSubmittedQuiz)

router.post('/:quizId/reset', resetQuiz)

module.exports = router