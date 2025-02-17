import { ScrollView, Text, View, ActivityIndicator, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../lib/api';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MealPlanScreen = ({ route }) => {

    const { id } = route.params;
    const [mealPlan, setMealPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDay, setSelectedDay] = useState("");
    const [isFavorite, setIsFavorite] = useState(false)

    const fetchMealPlan = async () => {
        try {
            const response = await api.get(`/api/meal-plans/${id}`);
            setMealPlan(response.data);
            if (response.data.days.length > 0) {
                setSelectedDay(response.data.days[0].day);
            }
        } catch (error) {
            console.error('Error fetching meal plan:', error.message);
        } finally {
            setLoading(false);
        }
    };

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
        fetchMealPlan();
        fetchFavorite();
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <ActivityIndicator size="large" color="#4a90e2" />
            </Layout>
        );
    }

    if (!mealPlan) {
        return (
            <Layout>
                <Text className="text-center text-red-500 text-lg mt-10">Meal plan not found</Text>
            </Layout>
        );
    }

    const selectedDayPlan = mealPlan.days.find(dayPlan => dayPlan.day === selectedDay)

    return (
        <Layout>
            <ScrollView className="p-3" showsVerticalScrollIndicator={false}>
                <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-2xl font-bold text-gray-800 flex-1">{mealPlan.title}</Text>
                    <Icon
                        name={isFavorite ? "favorite" : "favorite-border"}
                        size={24}
                        color={isFavorite ? "red" : "black"}
                        onPress={toggleFavorite}
                    />
                </View>

                <Image
                    source={{ uri: mealPlan.image }}
                    className="w-full h-52 mb-8 rounded-md"
                />

                <View className="border border-gray-300 rounded-lg mb-4">
                    <Picker
                        selectedValue={selectedDay}
                        onValueChange={(value) => setSelectedDay(value)}
                    >
                        {mealPlan.days.map((dayPlan, index) => (
                            <Picker.Item key={index} label={dayPlan.day} value={dayPlan.day} />
                        ))}
                    </Picker>
                </View>

                {selectedDayPlan && (
                    <View className="space-y-4">
                        {selectedDayPlan.meals.map((mealSlot, slotIndex) => (
                            <View key={slotIndex} className="border border-gray-300 rounded-lg mb-4">
                                <View className="bg-blue-400 rounded-t-lg">
                                    <Text className="text-lg font-semibold text-white p-2">{mealSlot.time}</Text>
                                </View>
                                <View className="p-2">
                                    {mealSlot.meals.map((meal, mealIndex) => (
                                        <View key={mealIndex} className="flex-row justify-between mb-2">
                                            <Text className="text-gray-800">{meal.meal}</Text>
                                            <Text className="text-gray-600">{meal.quantity}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </Layout>
    );
};

export default MealPlanScreen;
