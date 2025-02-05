const { Quiz } = require("../models/quizModel");

const createQuiz = async (req, res) => {
    try {
        const { title, questions } = req.body
        const imageUrl = req.file.path

        const newQuiz = new Quiz({
            title,
            image: imageUrl,
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

const deleteQuiz = async (req, res) => {
    const { id } = req.params
    try {
        await Quiz.findByIdAndDelete(id);
        return res.status(200).json({ message: "Quiz deleted succesfully" })
    } catch (error) {
        console.error("error in deleting the quiz", error.messaage)
        return res.status(500).json({ message: error.messaage })
    }
}

const updateQuiz = async (req, res) => {
    try {
        const { id } = req.params
        let updatedData = { ...req.body }
        if (req.file) {
            updatedData.image = req.file.path
        }
        if (updatedData.questions) {
            updatedData.questions = JSON.parse(updatedData.questions)
        }
        const updatedQuiz = await Quiz.findByIdAndUpdate(id, updatedData, { new: true })
        res.status(200).json({ message: "quiz updated succesfully", updatedQuiz })
    } catch (error) {
        console.error("error in updating the quiz", error.message)
        res.status(500).json({ message: "error in updating the quiz" })
    }
}

module.exports = {
    createQuiz,
    getQuizzes,
    getQuiz,
    deleteQuiz,
    updateQuiz
}