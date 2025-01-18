const mongoose = require('mongoose')

const ActivityTrackSchema = new mongoose.Schema({
    date: { type: String, required: true },
    time: { type: String },
    activity: { type: String, required: true },
    duration: { type: String }
}, { timestamps: true })

const ActivityTrack = mongoose.model('ActivityTrack', ActivityTrackSchema)

module.exports = ActivityTrack