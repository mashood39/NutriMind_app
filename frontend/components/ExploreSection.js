import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import api from '../lib/api';

const ExploreSection = ({ navigation }) => {

    const [diagrams, setDiagrams] = useState([]);
    const [loading, setLoading] = useState(true)


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
        <View style={styles.container}>

            <Text style={styles.title}>Explore mind maps on nutrition</Text>

            {loading && (
                <ActivityIndicator
                    size="large"
                    color="#4a90e2"
                    style={styles.loader}
                />
            )}

            <View style={styles.tagContainer}>
                {diagrams.map((diagram, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.tag}
                        onPress={() => navigation.navigate('MindMapScreen', { id: diagram.short_id, title: diagram.url_title })}
                    >
                        <Text style={styles.tagText}>{diagram.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

export default ExploreSection;

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 10,
    },
    tag: {
        backgroundColor: '#d9eaff',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        width: '30%',
    },
    tagText: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4a90e2',
    },
});
