const mongoose = require('mongoose')

const mealPlanSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    days: [
        {
            day: String,
            meals: [
                {
                    time: String,
                    meals: [
                        {
                            meal: String,
                            quantity: String,
                        },
                    ],
                },
            ],
        },
    ],
});

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

module.exports = MealPlan