const { SubmitQuiz } = require("../models/submitQuizModel")

const submitQuiz = async (req, res) => {

    const { quizId } = req.params;
    // const { userId, score } = req.body;
    const { score } = req.body;

    try {
        // const newSubission = new SubmitQuiz({ userId, quizId, score })
        const newSubission = new SubmitQuiz({ quizId, score })

        await newSubission.save();
        console.log("quiz submitted succesfully")

        res.status(201).json({ messaage: "Quiz submitted succesfully", submission: newSubission })
    } catch (error) {
        console.error("error in submit quiz", error)
        res.status(500).json({ message: "errror in submitting the quiz" })
    }
}

const getSubmittedQuiz = async (req, res) => {
    // const { quizId, userId } = req.params
    const { quizId } = req.params

    try {
        // const submission = await SubmitQuiz.findOne({ quizId, userId })
        const submission = await SubmitQuiz.findOne({ quizId })

        if (!submission) {
            return res.status(404).json({
                success: false,
                message: 'No previous submissions found for this quiz'
            })
        }

        res.status(200).json(submission)
    } catch (error) {
        console.error("error in getting submission ", error.messaage)
        res.status(500).json({ message: "Error in fetching submission" })
    }
}

const resetQuiz = async (req, res) => {
    const { quizId } = req.params

    // const { userId } = req.body

    try {
        // const deleteSubmission = await SubmitQuiz.findOneAndDelete({ quizId, userId })
        const deleteSubmission = await SubmitQuiz.findOneAndDelete({ quizId })
        console.log(deleteSubmission)
        if (!deleteSubmission) {
            return res.status(404).json({ message: "no submission found to reset the quiz" })
        }

        res.status(200).json({ messaage: 'Quiz reset succesfully' })
    } catch (error) {
        console.error("error in reset quiz", error.messaage)
        res.status(500).json({ message: "Error in resetting the quiz" })
    }
}

module.exports = {
    submitQuiz,
    getSubmittedQuiz,
    resetQuiz
}