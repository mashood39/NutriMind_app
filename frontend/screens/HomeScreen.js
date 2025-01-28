import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Layout from '../components/Layout';
import HomeCard from '../components/HomeCard';
import api from "../lib/api";

const ListSection = ({ title, data, type, navigation }) => (

  <View className="mb-0">
    <Text className="text-lg font-semibold text-gray-800 mb-3">{title}</Text>
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <HomeCard
          title={item.title}
          image={item.image}
          onPress={() =>
            navigation.navigate(
              type === 'blog' ? 'BlogScreen' :
                type === 'quiz' ? 'QuizScreen' : 'MealPlanScreen',
              { id: item._id, quizId: item._id }
            )
          }
        />
      )}
      keyExtractor={(item) => item._id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingLeft: 0 }}
    />
  </View>

);

const HomeScreen = ({ navigation }) => {

  const [blogs, setBlogs] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      await Promise.all([
        api.get('/api/blogs').then((res) => setBlogs(res.data.blogs)),
        api.get('/api/quizzes').then((res) => setQuizzes(res.data)),
        api.get('/api/meal-plans').then((res) => setMealPlans(res.data.mealPlans)),
      ]);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#4a90e2" />
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false} className="px-4">

        <View className="mb-4 relative">
          <Image source={require('../assets/images/image_1.png')} className="w-full h-40 rounded-lg" />
          <View className="absolute top-8 left-16">
            <Text className="text-2xl font-bold text-white">The world of nutrition</Text>
            <TouchableOpacity onPress={() => navigation.navigate('DiscoverScreen')}>
              <Text className="mt-2 text-white text-lg bg-blue-400 px-6 py-2 rounded-full">
                Discover with mind maps!
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ListSection title="Read blogs for the latest insights." data={blogs} type="blog" navigation={navigation} />
        <ListSection title="Quizzes and puzzles." data={quizzes} type="quiz" navigation={navigation} />
        <ListSection title="Plan your own nutritious diet." data={mealPlans} type="meal_plan" navigation={navigation} />

      </ScrollView>
    </Layout>
  );
};

export default HomeScreen;
