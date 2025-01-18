const express = require('express');
const { getFoodTracks, createFoodTrack, deleteFoodTrack } = require('../controllers/foodTrackController');

const router = express.Router();

router.get('/', getFoodTracks)

router.post('/', createFoodTrack)

router.delete('/:id', deleteFoodTrack)

module.exports = router