import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../lib/api';

function MealPlanDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [mealPlan, setMealPlan] = useState(null)

    const fetchBlogDetails = async () => {
        try {
            const response = await api.get(`api/meal-plans/${id}`)
            console.log(response.data)
            setMealPlan(response.data)
        } catch (error) {
            console.error("error in fetching the meal plans:", error.message)
        }
    }

    const deleteMealPlan = async () => {
        const confirmDelete = window.confirm("Are you sure want to delete the meal plan")
        if (confirmDelete) {
            try {
                await api.delete(`api/meal-plans/${id}`)
                alert('Meal Plan deleted succesfully')
                navigate('/mealPlans')
            } catch (error) {
                console.error("error in deleting the meal plan", error.message)
                alert('failed to delete the meal plan , Please try again')
            }
        }
    }

    useEffect(() => {
        fetchBlogDetails();
    }, [id])

    if (!mealPlan) {
        return <div>Loading...</div>;
    }

    return (
        <div className='p-4'>

            <div className='mb-4 flex justify-end'>
                <button
                    onClick={deleteMealPlan}
                    className='bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600'
                >
                    Delete Meal Plan
                </button>
            </div>

            <h1 className='text-3xl font-bold mb-4'>{mealPlan.title}</h1>
            <img
                src={mealPlan.image}
                alt={mealPlan.title}
                className='w-1/4 rounded-md mb-4 shadow-md'
            />

            {mealPlan.days.map((dayPlan) => (
                <div key={dayPlan._id} className='border border-gray-400 p-4 rounded-md mb-4'>
                    <h1 className='text-xl font-semibold mb-2'>{dayPlan.day}</h1>
                    <div className='grid grid-cols-3 gap-4'>
                        {dayPlan.meals.map((meal) => (
                            <div key={meal._id}>
                                <h1 className='font-semibold bg-blue-200 rounded-md p-2'>{meal.time}</h1>
                                {meal.meals.map((mealItem) => (
                                    <div key={mealItem._id} className='flex gap-x-2 mb-2'>
                                        <h1 className='w-1/2'>{mealItem.meal}</h1>
                                        <h2>{mealItem.quantity}</h2>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

            ))}
        </div>
    )
}

export default MealPlanDetails
