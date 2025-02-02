const ActivityTrack = require('../models/activityTrackModel')

const getActivityTracks = async (req, res) => {
    try {
        const activityTracks = await ActivityTrack.find().sort({ createdAt: -1 })
        res.status(200).json({ activityTracks })
    } catch (error) {
        console.error("error in fetching the food tracks", error)
        res.status(500).json({ message: "error in fetching" })
    }
}

const createActivityTrack = async (req, res) => {
    try {
        const newActivityTrack = new ActivityTrack(req.body)
        await newActivityTrack.save();
        res.status(201).json({ message: "food track added " })
    } catch (error) {
        console.error("error in adding in food track", error)
        res.status(500).json({ message: "error in adding food track" })
    }
}

const deleteActivityTrack = async (req, res) => {
    try {
        const { id } = req.params
        const deletedActivityTrack = await ActivityTrack.findByIdAndDelete(id);

        if (!deletedActivityTrack) {
            return res.status(404).json({ message: "activity track not found" })
        }

        res.status(200).json({ message: "activity track deleted succesfully" })
    } catch (error) {
        console.error("error in deleting acitivity track", error)
        res.status(500).json({ messasge: "error in deleting activity track" })
    }
}

const updateActivityTrack = async (req, res) => {
    try {
        const { id } = req.params

        const updateActivityTrack = await ActivityTrack.findByIdAndUpdate(id, req.body, { new: true })

        if (!updateActivityTrack) {
            return res.status(404).json({ message: "acitivity track updated not found" })
        }

        res.status(200).json({ message: "activity track updated succesfully" })
    } catch (error) {
        console.error("error in updating the activity track", error)
        res.status(500).json({ message: "error in updating the actitvity track" })
    }
}

module.exports = {
    getActivityTracks,
    createActivityTrack,
    deleteActivityTrack,
    updateActivityTrack
}