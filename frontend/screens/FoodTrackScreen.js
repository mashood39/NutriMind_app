import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
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
        quantity: '',
    });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);

    const fetchFoodTrackData = async () => {
        try {
            const response = await api.get('/api/food-tracks');
            setFoodData(response.data.foodTracks);
        } catch (error) {
            console.error("Error fetching food track data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFoodTrackData();
    }, []);

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setFormData({ ...formData, date: selectedDate.toLocaleDateString('en-GB') });
        }
    };

    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) {
            const formattedTime = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
                .replace(/am|pm/, (match) => match.toUpperCase());

            setFormData({ ...formData, time: formattedTime })
        }
    };

    const handleSaveOrUpdate = async () => {
        if (!formData.date || !formData.time || !formData.food) {
            Alert.alert("Date, Time, and Food are required!");
            return;
        }

        setLoading(true);
        try {
            if (editingId) {
                await api.put(`/api/food-tracks/${editingId}`, formData);
            } else {
                await api.post('/api/food-tracks', formData);
            }

            setFormData({ date: '', time: '', food: '', quantity: '' });
            setShowInput(false);
            setEditingId(null);
            fetchFoodTrackData();
        } catch (error) {
            console.error("Error saving/updating data", error);
            Alert.alert("Failed to save/update data");
        } finally {
            setLoading(false);
        } q
    };

    const handleEdit = (item) => {
        setFormData({
            date: item.date,
            time: item.time,
            food: item.food,
            quantity: item.quantity,
        });
        setEditingId(item._id);
        setShowInput(true);
    };

    const deleteFoodTrack = async (id) => {
        setLoading(true);
        try {
            await api.delete(`/api/food-tracks/${id}`);
            setFoodData((prevData) => prevData.filter((item) => item._id !== id));
            setFormData({ date: '', time: '', food: '', quantity: '' });
            setShowInput(false);
            setEditingId(null);
        } catch (error) {
            console.error("Error deleting food track", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <View className="flex-1 bg-white px-4 mt-2">

                {!showInput ? (
                    <View className="flex-row justify-end mb-2">
                        <TouchableOpacity className="rounded-md p-1 bg-green-500" onPress={() => setShowInput(true)}>
                            <Icon name="add" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        <View className="flex-row justify-end mb-2">
                            <TouchableOpacity className="rounded-md p-1 bg-red-500"
                                onPress={() => (
                                    setShowInput(false), setFormData({
                                        date: '', time: '', food: '', quantity: ''
                                    }), setEditingId(null))
                                }
                            >
                                <Icon name="close" size={20} color="white" />
                            </TouchableOpacity>
                        </View>

                        <View className="p-4 rounded-md border border-gray-300 mb-4">
                            <View className="flex-row justify-between mb-2">
                                <TouchableOpacity
                                    onPress={() => setShowDatePicker(true)}
                                    className="flex-row items-center border border-gray-300 bg-white rounded-md p-2 w-1/2 mr-2"
                                >
                                    <Icon name="event" size={20} color="gray" />
                                    <Text className={formData.date ? "text-black ml-2" : "text-gray-500 ml-2"}>
                                        {formData.date ? formData.date : "Date"}
                                    </Text>
                                </TouchableOpacity>
                                {showDatePicker && <DateTimePicker value={new Date()} mode="date" onChange={handleDateChange} />}

                                <TouchableOpacity
                                    onPress={() => setShowTimePicker(true)}
                                    className="flex-row items-center border border-gray-300 bg-white rounded-md p-2 flex-1"
                                >
                                    <Icon name="access-time" size={20} color="gray" />
                                    <Text className={formData.time ? "text-black ml-2" : "text-gray-500 ml-2"}>
                                        {formData.time ? formData.time : "Time"}
                                    </Text>
                                </TouchableOpacity>
                                {showTimePicker && <DateTimePicker value={new Date()} mode="time" onChange={handleTimeChange} />}
                            </View>

                            <View className="flex-row justify-between space-x-2 mb-2">
                                <TextInput className="w-1/2 border border-gray-300 bg-white rounded-md p-2 mr-2" placeholder="Food" value={formData.food} onChangeText={(text) => setFormData({ ...formData, food: text })} />
                                <TextInput className="flex-1 border border-gray-300 bg-white rounded-md p-2" placeholder="Qty" value={formData.quantity} onChangeText={(text) => setFormData({ ...formData, quantity: text })} />
                            </View>

                            <View className="flex-row justify-between">
                                <TouchableOpacity className="bg-green-500 rounded-md p-3 flex-1" onPress={handleSaveOrUpdate}>
                                    <Text className="text-white text-center font-bold">{editingId ? "Update" : "Save"}</Text>
                                </TouchableOpacity>

                                {editingId && (
                                    <TouchableOpacity className="bg-red-500 rounded-md p-3 flex-1 ml-2" onPress={() => deleteFoodTrack(editingId)}>
                                        <Text className="text-white text-center font-bold">Delete</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </>
                )}

                <View className="flex-row justify-between p-2 border border-gray-300 rounded-md mb-1">
                    <Text className="font-black text-center">Date</Text>
                    <Text className="font-black text-center">Time</Text>
                    <Text className="font-black text-center">Food</Text>
                    <Text className="font-black text-center mr-14">Qty</Text>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#4a90e2" className="mt-2" />
                ) : (
                    foodData.length === 0 ? (
                        <Text className="p-2 border border-gray-300 text-center rounded-md mt-2">Food track is empty. Please add an item</Text>
                    ) : (
                        foodData.map((item) => (
                            <View key={item._id} className="flex-row justify-between bg-white p-2 border border-gray-200 rounded-md">
                                <Text className="flex-1">{item.date}</Text>
                                <Text className="flex-1 text-center">{item.time}</Text>
                                <Text className="flex-1 text-center">{item.food}</Text>
                                <Text className="flex-1 text-center">{item.quantity}</Text>
                                <View className="">
                                    <TouchableOpacity onPress={() => handleEdit(item)} className="">
                                        <Icon name="edit" size={20} color="red" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    )
                )}
            </View>
        </Layout>
    );
};

export default FoodTrackScreen;