import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Alert, Platform } from 'react-native';
import Layout from '../components/Layout';
import api from '../lib/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FoodTrackScreen = () => {
    const [showInput, setShowInput] = useState(false);
    const [foodData, setFoodData] = useState([]);
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        food: '',
        calorie: '',
    });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const fetchFoodTrackData = async () => {
        try {
            const response = await api.get('/api/food-tracks')
            const data = response.data.foodTracks
            setFoodData(data)
        } catch (error) {
            console.error("error in fetching food track data", error)
        }
    }

    useEffect(() => {
        fetchFoodTrackData();
    }, [])

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const formattedDate = selectedDate.toLocaleDateString('en-GB'); // Format: DD-MM-YYYY
            setFormData({ ...formData, date: formattedDate });
        }
    };

    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) {
            const formattedTime = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format: HH:MM
            setFormData({ ...formData, time: formattedTime });
        }
    };

    const handleSave = async () => {

        try {

            const { date,time, food } = formData;

            if (!date || !food || !time) {
                Alert.alert("Date, time and food are required!");
                return;
            }

            const response = await api.post('/api/food-tracks', formData)

            setFormData({
                date: '',
                time: '',
                food: '',
                calorie: ''
            })
            setShowInput(false)
            fetchFoodTrackData();
        } catch (error) {
            console.error("error in saving the data", error.message)
            Alert.alert("failed to save the data")
        }
    };

    const deleteFoodTrack = async (id) => {
        try {
            const response = await api.delete(`/api/food-tracks/${id}`)
            console.log(response)
            if (response.status === 200) {
                setFoodData((prevData) => prevData.filter((item) => item._id !== id))
            }
        } catch (error) {
            console.error("error in deleting the food track", error)
        }
    }

    return (
        <Layout>
            <View className="flex-1 bg-gray-100">

                {!showInput && (
                    <View className="flex-row justify-end" >
                        <TouchableOpacity
                            className=" rounded-md p-2 w-10  bg-green-400 mb-4"
                            onPress={() => setShowInput(true)}
                        >
                            <Text className="text-white text-center font-bold">+</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {showInput && (
                    <View className="mt-4 space-y-2 p-4 bg-gray-100 rounded-md border border-gray-300">
                        <View className="flex-row justify-between space-x-2 mb-2">
                            <TouchableOpacity
                                onPress={() => setShowDatePicker(true)}
                                className="flex-1 border border-gray-300 rounded-md p-2 mb-2 mr-2"
                            >
                                <Text>{formData.date || "(DD-MM-YYYY)"}</Text>
                            </TouchableOpacity>

                            {showDatePicker && (
                                <DateTimePicker
                                    value={new Date()}
                                    mode="date"
                                    // display={Platform.OS === 'ios' ? 'inline' : 'default'}
                                    onChange={handleDateChange}
                                />
                            )}

                            <TouchableOpacity
                                onPress={() => setShowTimePicker(true)}
                                className="flex-1 border border-gray-300 rounded-md p-2 mb-2"
                            >
                                <Text>{formData.time || "Time (HH:MM)"}</Text>
                            </TouchableOpacity>

                            {showTimePicker && (
                                <DateTimePicker
                                    value={new Date()}
                                    mode="time"
                                    // display={Platform.OS === 'ios' ? 'inline' : 'default'}
                                    onChange={handleTimeChange}
                                />
                            )}
                        </View>

                        <View className="flex-row justify-between space-x-2 mb-2">
                            <TextInput
                                className="flex-1 border border-gray-300 rounded-md p-2 mr-2"
                                placeholder="Food"
                                value={formData.food}
                                onChangeText={(text) => setFormData({ ...formData, food: text })}
                            />
                            <TextInput
                                className="flex-1 border border-gray-300 rounded-md p-2"
                                placeholder="Qty"
                                // keyboardType="numeric"
                                value={formData.calorie}
                                onChangeText={(text) => setFormData({ ...formData, calorie: text })}
                            />
                        </View>
                        <TouchableOpacity
                            className="bg-green-500 rounded-md p-4"
                            onPress={handleSave}
                        >
                            <Text className="text-white text-center font-bold">Save</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Food Data List */}
                <View className="flex-row justify-between bg-gray-200 p-2 border border-gray-300 rounded-md">
                    <Text className="font-bold text-center">Date</Text>
                    <Text className="font-bold text-center">Time</Text>
                    <Text className="font-bold text-center">Food</Text>
                    <Text className="font-bold text-center mr-14">Qty</Text>
                </View>
                {foodData.length === 0 ? (
                    <View className="mt-2">
                        <Text className="p-2 border border-gray-300 text-center rounded-md">Food track is empty. Please add a item</Text>
                    </View>
                ) : (
                    // <FlatList
                    //     className="mt-4"
                    //     data={foodData}
                    //     // keyExtractor={(item, index) => index.toString()}
                    //     keyExtractor={(item) => item._id.toString()}
                    //     showsVerticalScrollIndicator={false}
                    //     renderItem={({ item }) => (
                    //         <View className="flex-row justify-between bg-white p-2 border border-gray-200 rounded-md">
                    //             <Text>{item.date}</Text>
                    //             <Text>{item.time}</Text>
                    //             <Text>{item.food}</Text>
                    //             <Text>{item.calorie}</Text>
                    //             <TouchableOpacity onPress={() => deleteFoodTrack(item._id)}>
                    //                 <Icon name="delete" size={24} color="red" />
                    //             </TouchableOpacity>
                    //         </View>
                    //     )}
                    //     ListHeaderComponent={
                    //         foodData.length > 0 && (
                    //             <View className="flex-row justify-around bg-gray-200 p-2 border border-gray-300 rounded-md">
                    //                 <Text className="font-bold">Date</Text>
                    //                 <Text className="font-bold">Time</Text>
                    //                 <Text className="font-bold">Food</Text>
                    //                 <Text className="font-bold">Qty</Text>
                    //             </View>
                    //         )
                    //     }
                    // />

                    foodData.map((item) => (
                        <View
                            key={item._id}
                            className="flex-row bg-white p-2 border border-gray-200 rounded-md"
                        >
                            <Text className="mr-6">{item.date}</Text>
                            <Text className="text-center mr-4">{item.time}</Text>
                            <Text className="flex-1 text-center">{item.food}</Text>
                            <Text className="flex-1 text-center">{item.calorie}</Text>
                            <View className="">
                                <TouchableOpacity onPress={() => deleteFoodTrack(item._id)}>
                                    <Icon name="delete" size={25} color="red" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))

                )}

            </View>
        </Layout>
    );
};

export default FoodTrackScreen;
