import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Home = () => {

  const navigate = useNavigate();

  const createBlog = () => {
    navigate('/create-blog')
  }

  return (
    <div>
      <h1 className='text-3xl font-bold my-4'>This is admin home page</h1>

      <Link to="/create-blog">
        <button className='rounded-xl border-4 p-2 bg-cyan-500' >
          Create blog
        </button>
      </Link>

      <Link to="/create-quiz">
        <button className='rounded-xl border-4 p-2 bg-cyan-500' >
          Create Quiz
        </button>
      </Link>

      <Link to="/create-meal-plan">
        <button className='rounded-xl border-4 p-2 bg-cyan-500' >
          Create Meal Plans
        </button>
      </Link>

    </div>
  )
}

export default Home
