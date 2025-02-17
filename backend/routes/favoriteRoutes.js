const express = require('express');
const { addItemId, deleteItemId, getItemId, getItemIds } = require('../controllers/favoriteController');

const router = express.Router();

router.get('/', getItemIds)

router.post('/', addItemId)

router.get('/:id', getItemId)

router.delete('/:id', deleteItemId)

module.exports = router;