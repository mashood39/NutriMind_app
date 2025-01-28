import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import api from '../lib/api';

const ExploreSection = ({ navigation }) => {
    const [diagrams, setDiagrams] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDiagrams = async () => {
        try {
            const response = await api.get('/fetch-diagrams');
            setDiagrams(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDiagrams();
    }, []);

    return (
        <View className="p-3">
            <Text className="text-lg font-bold mb-4">Explore mind maps on nutrition</Text>

            {loading && (
                <ActivityIndicator size="large" color="#4a90e2" className="my-4" />
            )}

            <View className="flex-row flex-wrap justify-between gap-y-2">
                {diagrams.map((diagram, index) => (
                    <TouchableOpacity
                        key={index}
                        className="bg-blue-100 px-3 py-3 rounded-full w-32"
                        onPress={() =>
                            navigation.navigate('MindMapScreen', {
                                id: diagram.short_id,
                                title: diagram.url_title,
                            })
                        }
                    >
                        <Text className="text-center text-sm font-bold text-blue-500">
                            {diagram.title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default ExploreSection;
