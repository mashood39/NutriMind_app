import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <div>
      <h1 className='text-3xl font-bold my-4'>This is admin home page</h1>

      <Link to="/blogs">
        <button className='rounded-xl border-4 p-2 bg-blue-500 text-white mr-4'>
          Blogs
        </button>
      </Link>

      <Link to="/create-quiz">
        <button className='rounded-xl border-4 p-2 bg-blue-500 text-white mr-4' >
          Create Quiz
        </button>
      </Link>

      <Link to="/create-meal-plan">
        <button className='rounded-xl border-4 p-2 bg-blue-500 text-white' >
          Create Meal Plans
        </button>
      </Link>

    </div>
  )
}

export default Home
