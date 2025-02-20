import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import HomeCard from '../components/HomeCard';
import api from '../lib/api';

const FavMealPlanScreen = ({ navigation }) => {

  const [mealPlans, setMealPlans] = useState([])
  const [favoriteIds, setFavoriteIds] = useState(new Set())
  const [loading, setLoading] = useState(true)

  const fetchMealPlans = async () => {
    try {
      const response = await api.get('/api/meal-plans')
      setMealPlans(response.data.mealPlans)
    } catch (error) {
      console.error("error in fetching the meal plan")
    } finally {
      setLoading(false)
    }
  }

  const fetchFavorites = async () => {
    try {
      const response = await api.get('/api/favorites')
      const ids = new Set(response.data.itemIds.map((fav) => fav.itemId))
      setFavoriteIds(ids)
    } catch (error) {
      console.error("error in fetching the favorite meal plans")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMealPlans();
    fetchFavorites();
  }, [])

  const favoriteMealPlans = mealPlans.filter((mealPlan) => favoriteIds.has(mealPlan._id))

  return (
    <Layout>
      <View className='px-4 mt-2'>
        <Text className="text-lg font-bold mb-4 text-gray-900">My Favorite Meal Plans</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#4a90e2" />
        ) : favoriteMealPlans.length === 0 ? (
          <View>
            <Text className="text-center">No favorite Meal Plans.</Text>
          </View>
        ) : (
          <FlatList
            data={favoriteMealPlans}
            renderItem={({ item }) => (
              <HomeCard
                title={item.title}
                image={item.image}
                onPress={() => navigation.navigate('MealPlanScreen', { id: item._id })}
              />
            )}
            keyExtractor={(item) => item._id}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10 }}
            contentContainerStyle={{ paddingVertical: 10 }}
          />
        )}

      </View>
    </Layout>
  )
}

export default FavMealPlanScreen