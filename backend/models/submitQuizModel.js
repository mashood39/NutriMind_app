const mongoose = require('mongoose')

const quizSubmitSchema = new mongoose.Schema({
    // userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, required: true },
    score: { type: Number, required: true },
}, { timestamps: true });

const SubmitQuiz = mongoose.model('SubmitQuiz', quizSubmitSchema)

module.exports = { SubmitQuiz }

