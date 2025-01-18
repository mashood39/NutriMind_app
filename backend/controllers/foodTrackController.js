const FoodTrack = require('../models/foodTrackModel')

const getFoodTracks = async (req, res) => {
    try {
        const foodTracks = await FoodTrack.find().sort({ createdAt: -1 })
        res.status(200).json({ foodTracks })
    } catch (error) {
        console.error("error in fetching the food tracks", error)
        res.status(500).json({ message: "error in fetching" })
    }
}

const createFoodTrack = async (req, res) => {
    try {
        const newFoodTrack = new FoodTrack(req.body)
        await newFoodTrack.save();
        res.status(201).json({ message: "food track added " })
    } catch (error) {
        console.error("error in adding in food track", error)
        res.status(500).json({ message: "error in adding food track" })
    }
}

const deleteFoodTrack = async (req, res) => {
    try {
        const { id } = req.params

        const deletedFoodTrack = await FoodTrack.findByIdAndDelete(id)

        if (!deletedFoodTrack) {
            return res.status(404).json({ message: "food track not found" })
        }

        res.status(200).json({ message: "food track deleted succcesfully    " })
    } catch( error){
        console.error("error in deleting the food track")
        res.status(500).json({message: "error in deleting the food track"})
    }
}

module.exports = {
    getFoodTracks,
    createFoodTrack,
    deleteFoodTrack
}