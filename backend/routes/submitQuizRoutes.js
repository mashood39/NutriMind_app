const express = require('express')
const { getSubmittedQuiz, submitQuiz, resetQuiz } = require('../controllers/submitQuizController');

const router = express.Router();

router.post('/:quizId/submit', submitQuiz)

// router.get('/:quizId/:userId', getSubmittedQuiz)
router.get('/:quizId', getSubmittedQuiz)

router.post('/:quizId/reset', resetQuiz)

module.exports = router