import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'
import { ClipLoader } from 'react-spinners';

const Quizzes = () => {

    const [quizzes, setQuizzes] = useState([])
    const [loading, setLoading] = useState(true)


    const fetchQuizzes = async () => {
        try {
            const response = await api.get('api/quizzes')
            setQuizzes(response.data)
            setLoading(false)
        } catch (error) {
            console.error("error in fetching the quiz", error.messsage)

        }
    }

    useEffect(() => {
        fetchQuizzes();
    }, [])
    return (
        <div>
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <ClipLoader color='grey' size={50} />
                </div>
            ) : (
                <>
                    <h1 className='text-3xl font-bold my-4'>Quizzes</h1>
                    <Link to="/create-quiz">
                        <button className='rounded-xl p-2 bg-blue-500 text-white mr-4 mb-4' >
                            Create Quiz
                        </button>
                    </Link>
                    <div className='grid md:grid-cols-2 gap-2'>
                        {
                            quizzes.map((quiz) => (
                                <div
                                    key={quiz._id} // Ensure each blog has a unique 'id'
                                    className="p-4 mb-4 border rounded-md shadow-md"
                                >
                                    <h2 className="text-xl font-semibold">{quiz.title}</h2>
                                    <Link to={`/quizzes/${quiz._id}`} className="text-blue-500">
                                        Read more
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                </>
            )}
        </div>
    )
}

export default Quizzes
