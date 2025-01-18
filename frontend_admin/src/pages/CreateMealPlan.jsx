import React, { useState } from "react";
import axios from "axios";

const CreateMealPlan = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const times = ["6AM", "8AM", "10AM", "12PM", "4PM", "7PM"];

    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [mealPlan, setMealPlan] = useState(
        days.map((day) => ({
            day,
            meals: times.map((time) => ({ time, meals: [{ meal: "", quantity: "" }] })),
        }))
    );
    const [loading, setLoading] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("image", image);
        formData.append("days", JSON.stringify(mealPlan));

        try {
            const response = await axios.post("http://localhost:4000/api/meal-plans", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log(response.data.message);
            alert("Meal Plan added successfully!");
            setLoading(false);
            setTitle("");
            setMealPlan(
                days.map((day) => ({
                    day,
                    meals: times.map((time) => ({ time, meals: [{ meal: "", quantity: "" }] })),
                }))
            );
            setImage(null);
        } catch (error) {
            console.error(error);
            alert("Error adding meal plan. Please try again.");
            setLoading(false);
        }
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md"
        >
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Meal Plan</h1>

            {/* Title Input */}
            <div className="mb-4">
                <input
                    id="title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter meal plan title"
                    className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                    className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Meal Plan */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Meal Plan</h2>
                <div className="space-y-6">
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
                                                    // id={`${dayPlan.day}-${meal.time}-meal`}
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
                                                    // id={`${dayPlan.day}-${meal.time}-quantity`}
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
                                                <button
                                                    type="button"
                                                    onClick={() => handleAddMeal(dayIndex, timeIndex)}
                                                    className="text-black-500 text-sm bg-emerald-200 w-10 h-11 rounded-md focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ))}

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                className={`w-full p-2 my-6 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition ${loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                disabled={loading}
            >
                {loading ? "Adding..." : "Add Meal Plan"}
            </button>
        </form>
    );

};
export default CreateMealPlan;
