import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <div>
      <h1 className='text-3xl font-bold my-4'>This is admin home page</h1>

      <Link to="/blogs">
        <button className='rounded-xl p-2 bg-blue-500 text-white mr-4'>
          Blogs
        </button>
      </Link>

      <Link to="/quizzes">
        <button className='rounded-xl p-2 bg-blue-500 text-white mr-4'>
          Quizzes
        </button>
      </Link>

      <Link to="/create-meal-plan">
        <button className='rounded-xl p-2 bg-blue-500 text-white' >
          Create Meal Plans
        </button>
      </Link>

    </div>
  )
}

export default Home
