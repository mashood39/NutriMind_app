const express = require('express')
const cors = require('cors')
require('dotenv').config();
const connectDB = require('./config/db')

const blogRoutes = require('./routes/blogRoutes')
const quizRoutes = require('./routes/quizRoutes')
const userRoutes = require('./routes/userRoutes')
const coggleRoutes = require('./routes/coggleRoutes')
const submitQuizRoutes = require('./routes/submitQuizRoutes')
const mealPlanRoutes = require('./routes/mealPlanRoutes')
const foodTrackRoutes = require('./routes/foodTrackRoutes')
const activityTrackRoutes = require('./routes/activityTrackRoutes')
const glossaryRoutes = require('./routes/glossaryRoutes')

// const uservalidation = require('./middleware/uservalidation')
connectDB();
const app = express()
app.use(cors());

app.use(express.json())

app.get("/", (req, res) => {
    res.send("backend running ok")
})

// app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 4000

// app.use(uservalidation)
app.use('/api/user', userRoutes)
app.use('/', coggleRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/quizzes', quizRoutes)
app.use('/api/submissions', submitQuizRoutes)
app.use('/api/meal-plans', mealPlanRoutes)
app.use('/api/food-tracks', foodTrackRoutes)
app.use('/api/activity-tracks', activityTrackRoutes)
app.use('/api/glossaries', glossaryRoutes)

app.listen(PORT, '0.0.0.0', () => {
    console.log('server running succesfully,', PORT)
})
