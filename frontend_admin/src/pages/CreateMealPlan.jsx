import React, { useState } from "react";
import api from "../lib/api";
import { useLocation, useNavigate } from "react-router-dom";
import { HiPlusSmall } from "react-icons/hi2";

const CreateMealPlan = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const existingMealPlan = location.state;

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const times = ["6AM", "8AM", "10AM", "12PM", "4PM", "7PM"];

    const [title, setTitle] = useState(existingMealPlan?.title || "");
    const [image, setImage] = useState(existingMealPlan?.image || null);
    const [previewImage, setPreviewImage] = useState(existingMealPlan?.image || '')

    const [mealPlan, setMealPlan] = useState(
        days.map((day) => ({
            day,
            meals: times.map((time) => ({
                time,
                meals: existingMealPlan?.days?.find(d => d.day === day)?.meals.find(m => m.time === time)?.meals || [{
                    meal: '', quantity: ''
                }]
            })),
        }))
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)

    const handleMealChange = (dayIndex, timeIndex, mealIndex, field, value) => {
        const updatedPlan = [...mealPlan];
        updatedPlan[dayIndex].meals[timeIndex].meals[mealIndex][field] = value;
        setMealPlan(updatedPlan);
    };

    const handleAddMeal = (dayIndex, timeIndex) => {
        const updatedPlan = [...mealPlan]
        updatedPlan[dayIndex].meals[timeIndex].meals.push({ meal: "", quantity: "" })
        setMealPlan(updatedPlan)
    }

    const handleImageChange = (e) => {
        setError('')
        const file = e.target.files[0]
        setImage(file)
        setPreviewImage(URL.createObjectURL(file))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !image) {
            setError('Please add all fields')
            return;
        }

        setLoading(true);
        const formData = new FormData();

        formData.append("title", title);
        if (image) {
            formData.append('image', image)
        }
        formData.append("mealPlan", JSON.stringify(mealPlan));

        try {
            if (existingMealPlan) {
                await api.put(`/api/meal-plans/${existingMealPlan._id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                alert('meal plan updated succesfully')
            }
            else {
                await api.post("/api/meal-plans", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                alert("Meal Plan added successfully!");
            }
            navigate('/meal-plans')
        } catch (error) {
            console.error("error in saving the meal plan", error.message);
            alert("Error adding meal plan. Please try again.");
        } finally {
            setLoading(false)
        }
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto pt-4 mb-10 bg-gray-50 rounded-lg shadow-md"
        >
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Meal Plan</h1>

            <div className="mb-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                        setError('')
                    }}
                    placeholder="Enter Meal Plan title"
                    className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {previewImage && (
                    <img src={previewImage} alt="preview" className="w-1/4 rounded-md mb-4 shadow-md" />
                )}
            </div>

            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Meal Plan</h2>
                <div className="space-y-6 mb-6">
                    {mealPlan.map((dayPlan, dayIndex) => (
                        <div key={dayPlan.day} className="p-4 border border-gray-300 rounded-md">
                            <h3 className="text-lg font-medium text-gray-700 mb-3">{dayPlan.day}</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {/* <div className="space-y-4"> */}
                                {dayPlan.meals.map((timeSlot, timeIndex) => (
                                    <div key={timeSlot.time}>
                                        <label
                                            className="block text-sm text-gray-600 mb-1"
                                            htmlFor={`${dayPlan.day}-${timeSlot.time}-meal`}
                                        >
                                            {timeSlot.time}
                                        </label>
                                        {timeSlot.meals.map((meal, mealIndex) => (
                                            <div key={mealIndex} className="flex gap-x-2 mb-2">
                                                <input
                                                    type="text"
                                                    placeholder="Meal"
                                                    value={meal.meal}
                                                    onChange={(e) =>
                                                        handleMealChange(
                                                            dayIndex,
                                                            timeIndex,
                                                            mealIndex,
                                                            "meal",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-2/3 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Qty"
                                                    value={meal.quantity}
                                                    onChange={(e) =>
                                                        handleMealChange(
                                                            dayIndex,
                                                            timeIndex,
                                                            mealIndex,
                                                            "quantity",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-1/3 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                                />
                                                {/* <button
                                                    type="button"
                                                    onClick={() => handleAddMeal(dayIndex, timeIndex)}
                                                    className="text-black-500 text-sm bg-emerald-200 w-10 h-11 rounded-md focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                                                >
                                                    +
                                                </button> */}
                                                <HiPlusSmall
                                                    size={42}
                                                    className="bg-emerald-200 p-1 rounded-md text-normal focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                                                    type="button"
                                                    onClick={() => handleAddMeal(dayIndex, timeIndex)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ))}

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {error && (
                <p className="text-red-500 mb-2">{error}</p>
            )}

            <div className={`flex ${existingMealPlan ? 'flex-row gap-2' : ''}`}>
                <button
                    type="submit"
                    className={`p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${existingMealPlan ? 'flex-1' : 'w-full'}`}
                    disabled={loading}
                >
                    {loading ? (existingMealPlan ? 'Updating...' : 'Adding...') : (existingMealPlan ? 'Update Meal Plan' : 'Add Meal Plan')}
                </button>

                {existingMealPlan && (
                    <button
                        type='button'
                        className={`flex-1 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''} `}
                        onClick={() => navigate('/meal-plans')}
                    >
                        Cancel
                    </button>
                )}
            </div>


        </form>
    );
};
export default CreateMealPlan;
