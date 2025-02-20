import { Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import Layout from '../components/Layout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../lib/api';


const MindMapScreen = ({ route }) => {

    const { id, title } = route.params;
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false)

    const toggleFavorite = async () => {
        const newFavoriteState = !isFavorite
        setIsFavorite(newFavoriteState)

        try {
            if (newFavoriteState) {
                await api.post('/api/favorites', { itemId: id })
                console.log("added to favorites")
            } else {
                await api.delete(`/api/favorites/${id}`)
                console.log("removed from the favorites")
            }
        } catch (error) {
            console.error('Error updating favorite status:', error.message);
        }
    };

    const fetchFavorite = async () => {
        try {
            const response = await api.get(`/api/favorites/${id}`);

            if (response.data.isFavorite === true) {
                setIsFavorite(true)
            }
            else {
                setIsFavorite(false)
            }
        } catch (error) {
            console.error("Error fetching favorites:", error.message);
            setIsFavorite(false);
        }
    };

    useEffect(() => {
        fetchFavorite();
    }, [id])

    return (
        <Layout>
            <View className="flex-1 justify-center p-4">
                <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-2xl font-bold text-gray-800 flex-1">{title}</Text>
                    <Icon
                        name={isFavorite ? "favorite" : "favorite-border"}
                        size={24}
                        color={isFavorite ? "red" : "black"}
                        onPress={toggleFavorite}
                    />
                </View>

                {loading && (
                    <ActivityIndicator
                        size="large"
                        color="#4a90e2"
                        className="absolute top-1/2 left-1/2 -ml-6 -mt-6 z-10"
                    />
                )}

                <WebView
                    source={{ uri: `https://coggle.it/diagram/${id}/t/${title}` }}
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                    onError={() => setLoading(false)}
                />
            </View>
        </Layout>
    );
};

export default MindMapScreen;