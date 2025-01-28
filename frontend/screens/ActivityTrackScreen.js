import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Alert, Platform, ActivityIndicator } from 'react-native';
import Layout from '../components/Layout';
import api from '../lib/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ActivityTrackScreen = () => {
    const [showInput, setShowInput] = useState(false);
    const [activityData, setActivityData] = useState([]);
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        activity: '',
        duration: '',
    });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [loading, setLoading] = useState(true)

    const fetchActivityTrackData = async () => {
        try {
            const response = await api.get('/api/activity-tracks')
            const data = response.data.activityTracks
            setActivityData(data)
            setLoading(false)
        } catch (error) {
            console.error("error in fetching activity track data", error)
        }
    }

    useEffect(() => {
        fetchActivityTrackData();
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
        setShowInput(false)
        setLoading(true)
        try {
            const { date, activity } = formData;

            if (!date || !activity) {
                Alert.alert("Date and activity are required!");
                return;
            }

            await api.post('/api/activity-tracks', formData)
            setFormData({
                date: '',
                time: '',
                activity: '',
                duration: ''
            })

            fetchActivityTrackData();
        } catch (error) {
            console.error("error in saving the data", error.message)
            Alert.alert("failed to save the data")
        }
    };

    const deleteActivityTrack = async (id) => {
        setLoading(true)
        try {
            const response = await api.delete(`/api/activity-tracks/${id}`)
            console.log(response)
            if (response.status === 200) {
                setActivityData((prevData) => prevData.filter((item) => item._id !== id))
            }
            setLoading(false)
        } catch (error) {
            console.error("error in deleting the activity track", error)
        }
    }

    return (
        <Layout>
            <View className="flex-1 bg-white px-4">

                {!showInput && (
                    <View className="flex-row justify-end" >
                        <TouchableOpacity
                            className=" rounded-md p-1 mb-4 bg-green-400"
                            onPress={() => setShowInput(true)}
                        >
                            <Icon name="add" size={20} color="white" className="center" />
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
                                placeholder="Activity"
                                value={formData.activity}
                                onChangeText={(text) => setFormData({ ...formData, activity: text })}
                            />
                            <TextInput
                                className="flex-1 border border-gray-300 rounded-md p-2"
                                placeholder="Duration"
                                // keyboardType="numeric"
                                value={formData.duration}
                                onChangeText={(text) => setFormData({ ...formData, duration: text })}
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

                <View className="flex-row justify-between bg-gray-200 p-2 border border-gray-300 rounded-md">
                    <Text className="font-bold text-center">Date</Text>
                    <Text className="font-bold text-center">Time</Text>
                    <Text className="font-bold text-center">Activity</Text>
                    <Text className="font-bold text-center pr-4">Duration</Text>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#4a90e2" className="mt-2" />
                ) : (
                    activityData.length === 0 ? (
                        <View className="mt-2">
                            <Text className="p-2 border border-gray-300 text-center rounded-md">
                                Activity track is empty. Please add a item
                            </Text>
                        </View>
                    ) : (
                        activityData.map((item) => (
                            <View
                                key={item._id}
                                className="flex-row bg-white p-2 border border-gray-200 rounded-md"
                            >
                                <Text className="mr-6">{item.date}</Text>
                                <Text className="text-center mr-4">{item.time}</Text>
                                <Text className="flex-1 text-center">{item.activity}</Text>
                                <Text className="flex-1 text-center">{item.duration}</Text>
                                <View className="">
                                    <TouchableOpacity onPress={() => deleteActivityTrack(item._id)}>
                                        <Icon name="delete" size={20} color="red" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    )
                )}
            </View>
        </Layout >
    );
};

export default ActivityTrackScreen;
