const mongoose = require('mongoose')

const FoodTrackSchema = new mongoose.Schema({
    date: { type: String, required: true },
    time: { type: String, },
    food: { type: String, required: true },
    calorie: { type: String, }
}, { timestamps: true })

const FoodTrack = mongoose.model('FoodTrack', FoodTrackSchema)

module.exports = FoodTrack

// const deleteAllEntries = async () => {
//     try {
//         const result = await FoodTrack.deleteMany({});
//         console.log(`Deleted ${result.deletedCount} entries`);
//         // mongoose.connection.close(); // Close the connection
//     } catch (error) {
//         console.error("Error deleting entries:", error);
//     }
// };

// deleteAllEntries();