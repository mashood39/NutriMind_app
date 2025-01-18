const { Quiz } = require("../models/quizModel");

const createQuiz = async (req, res) => {
    try {
        const { title, questions } = req.body
        const newQuiz = new Quiz({
            title,
            image: `/uploads/quizzes/${req.file.filename}`,
            questions: JSON.parse(questions)
        })
        await newQuiz.save();
        res.status(201).json({ message: "quiz created succesfully", newQuiz })
    } catch (error) {
        res.status(500).json({ messaage: "error in creating quiz" })
    }
}

const getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().sort({ createdAt: -1 });
        res.json(quizzes)
    } catch (error) {
        res.status(500).json({ message: error.messaage })
    }
}

const getQuiz = async (req, res) => {
    const { id } = req.params;

    try {
        const quiz = await Quiz.findById(id);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.json({ quiz })

    } catch (error) {
        console.error("Error in getQuiz:", error.message);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createQuiz,
    getQuizzes,
    getQuiz,
}