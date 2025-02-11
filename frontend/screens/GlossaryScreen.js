import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import Layout from '../components/Layout'
import { useState } from 'react'
import api from '../lib/api'
import { useEffect } from 'react'

const GlossaryScreen = () => {

    const [glossary, setGlossary] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchGlossary = async () => {
        try {
            const response = await api.get('/api/glossaries')
            setGlossary(response.data)
        } catch (error) {
            console.error("error in fetching the glossary", error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchGlossary();
    }, [])

    return (
        <Layout>
            {loading ? (
                <View className="flex-1 justify-center">
                    <ActivityIndicator size="large" color="#4a90e2" />
                </View>
            ) : (
                <ScrollView showsVerticalScrollIndicator={false} className='px-4'>
                    <Text className="text-2xl font-bold text-center mb-4">Glossary</Text>
                    {glossary.map((item) => (
                        <View key={item._id} className='border border-gray-300 p-2 rounded-md mb-2'>
                            <Text className="text-lg font-semibold mb-1">{item.word} :</Text>
                            <Text className='text-[16px]'>{'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}{item.definition}</Text>
                        </View>
                    ))}
                </ScrollView>
            )}
        </Layout>
    )
}

export default GlossaryScreen