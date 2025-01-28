import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../lib/api';
import { ClipLoader } from 'react-spinners';

const QuizDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchQuiz = async () => {
        try {
            const response = await api.get(`api/quizzes/${id}`)
            setQuiz(response.data.quiz)
            console.log(response.data)
            setLoading(false)
        } catch (error) {
            console.error("error in fetching the quiz", error.message)
            setLoading(false)
        }
    }

    const deleteQuiz = async () => {
        const confirmDelete = window.confirm("Are you sure want to delete the Quiz")
        if (confirmDelete) {
            try {
                await api.delete(`api/quizzes/${id}`)
                alert('Quiz deleted succesfully')
                navigate('/quizzes')
            } catch ( error){
                console.error("error in deleting the quiz", error.message)
                alert("failed to delete the Quiz, Please try again.")
            }
        }

    }

    useEffect(() => {
        fetchQuiz();
    }, [id])

    return (
        <>
            {loading ? (
                <div className="flex items-center justify-center h-screen" >
                    <ClipLoader color='grey' size={50} />
                </div >
            ) : (
                <div className='pt-4'>
                    <div className="mb-4 flex justify-end">
                        <button
                            onClick={deleteQuiz}
                            className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600"
                        >
                            Delete Quiz
                        </button>
                    </div>

                    <h1 className='text-3xl font-bold mb-4'>{quiz.title}</h1>
                    <img src={quiz.image} alt={quiz.title} className='w-1/4 rounded-md mb-4 shadow-md' />

                    {quiz.questions.map((question) => (
                        <div className='mb-2'>
                            <h2 className='text-1xl font-semibold'>? {question.question}</h2>
                            {question.options.map((option) => (
                                <p className='pl-2'>{option}</p>
                            ))}
                            <p>Correct Answer:<span className='font-semibold'> {question.options[question.correctAnswer + 1]}</span></p>
                        </div>
                    ))}

                </div>
            )}
        </>
    )
}

export default QuizDetails
