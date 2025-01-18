const MealPlan = require("../models/mealPlanModel");

createMealPlan = async (req, res) => {
    try {
        const newMealPlan = new MealPlan({
            title: req.body.title,
            image: `/uploads/mealPlans/${req.file.filename}`,
            days: JSON.parse(req.body.days)
        })
        await newMealPlan.save();
        res.status(201).json({ message: 'Meal Plan added successfully!' });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
}

const getMealPlans = async (req, res) => {
    try {
        const mealPlans = await MealPlan.find().sort({ created: -1 })
        res.status(200).json({ mealPlans })
    }
    catch (error) {
        console.error("error in fetching the meal plans", error.message)
        res.status(500).json({ message: "error in fetching the meal plans", error })
    }
}

const getMealPlan = async (req, res) => {
    try {
        const mealPlan = await MealPlan.findById(req.params.id)
        if (!mealPlan) return res.status(404).send('meal plan not found')
        res.json(mealPlan)
    } catch (error) {
        res.status(500).json({ message: "error in fetching the meal plan" })
    }
}

module.exports = {
    createMealPlan,
    getMealPlans,
    getMealPlan
}