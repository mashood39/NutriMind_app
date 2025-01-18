import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Alert, Platform } from 'react-native';
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

    const fetchActivityTrackData = async () => {
        try {
            const response = await api.get('/api/activity-tracks')
            const data = response.data.activityTracks
            setActivityData(data)
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
        try {
            const { date, activity } = formData;

            if (!date || !activity) {
                Alert.alert("Date and activity are required!");
                return;
            }

            const response = await api.post('/api/activity-tracks', formData)

            setFormData({
                date: '',
                time: '',
                activity: '',
                duration: ''
            })
            setShowInput(false)
            fetchActivityTrackData();
        } catch (error) {
            console.error("error in saving the data", error.message)
            Alert.alert("failed to save the data")
        }
    };

    const deleteActivityTrack = async (id) => {
        try {
            const response = await api.delete(`/api/activity-tracks/${id}`)
            console.log(response)
            if (response.status === 200) {
                setActivityData((prevData) => prevData.filter((item) => item._id !== id))
            }
        } catch (error) {
            console.error("error in deleting the activity track", error)
        }
    }

    return (
        <Layout>
            <View className="flex-1 bg-gray-100">

                {!showInput && (
                    <View className="flex-row justify-end" >
                        <TouchableOpacity
                            className=" rounded-md p-2 w-10  bg-gray-300"
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


                {activityData.length === 0 ? (
                    <View className="mt-2">
                        <Text>You have no items in your activity track. Please add a item</Text>
                    </View>
                ) : (
                    <FlatList
                        className="mt-4"
                        data={activityData}
                        // keyExtractor={(item, index) => index.toString()}
                        keyExtractor={(item) => item._id.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View className="flex-row justify-between bg-white p-2 border border-gray-300 rounded-md mb-2">
                                <Text>{item.date}</Text>
                                <Text>{item.time}</Text>
                                <Text>{item.activity}</Text>
                                <Text>{item.duration}</Text>
                                <TouchableOpacity onPress={() => deleteActivityTrack(item._id)}>
                                    <Icon name="delete" size={24} color="red" />
                                </TouchableOpacity>
                            </View>
                        )}
                        ListHeaderComponent={
                            activityData.length > 0 && (
                                <View className="flex-row justify-between bg-gray-200 p-2 border border-gray-300 rounded-md">
                                    <Text className="font-bold">Date</Text>
                                    <Text className="font-bold">Time</Text>
                                    <Text className="font-bold">Activity</Text>
                                    <Text className="font-bold">Duration</Text>
                                </View>
                            )
                        }
                    />
                )}

            </View>
        </Layout>
    );
};

export default ActivityTrackScreen;
