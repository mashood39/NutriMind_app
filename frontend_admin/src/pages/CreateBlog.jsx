import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import api from '../lib/api';
import { useNavigate, useLocation } from 'react-router-dom';

const CreateBlog = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const existingBlog = location.state;

    const [title, setTitle] = useState(existingBlog?.title || '')
    const [content, setContent] = useState(existingBlog?.content || '')
    const [image, setImage] = useState(existingBlog?.image || null)
    const [previewImage, setPreviewImage] = useState(existingBlog?.image || '')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleImageChange = (e) => {
        setError('')
        const file = e.target.files[0]

        setImage(file)
        setPreviewImage(URL.createObjectURL(file))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!title.trim() || !content.trim() || !image) {
            setError('Please add all fields')
            setLoading(false)
            return;
        }
        const formData = new FormData();

        formData.append('title', title)
        if (image) {
            formData.append('image', image)
        }
        formData.append('content', content)

        try {
            if (existingBlog) {
                await api.put(`/api/blogs/${existingBlog._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
                alert('Blog updated succesfully')
            } else {
                await api.post('/api/blogs', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                alert('Blog created succesfully')
            }
            navigate('/blogs')
        }
        catch (error) {
            alert("error in saving the blog , Please try again")
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="px-8 bg-gray-100 min-h-screen mb-10">
            <h1 className="text-3xl font-bold my-4">
                {existingBlog ? 'Edit Blog' : 'Create Blog'}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type='text'
                    placeholder='Add Blog title'
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        setError('')
                    }}
                />
                <input
                    type='file'
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {previewImage && (
                    <img src={previewImage} alt='preview' className="w-1/4 rounded-md mb-4 shadow-md" />
                )}
                <ReactQuill
                    theme='snow'
                    className="border rounded-md mb-4"
                    value={content}
                    onChange={(value) => {
                        setContent(value)
                        setError('')
                    }}
                />
                {error && (
                    <p className='text-red-500'>{error}</p>
                )}

                <div className={`flex ${existingBlog ? 'flex-row gap-2' : ''}`}>
                    <button
                        type="submit"
                        className={`p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${existingBlog ? 'flex-1' : 'w-full'}`}
                        disabled={loading}
                    >
                        {loading ? (existingBlog ? 'Updating...' : 'Adding...') : (existingBlog ? 'Update Blog' : 'Add Blog')}
                    </button>

                    {existingBlog && (
                        <button
                            type='button'
                            className={`flex-1 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''} `}
                            onClick={() => navigate('/blogs')}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default CreateBlog
