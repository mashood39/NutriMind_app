import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'
import { ClipLoader } from 'react-spinners';

const Blogs = () => {

    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        try {
            const response = await api.get('api/blogs')
            setBlogs(response.data.blogs)
            setLoading(false)
        } catch (error) {
            console.error("error in fetching blogs", error.message)
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, [])
    return (
        <>
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <ClipLoader color='grey' size={50} />
                </div>
            ) : (
                <>
                    <h1 className='text-3xl font-bold my-4'>Blogs</h1>
                    <Link to="/create-blog">
                        <button className='rounded-xl p-2 bg-blue-500 text-white mb-4' >
                            Create blog
                        </button>
                    </Link>
                    <div className='grid md:grid-cols-2 gap-2'>
                        {blogs.map((blog) => (
                            <div
                                key={blog._id} // Ensure each blog has a unique 'id'
                                className="p-4 mb-4 border rounded-md shadow-md"
                            >
                                <h2 className="text-xl font-semibold">{blog.title}</h2>
                                <Link to={`/blogs/${blog._id}`} className="text-blue-500">
                                    Read more
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            )}

        </>
    )
}

export default Blogs
