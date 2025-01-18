const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String , required: true},
    content: { type: String, required: true },
}, { timestamps: true })

const Blog = mongoose.model('Blog', BlogSchema)

module.exports = Blog

// const deleteAllEntries = async () => {
//     try {
//         const result = await Blog.deleteMany({});
//         console.log(`Deleted ${result.deletedCount} entries`);
//         // mongoose.connection.close(); // Close the connection
//     } catch (error) {
//         console.error("Error deleting entries:", error);
//     }
// };

// deleteAllEntries();