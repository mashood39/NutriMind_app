const mongoose = require('mongoose')

const FavoriteSchema = new mongoose.Schema({
    itemId: { type: String, required: true }
}, { timestamps: true })

const Favorite = mongoose.model('Favorite', FavoriteSchema)

module.exports = Favorite