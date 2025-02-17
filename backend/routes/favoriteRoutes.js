const express = require('express');
const { addItemId, deleteItemId, getItemId } = require('../controllers/favoriteController');

const router = express.Router();

router.post('/', addItemId)

router.get('/:id', getItemId)

router.delete('/:id', deleteItemId)

module.exports = router;