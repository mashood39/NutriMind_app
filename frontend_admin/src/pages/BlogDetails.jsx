import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../lib/api';
import { ClipLoader } from 'react-spinners';

const BlogDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true);

    const fetchBlogDetails = async () => {
        try {
            const response = await api.get(`/api/blogs/${id}`)
            setBlog(response.data)
            setLoading(false)
        } catch (error) {
            console.error("error in fetching the blog:", error.message)
            setLoading(false)
        }
    }

    const deleteBlog = async () => {
        const confirmDelete = window.confirm("Are you sure want to delete this blog?")
        if (confirmDelete) {
            try {
                await api.delete(`/api/blogs/${id}`)
                alert('Blog deleted succesfully')
                navigate('/blogs')
            } catch (error) {
                console.error("error in deleting the blog", error.message)
                alert('failed to delete the blog .Please try again')
            }
        }
    }

    useEffect(() => {
        fetchBlogDetails();
    }, [id])

    return (
        <div className='p-4'>
            {loading ? (
                <div className="flex items-center justify-center h-screen" >
                    <ClipLoader color='grey' size={50} />
                </div >
            ) : (
                <>
                    <div className="mb-4 flex justify-end">
                        <button
                            onClick={deleteBlog}
                            className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600"
                        >
                            Delete Blog
                        </button>
                    </div>

                    <h1 className='text-3xl font-bold mb-4'>{blog.title}</h1>
                    <img src={blog.image} alt={blog.title} className='w-1/4 rounded-md mb-4 shadow-md' />
                    <div className="prose" dangerouslySetInnerHTML={{ __html: blog.content }} />

                </>
            )}
        </div>

    )
}

export default BlogDetails
