const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const blogRoutes = require('./routes/blogRoutes')
const quizRoutes = require('./routes/quizRoutes')
const userRoutes = require('./routes/userRoutes')
const coggleRoutes = require('./routes/coggleRoutes')
const submitQuizRoutes = require('./routes/submitQuizRoutes')
const mealPlanRoutes = require('./routes/mealPlanRoutes')
const foodTrackRoutes = require('./routes/foodTrackRoutes')
const activityTrackRoutes = require('./routes/activityTrackRoutes')

// const uservalidation = require('./middleware/uservalidation')

dotenv.config()
connectDB();
const app = express()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 4000

// app.use(uservalidation)
app.use('/api/user', userRoutes)
app.use('/' , coggleRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/quizzes', quizRoutes)
app.use('/api/submissions', submitQuizRoutes)
app.use('/api/meal-plans' , mealPlanRoutes)
app.use('/api/food-tracks', foodTrackRoutes)
app.use('/api/activity-tracks', activityTrackRoutes)


app.listen(PORT, '0.0.0.0', () => {
    console.log('server running succesfully,', PORT)
})
