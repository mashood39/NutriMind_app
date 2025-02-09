const mongoose = require('mongoose')

const GlossarySchema = new mongoose.Schema({
    word: { type: String, required: true },
    definition: { type: String, required: true }
}, { timestamps: true })

const Glossary = mongoose.model('Glossary', GlossarySchema)

module.exports = Glossary