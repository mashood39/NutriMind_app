import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const CreateBlog = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        const formData = new FormData();

        formData.append('title', title)
        formData.append('image', image)
        formData.append('content', content)

        try {
            await axios.post('http://localhost:4000/api/blogs', formData)
            alert('Blog created succesfully')
            setTitle('')
            setContent('')
            setImage(null)
        }
        catch (error) {
            alert("error in saving the blog , Please try again")
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold my-4">Create Blog</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type='text'
                    placeholder='Add Blog title'
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }}
                    required
                />
                <input
                    type='file'
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                    className="block w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ReactQuill
                    theme='snow'
                    className="border rounded-md mb-4"
                    value={content}
                    onChange={setContent}
                    required
                />
                <button
                    type="submit"
                    className={`w-full p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Blog'}
                </button>
            </form>
        </div>
    )
}

export default CreateBlog
