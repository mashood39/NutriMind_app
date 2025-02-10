import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='flex justify-evenly p-6 border-b-2'>
            <NavLink to="/" className='text-lg text-black hover:text-blue-500 mr-4'
                style={({ isActive }) => isActive ? { color: '#2196F3', fontWeight: '500' } : {}}
            >
                Home
            </NavLink>
            <NavLink to="/blogs" className='text-lg text-black hover:text-blue-500 mr-4'
                style={({ isActive }) => isActive ? { color: '#2196F3', fontWeight: '500' } : {}}
            >
                Blogs
            </NavLink>
            <NavLink to="/quizzes" className='text-lg text-black hover:text-blue-500 mr-4'
                style={({ isActive }) => isActive ? { color: '#2196F3', fontWeight: '500' } : {}}
            >
                Quizzes
            </NavLink>
            <NavLink to="/meal-plans" className='text-lg text-black hover:text-blue-500 mr-4'
                style={({ isActive }) => isActive ? { color: '#2196F3', fontWeight: '500' } : {}}
            >
                Meal Plans
            </NavLink>
            <NavLink to="/glossaries" className='text-lg text-black hover:text-blue-500 mr-4'
                style={({ isActive }) => isActive ? { color: '#2196F3', fontWeight: '500' } : {}}
            >
                Glossary
            </NavLink>
        </div>
    )
}

export default Navbar
