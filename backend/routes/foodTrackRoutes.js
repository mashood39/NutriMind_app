const express = require('express');
const { getFoodTracks, createFoodTrack, deleteFoodTrack, updateFoodTrack } = require('../controllers/foodTrackController');

const router = express.Router();

router.get('/', getFoodTracks)

router.post('/', createFoodTrack)

router.delete('/:id', deleteFoodTrack)

router.put('/:id', updateFoodTrack)

module.exports = router