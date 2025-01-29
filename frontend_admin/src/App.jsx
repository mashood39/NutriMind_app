import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateBlog from './pages/CreateBlog'
import CreateQuiz from './pages/CreateQuiz'
import CreateMealPlan from './pages/CreateMealPlan'
import Blogs from './pages/Blogs'
import BlogDetails from './pages/BlogDetails'
import Quizzes from './pages/Quizzes'
import QuizDetails from './pages/QuizDetails'
import MealPlans from './pages/MealPlans'
import MealPlanDetails from './pages/MealPlanDetails'

function App() {

  return (
    <div className='w-3/4 mx-auto'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/quizzes' element={<Quizzes />} />
          <Route path='/mealPlans' element={<MealPlans />} />
          <Route path='/create-blog' element={<CreateBlog />} />
          <Route path='/create-quiz' element={<CreateQuiz />} />
          <Route path='/create-meal-plan' element={<CreateMealPlan />} />
          <Route path='/blogs/:id' element={<BlogDetails />} />
          <Route path='/quizzes/:id' element={<QuizDetails />} />
          <Route path='/mealPlans/:id' element={<MealPlanDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
