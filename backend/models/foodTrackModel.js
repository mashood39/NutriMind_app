const mongoose = require('mongoose')

const FoodTrackSchema = new mongoose.Schema({
    date: { type: String, required: true },
    time: { type: String, },
    food: { type: String, required: true },
    quantity: { type: String, }
}, { timestamps: true })

const FoodTrack = mongoose.model('FoodTrack', FoodTrackSchema)

module.exports = FoodTrack