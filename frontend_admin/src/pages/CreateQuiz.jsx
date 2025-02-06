import React, { useEffect, useState } from 'react'
import api from '../lib/api'
import { useLocation, useNavigate } from 'react-router-dom'
import { MdClose } from 'react-icons/md'

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
        setError('')
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

    const removeQuestion = (index) => {
        setQuestions(questions.filter((_, qIndex) => qIndex !== index))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!title.trim() || questions.length === 0 || !image) {
            setError('Please add all fields')
            setLoading(false)
            return
        }
        setLoading(true)

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
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Add Quiz title'
                    className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                        setError('')
                    }}
                />
                <input
                    type='file'
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {previewImage && (
                    <img src={previewImage} alt='preview' className="w-1/4 rounded-md mb-4 shadow-md" />
                )}

                <h2 className='text-2xl font-bold my-4 text-gray-700'>Questions</h2>

                {questions.map((q, qIndex) => (
                    <div key={qIndex} className="bg-gray-50 border rounded-lg p-4 mb-4 shadow-sm">
                        <div className="flex justify-end mb-2">
                            <MdClose size={25} color='red' className='bg-blue-100 p-1 rounded-md' onClick={() => removeQuestion(qIndex)} />
                        </div>
                        <input
                            type='text'
                            placeholder='Add question'
                            value={q.question}
                            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
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
                                    required
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

                <div className={`flex justify-between mt-4 gap-4`}>
                    <button
                        type='button'
                        onClick={addQuestion}
                        className={`flex-1 p-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''} `}
                    >
                        Add Question
                    </button>
                    <button
                        type='submit'
                        className={`flex-1 p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''} `}
                        disabled={loading}
                    >
                        {loading ? (existingQuiz ? 'Updating...' : 'Adding....') : (existingQuiz ? 'Update Quiz' : 'Add Quiz')}
                    </button>

                    {existingQuiz && (
                        <button
                            type='button'
                            className={`flex-1 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => navigate('/quizzes')}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default CreateQuiz
