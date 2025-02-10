import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import api from '../lib/api'
import { MdDelete, MdEdit } from 'react-icons/md'

const Glossaries = () => {

    const [loading, setLoading] = useState(true)
    const [glossaries, setGlossaries] = useState([])
    const [showInput, setShowInput] = useState(false)
    const [word, setWord] = useState("");
    const [definition, setDefinition] = useState("")
    const [error, setError] = useState("")
    const [updateId, setUpdateId] = useState(null)

    const fetchGlossaries = async () => {
        try {
            const response = await api.get('/api/glossaries')
            setGlossaries(response.data)
        } catch (error) {
            console.error("error in fetching the glossaries", error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchGlossaries();
    }, [])

    const deleteItem = async (id) => {
        setLoading(true)
        try {
            await api.delete(`/api/glossaries/${id}`)
            setGlossaries((prevData) => prevData.filter((item) => item._id !== id))
        } catch (error) {
            console.error("error in deleting the glossary", error.message)
        } finally {
            setLoading(false)
        }
    }

    const updateItem = async (glossary) => {
        setShowInput(true)
        setWord(glossary.word)
        setDefinition(glossary.definition)
        setUpdateId(glossary._id)
    }

    const handleSave = async () => {

        if (!word.trim() || !definition.trim()) {
            setError("Please add all fields")
            return
        }
        setLoading(true)
        try {
            if (updateId) {
                await api.put(`/api/glossaries/${updateId}`, { word, definition })
            } else {
                await api.post('/api/glossaries', { word, definition })
            }
            setWord('')
            setDefinition('')
            setUpdateId(null)
            setShowInput(false)
            fetchGlossaries();
        } catch (error) {
            alert("error in saving the glossary ,Please try again!")
            console.error("error in saving the glossary", error.message)
        } finally {
            setLoading(false)
        }

    }

    return (
        <>
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <ClipLoader color='grey' size={50} />
                </div>
            ) : (
                <div className='w-4/5 m-auto'>
                    <h1 className='text-3xl font-bold my-4'>Glossaries</h1>

                    <div className='mb-6'>
                        {showInput ? (
                            <div className='border border-gray-300 p-4 rounded-md'>
                                <h2 className='text-xl font-bold mb-4 text-center'>Add Glossary Item</h2>
                                <input
                                    type='text'
                                    value={word}
                                    placeholder='Enter the Word'
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                                    onChange={(e) => {
                                        setWord(e.target.value);
                                        setError('');
                                    }}
                                />
                                <textarea
                                    type='text'
                                    value={definition}
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6 min-h-[100px]"
                                    placeholder='Enter the Definition'
                                    onChange={(e) => {
                                        setDefinition(e.target.value);
                                        setError('')
                                    }}

                                />
                                {error && <p className='text-red-500 mb-2'>{error}</p>}
                                <div className='flex gap-2'>
                                    <button
                                        className='flex-1 bg-blue-500 text-white p-2 font-semibold rounded-md hover:bg-blue-600'
                                        onClick={handleSave}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className='flex-1 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600'
                                        onClick={() => {
                                            setShowInput(false);
                                            setWord('');
                                            setDefinition('');
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button className='rounded-xl p-2 bg-blue-500 text-white' onClick={() => setShowInput(true)} >
                                Create Glossary
                            </button>
                        )}
                    </div>
                    <div>
                        {glossaries.map((glossary) => (
                            <div key={glossary._id} className='border border-gray-300 rounded-md p-4 mb-4'>
                                <div className='flex justify-between items-center mb-2'>
                                    <p className='text-lg font-bold'>{glossary.word} :</p>
                                    <div className='flex gap-2'>
                                        <MdEdit size={30} color='blue' onClick={() => updateItem(glossary)} className='bg-gray-300 p-1 rounded-md' />
                                        <MdDelete size={30} color='red' onClick={() => deleteItem(glossary._id)} className='bg-gray-300 p-1 rounded-md' />
                                    </div>
                                </div>
                                <p>{glossary.definition}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default Glossaries
