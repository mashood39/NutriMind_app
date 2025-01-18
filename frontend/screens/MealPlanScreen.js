import { ScrollView, Text, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../lib/api';
import { Picker } from '@react-native-picker/picker';

const MealPlanScreen = ({ route }) => {
    const { id } = route.params; // Meal Plan ID passed via navigation
    const [mealPlan, setMealPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDay, setSelectedDay] = useState("");

    const fetchMealPlan = async () => {
        try {
            const response = await api.get(`/api/meal-plans/${id}`);
            setMealPlan(response.data);
            if (response.data.days.length > 0) {
                setSelectedDay(response.data.days[0].day);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching meal plan:', error.message);
            setLoading(false);
        }
    };

    // Fetch meal plan data
    useEffect(() => {
        fetchMealPlan();
    }, [id]);

    // If loading, show a spinner
    if (loading) {
        return (
            <Layout>
                <ActivityIndicator size="large" color="#00BFFF" className="mt-10" />
            </Layout>
        );
    }

    // If no meal plan found, show a message
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
            <ScrollView className="p-2" showsVerticalScrollIndicator={false}>
                {/* Title */}
                <Text className="text-2xl font-bold text-gray-800 mb-4">{mealPlan.title}</Text>

                {/* Day Picker Dropdown */}
                <View className="border border-gray-300 rounded-lg mb-6">
                    <Picker
                        selectedValue={selectedDay}
                        onValueChange={(value) => setSelectedDay(value)}
                        className="text-3xl border border-gray-300"
                    >
                        {mealPlan.days.map((dayPlan, index) => (
                            <Picker.Item key={index} label={dayPlan.day} value={dayPlan.day} />
                        ))}
                    </Picker>
                </View>

                {/* Weekly Meal Plan */}
                {selectedDayPlan && (
                    <View className="space-y-4">
                        {selectedDayPlan.meals.map((mealSlot, slotIndex) => (
                            <View key={slotIndex} className="border border-gray-300 rounded-lg mb-4">
                                <View className="bg-red-200 rounded-t-lg">
                                    <Text className="text-lg font-semibold text-gray-600 p-2">{mealSlot.time}</Text>
                                </View>
                                {mealSlot.meals.map((meal, mealIndex) => (
                                    <View key={mealIndex} className="flex-row justify-between mb-2 p-2">
                                        <Text className="text-gray-800">{meal.meal}</Text>
                                        <Text className="text-gray-600">{meal.quantity}</Text>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </Layout>
    );
};

export default MealPlanScreen;
