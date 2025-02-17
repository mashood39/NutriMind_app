const Favorite = require("../models/favoriteModel")

const addItemId = async (req, res) => {
    try {
        const { itemId } = req.body
        const newFavorite = new Favorite({ itemId })
        await newFavorite.save();
        console.log("added to favorites")
        res.status(200).json({ message: 'Item added to favorites' })
    } catch (error) {
        console.error("error in adding to the favorites", error.message)
        res.status(500).json({ message: "error in adding to favorites" })
    }
}

const getItemId = async (req, res) => {
    try {
        const itemId = await Favorite.findOne({ itemId: req.params.id })
        res.status(200).json({ isFavorite: !!itemId })
    } catch (error) {
        console.error("error in fetching the item id", error.message)
        res.status(500).json({ message: "error in fetching the item id" })
    }
}

const deleteItemId = async (req, res) => {
    try {
        const { id } = req.params;
        await Favorite.findOneAndDelete({ itemId: id })
        console.log("removed from favorites")
        res.status(200).json({ message: 'removed from favorites' })
    } catch (error) {
        res.status(500).json({ message: "error in removing from the favorites" })
    }
}

module.exports = {
    addItemId,
    getItemId,
    deleteItemId
}

