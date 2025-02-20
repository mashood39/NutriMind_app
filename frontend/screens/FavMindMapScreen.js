import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import Layout from '../components/Layout';
import api from '../lib/api';

const FavMindMapScreen = ({ navigation }) => {

    const [diagrams, setDiagrams] = useState([])
    const [favoriteIds, setFavoriteIds] = useState(new Set())
    const [loading, setLoading] = useState(true)

    const fetchData = useCallback(async () => {
        try {
            const [diagramsResponse, favoritesResponse] = await Promise.all([
                api.get('/fetch-diagrams'),
                api.get('/api/favorites')
            ])

            setDiagrams(diagramsResponse.data)
            setFavoriteIds(new Set(favoritesResponse.data.itemIds.map((fav) => fav.itemId)))
        } catch (error) {
            console.error("error in fetching data:", error.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchData();
    }, [fetchData])

    const favoriteDiagrams = diagrams.filter((diagram) => favoriteIds.has(diagram.short_id));


    return (
        <Layout>
            <View className="px-4 mt-2">
                <Text className="text-lg font-bold mb-4 text-gray-900">My Favorite Mind Maps</Text>
                {loading ? (
                    <ActivityIndicator size="large" color="#4a90e2" />
                ) : favoriteDiagrams.length === 0 ? (
                    <Text className='text-center text-gray-600'>No favorite Mind Maps</Text>
                ) : (
                    <View className='flex flex-wrap flex-row gap-x-2 items-center'>
                        {favoriteDiagrams.map((diagram) => (
                            <TouchableOpacity
                                key={diagram._id}
                                className="bg-blue-100 px-3 py-3 rounded-full w-[32%] mb-2"
                                onPress={() =>
                                    navigation.navigate('MindMapScreen', {
                                        id: diagram.short_id,
                                        title: diagram.title,
                                    })
                                }
                            >
                                <Text className="text-center text-sm font-bold text-blue-500">
                                    {diagram.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
        </Layout>
    )
}

export default FavMindMapScreen;