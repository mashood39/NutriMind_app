import React, { useEffect, useState } from 'react';
import { Text, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import Layout from '../components/Layout';
import RenderHTML from 'react-native-render-html'
import api, { baseURL } from '../lib/api';

const BlogScreen = ({ route }) => {
    const { id } = route.params;
    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await api.get(`api/blogs/${id}`);
                setBlog(response.data)
            } catch (error) {
                console.error('errror in fetching the blog', error)
            } finally {
                setLoading(false)
            }
        }

        fetchBlog();
    }, [id])

    if (loading) {
        return (
            <Layout>
                <ActivityIndicator size='large' color="#000" />
                <Text>Loading...</Text>
            </Layout>
        )
    }

    const tagsStyles = {
        h1: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: '0' },
        h2: { fontSize: 20, fontWeight: 'bold', color: '#444', marginBottom: '0' },
        p: { fontSize: 16, color: '#666', lineHeight: 24, marginBottom: '0' },
        a: { color: '#1e90ff', textDecorationLine: 'underline' },
        img: { width: 300, height: 200, borderRadius: 10, marginBottom: 10 },
    };

    return (
        <Layout>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>{blog.title}</Text>
                <Image
                    source={{ uri: `${baseURL}${blog.image}` }}
                    style={{ width: '100%', height: 200 }}
                    resizeMode="cover"
                />
                <RenderHTML
                    contentWidth={400}
                    source={{ html: blog.content }}
                    tagsStyles={tagsStyles}
                />
            </ScrollView>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    blogImage: {
        width: '100%',
        height: '200',
        marginVertical: 10,
    }
});

export default BlogScreen;
