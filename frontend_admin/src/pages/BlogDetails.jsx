import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../lib/api';
import { ClipLoader } from 'react-spinners';
import { MdDelete, MdEdit } from "react-icons/md"

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
        setLoading(true)
        if (confirmDelete) {
            try {
                await api.delete(`/api/blogs/${id}`)
                setLoading(false)
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
        <div className='p-4 mb-10'>
            {loading ? (
                <div className="flex items-center justify-center h-screen" >
                    <ClipLoader color='grey' size={50} />
                </div >
            ) : (
                <>
                    <div className="mb-4 flex justify-end space-x-4">
                        <MdEdit size={35} color='blue' onClick={() => navigate('/create-blog', { state: blog })} className='bg-gray-300 p-1 rounded-md' />
                        <MdDelete size={35} color='red' onClick={deleteBlog} className='bg-gray-300 p-1 rounded-md' />
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
