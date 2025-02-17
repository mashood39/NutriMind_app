const mongoose = require('mongoose')

const FavoriteSchema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId }
}, { timestamps: true })

const Favorite = mongoose.model('Favorite', FavoriteSchema)

module.exports = Favorite