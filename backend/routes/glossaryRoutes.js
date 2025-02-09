const express = require('express');
const { getGlossaries, createGlossary, deleteGlossary, updateGlossary } = require('../controllers/glossaryController');

const router = express.Router();

router.get('/', getGlossaries)

router.post('/', createGlossary)

router.delete('/:id', deleteGlossary)

router.put('/:id', updateGlossary)

module.exports = router