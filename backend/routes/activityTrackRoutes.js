const express = require('express');
const { getActivityTracks, createActivityTrack, deleteActivityTrack } = require('../controllers/activityTrackController');
const router = express.Router();

router.get('/', getActivityTracks)

router.post('/', createActivityTrack)

router.delete('/:id', deleteActivityTrack)

module.exports = router;

