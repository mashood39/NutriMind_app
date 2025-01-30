import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api';
import { ClipLoader } from 'react-spinners';

function MealPlans() {

    const [mealPlans, setMealPlans] = useState([]);
    const [loading, setLoading] = useState(true)

    const fetchMealPlan = async () => {
        try {
            const response = await api.get('api/meal-plans')
            setMealPlans(response.data.mealPlans)
            setLoading(false)
        } catch (error) {
            console.error("error in fetching the meal plans", error.message)
        }
    }

    useEffect(() => {
        fetchMealPlan();
    }, [])

    return (
        <>
            {loading ? (
                <div className='flex items-center justify-center h-screen'>
                    <ClipLoader color='grey' size={50} />
                </div>
            ) : (
                <>
                    <h1 className='text-3xl font-bold my-4'>Meal Plans</h1>
                    <Link to="/create-meal-plan">
                        <button className='rounded-xl p-2 bg-blue-500 text-white mb-4' >
                            Create Meal Plan
                        </button>
                    </Link>
                    <div className='grid md:grid-cols-2 gap-2'>
                        {mealPlans.map((mealPlan) => (
                            <div
                                key={mealPlan._id}
                                className="p-4 mb-4 border rounded-md shadow-md"
                            >
                                <h2 className='text-xl font-semibold'>{mealPlan.title}</h2>
                                <Link to={`/mealPlans/${mealPlan._id}`} className='text-blue-500'>
                                    Read more
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            )}

        </>
    )
}

export default MealPlans
