const Glossary = require("../models/glossaryModel")

const getGlossaries = async (req, res) => {
    try {
        const glossaries = await Glossary.find().sort({ word: 1 })
        res.status(200).json(glossaries)
    } catch (error) {
        console.error("error in fetching glossaries:", error.message)
        res.status(500).json({ message: "error in fetching glossareis" })
    }
}

const createGlossary = async (req, res) => {
    try {
        const newGlossary = new Glossary(req.body)
        await newGlossary.save();
        res.status(201).json({ message: 'glossary added' })
    } catch (error) {
        console.error("error in adding glossaries:", error.message)
        res.status(500).json({ message: "error in adding glossaries" })
    }
}

const deleteGlossary = async (req, res) => {
    try {
        const { id } = req.params
        const deleteGlossary = await Glossary.findByIdAndDelete(id)
        res.status(200).json({ message: 'glossary item deleted succesfully' })
    } catch (error) {
        console.error("error in deleting the gloassary item", error.message)
        res.status(500).json({ message: 'error in deleting the glossary item' })
    }
}

const updateGlossary = async (req, res) => {
    try {
        const { id } = req.params
        const updateGlossary = await Glossary.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({ message: "Glossary item updated sucesfully" })
    } catch (error) {
        console.error("error in updating the glossary item", error.message)
        res.status(500).json({ message: "error in updating the glossary item" })
    }
}

module.exports = {
    getGlossaries,
    createGlossary,
    deleteGlossary,
    updateGlossary
}