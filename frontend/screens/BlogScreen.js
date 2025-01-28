import React, { useEffect, useState } from 'react';
import { Text, ScrollView, Image, ActivityIndicator, View } from 'react-native';
import Layout from '../components/Layout';
import RenderHTML from 'react-native-render-html';
import api from '../lib/api';

const BlogScreen = ({ route }) => {
  const { id } = route.params;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error in fetching the blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <ActivityIndicator size="large" color="#4a90e2" className="mb-2" />
      </Layout>
    );
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
      <ScrollView className="flex-1 px-4">
        <View className="pb-10">
          <Text className="text-2xl font-bold mb-4 text-gray-900">{blog.title}</Text>
          <Image
            source={{ uri: blog.image }}
            className="w-full h-48 mb-4"
            resizeMode="cover"
          />
          <RenderHTML
            contentWidth={400}
            source={{ html: blog.content }}
            tagsStyles={tagsStyles}
          />
        </View>
      </ScrollView>
    </Layout>
  );
};

export default BlogScreen;
