const express = require('express');
const { getActivityTracks, createActivityTrack, deleteActivityTrack, updateActivityTrack } = require('../controllers/activityTrackController');
const router = express.Router();

router.get('/', getActivityTracks)

router.post('/', createActivityTrack)

router.delete('/:id', deleteActivityTrack)

router.put('/:id', updateActivityTrack)

module.exports = router;

