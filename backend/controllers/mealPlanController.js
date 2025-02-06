const MealPlan = require("../models/mealPlanModel");

const createMealPlan = async (req, res) => {
    try {
        const { title, mealPlan } = req.body
        const imageUrl = req.file.path

        const newMealPlan = new MealPlan({
            title,
            image: imageUrl,
            days: JSON.parse(mealPlan)
        })

        await newMealPlan.save();
        res.status(201).json({ message: 'Meal Plan added successfully!' });
    } catch (error) {
        console.log("error in adding the meal plan:", error.message)
        res.status(500).json({ error: error.message });
    }
}

const getMealPlans = async (req, res) => {
    try {
        const mealPlans = await MealPlan.find().sort({ createdAt: -1 });
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

const deleteMealPlan = async (req, res) => {
    try {
        await MealPlan.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Meal Plan deleted succesfully" })
    } catch (error) {
        res.status(500).json({ message: "error in deleting the meal plan" })
    }
}

const updateMealPlan = async (req, res) => {
    try {
        const { id } = req.params
        let updatedData = { ...req.body }

        if (req.file) {
            updatedData.image = req.file.path
        }
        if (updatedData.mealPlan) {
            updatedData.days = JSON.parse(updatedData.mealPlan)
        }
        const updatedMealPlan = await MealPlan.findByIdAndUpdate(id, updatedData, { new: true })
        res.status(200).json({ message: "meal plan updated succesfully", updatedMealPlan })
    } catch (error) {
        console.error("error in updating the meal plan", error.message)
        res.status(500).json({ message: "error in updating the meal plan" })
    }
}

module.exports = {
    createMealPlan,
    getMealPlans,
    getMealPlan,
    deleteMealPlan,
    updateMealPlan
}