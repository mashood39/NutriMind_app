const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('database connected succesfully')

    }
    catch (error) {
        console.log('error in database connection : ', error.message)
    }
}

module.exports = connectDB