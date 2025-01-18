import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Layout from '../components/Layout';
import HomeCard from '../components/HomeCard';
import api from "../lib/api";

const HomeScreen = ({ navigation }) => {

  const [blogs, setBlogs] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [mealPlans, setMealPlans] = useState([])

  const fetchBlogs = async () => {
    try {
      const response = await api.get('/api/blogs');
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("error in fetching blogs", error);
    }
  };

  const fetchQuizzes = async () => {
    try {
      const response = await api.get('/api/quizzes');
      setQuizzes(response.data);
    } catch (error) {
      console.error("error in fetching quizzes", error);
    }
  };

  const fetchMealPlans = async () => {
    try {
      const response = await api.get('/api/meal-plans')
      setMealPlans(response.data.mealPlans)
    } catch (error) {
      console.error("error in fetching meal plans", error)
    }
  }

  // fetch data from backend
  useEffect(() => {
    fetchBlogs();
    fetchQuizzes();
    fetchMealPlans();
  }, []);



  const renderItem = ({ item, type }) => (
    <HomeCard
      title={item.title}
      image={item.image}
      onPress={() => {
        if (type === 'blog') {
          navigation.navigate('BlogScreen', { id: item._id });
        } else if (type === 'quiz') {
          navigation.navigate('QuizScreen', { quizId: item._id });
        } else {
          navigation.navigate('MealPlanScreen', { id: item._id })
        }
      }}
    />
  );

  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Banner section */}
        <View className="mb-4 relative">
          <Image source={require('../assets/images/image_1.png')} className="w-full h-40 rounded-lg" />
          <View className="absolute top-8 left-14">
            <Text className="text-2xl font-bold text-white">The world of nutrition</Text>
            <TouchableOpacity onPress={() => navigation.navigate('DiscoverScreen')}>
              <Text className="mt-2 text-white text-lg bg-blue-400 px-6 py-2 rounded-full">
                Discover with mind maps!
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Blog Section */}
        <View className="mb-0">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Read blogs for the latest insights.</Text>
          <FlatList
            data={blogs}
            renderItem={({ item }) => renderItem({ item, type: 'blog' })}
            keyExtractor={(item) => item._id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 0 }}
          />
        </View>

        {/* Quizzes and puzzles */}
        <View className="mb-0">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Quizzes and puzzles.</Text>
          <FlatList
            data={quizzes}
            renderItem={({ item }) => renderItem({ item, type: 'quiz' })}
            keyExtractor={(item) => item._id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 0 }}
          />
        </View>

        {/* meals plan */}
        <View className="mb-0">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Plan your own nutritious diet.</Text>
          <FlatList
            data={mealPlans}
            renderItem={({ item }) => renderItem({ item, type: 'meal_plan' })}
            keyExtractor={(item) => item._id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 0 }}
          />
        </View>


      </ScrollView>
    </Layout>
  );
};

export default HomeScreen;
