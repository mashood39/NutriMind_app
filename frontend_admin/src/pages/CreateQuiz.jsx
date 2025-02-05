import React, { useEffect, useState } from 'react'
import api from '../lib/api'
import { useLocation, useNavigate } from 'react-router-dom'

const CreateQuiz = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const existingQuiz = location.state;

    const [title, setTitle] = useState(existingQuiz?.title || '')
    const [image, setImage] = useState(existingQuiz?.image || null)
    const [questions, setQuestions] = useState(existingQuiz?.questions || [])
    const [previewImage, setPreviewImage] = useState(existingQuiz?.image || '')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleImageChange = (e) => {
        setError('')
        const file = e.target.files[0]

        setImage(file)
        setPreviewImage(URL.createObjectURL(file))
    }

    const addQuestion = () => {
        setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }])
    }

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions]
        newQuestions[index].question = value
        setQuestions(newQuestions)
    }

    const handleOptionChange = (qIndex, oIndex, value) => {
        const newQuestions = [...questions]
        newQuestions[qIndex].options[oIndex] = value;
        setQuestions(newQuestions)
    }

    const handleCorrectAnswerChange = (qIndex, value) => {
        const newQuestions = [...questions]
        newQuestions[qIndex].correctAnswer = parseInt(value, 10)
        setQuestions(newQuestions)
    }


    const handleSubmit = async () => {
        setLoading(true)

        if (!title.trim() || (!questions.length && !existingQuiz) || !image) {
            setError('Please add all fields')
            setLoading(false)
            return
        }

        const formData = new FormData();

        formData.append('title', title)
        if (image) {
            formData.append('image', image)
        }
        formData.append('questions', JSON.stringify(questions))

        try {
            if (existingQuiz) {
                await api.put(`/api/quizzes/${existingQuiz._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                alert('Quiz updted succesfully')
            } else {
                await api.post('/api/quizzes', formData, {
                    headers: {
                        'Content-type': 'multipart/form-data'
                    }
                })
                alert("Quiz added succesfully")
            }
            navigate('/quizzes')
        } catch (error) {
            console.error("error in saving the quiz", error)
            alert("failed to save the quiz, Please try again")
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="px-8 bg-gray-100 min-h-screen mb-10">
            <h1 className='text-3xl font-bold my-4'>
                {existingQuiz ? 'Edit Quiz' : 'Create Quiz'}
            </h1>
            <input
                type='text'
                placeholder='Add Quiz title'
                className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value)
                    setError('')
                }}
                required
            />
            <input
                type='file'
                accept="image/*"
                onChange={handleImageChange}
                required
                className="block w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {previewImage && (
                <img src={previewImage} alt='preview' className="w-1/4 rounded-md mb-4 shadow-md" />
            )}

            <h2 className='text-2xl font-bold my-4 text-gray-700'>Questions</h2>

            {questions.map((q, qIndex) => (
                <div key={qIndex} className="bg-gray-50 border rounded-lg p-4 mb-4 shadow-sm">
                    <input
                        type='text'
                        placeholder='Add question'
                        value={q.question}
                        onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                        className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {q.options.map((opt, oIndex) => (
                            <input
                                key={oIndex}
                                type='text'
                                placeholder={`Option ${oIndex + 1}`}
                                value={opt}
                                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        ))}
                    </div>
                    <label className="block mt-4">
                        Correct Answer:
                        <select
                            value={q.correctAnswer}
                            onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                            className="block w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            {q.options.map((_, oIndex) => (
                                <option key={oIndex} value={oIndex}>
                                    Option {oIndex + 1}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            ))}

            {error && (
                <p className='text-red-500'>{error}</p>
            )}

            <div className="flex justify-between mt-4 gap-4">
                <button
                    onClick={addQuestion}
                    className="flex-1 p-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
                >
                    Add Question
                </button>
                <button
                    type='button'
                    onClick={handleSubmit}
                    className="flex-1 p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Save Quiz'}
                </button>

                {existingQuiz && (
                    <button
                        className='flex-1 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600'
                        onClick={() => navigate('/quizzes')}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    )
}

export default CreateQuiz
