import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateBlog from './pages/CreateBlog'
import CreateQuiz from './pages/CreateQuiz'
import CreateMealPlan from './pages/CreateMealPlan'

function App() {

  return (
    <div className='w-3/4 mx-auto'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-blog' element={<CreateBlog />} />
          <Route path='/create-quiz' element={<CreateQuiz />} />
          <Route path='/create-meal-plan' element={<CreateMealPlan />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
