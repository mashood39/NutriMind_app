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
    const [editingId, setEditingId] = useState(null)

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

    const handleSaveOrUpdate = async () => {
        if (!formData.date || !formData.time || !formData.activity) {
            Alert.alert("Date, Time, and activity are required!");
            return;
        }

        setLoading(true)
        try {
            if (editingId) {
                await api.put(`/api/activity-tracks/${editingId}`, formData)
            } else {
                await api.post('/api/activity-tracks', formData)
            }

            setFormData({
                date: '',
                time: '',
                activity: '',
                duration: ''
            })
            setShowInput(false)
            setEditingId(null)
            fetchActivityTrackData();
        } catch (error) {
            console.error("error in saving/updating the data", error.message)
            Alert.alert("failed to save/update the data")
        }
    };

    const handleEdit = (item) => {
        setFormData({
            date: item.date,
            time: item.time,
            activity: item.activity,
            duration: item.duration,
        });
        setEditingId(item._id);
        setShowInput(true);
    };

    const deleteActivityTrack = async (id) => {
        setLoading(true)
        try {
            const response = await api.delete(`/api/activity-tracks/${id}`)
            setActivityData((prevData) => prevData.filter((item) => item._id !== id));
            setFormData({ date: '', time: '', activity: '', duration: '' });
            setShowInput(false)
            setEditingId(null)
        } catch (error) {
            console.error("error in deleting the activity track", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout>
            <View className="flex-1 bg-white px-4 mt-2">

                {!showInput ? (
                    <View className="flex-row justify-end" >
                        <TouchableOpacity className=" rounded-md p-1 mb-2 bg-green-500" onPress={() => setShowInput(true)} >
                            <Icon name="add" size={20} color="white" className="center" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        <View className="flex-row justify-end mb-2">
                            <TouchableOpacity className="rounded-md p-1 bg-red-500"
                                onPress={() => (
                                    setShowInput(false), setFormData({
                                        date: '', time: '', activity: '', duration: ''
                                    }), setEditingId(null))
                                }
                            >
                                <Icon name="close" size={20} color="white" />
                            </TouchableOpacity>
                        </View>

                        <View className="p-4 rounded-md border border-gray-300 mb-4">
                            <View className="flex-row justify-between space-x-2 mb-2">
                                <TouchableOpacity
                                    onPress={() => setShowDatePicker(true)}
                                    className="flex-row items-center border border-gray-300 rounded-md p-2 w-1/2 mr-2"
                                >
                                    <Icon name="event" size={20} color="gray" />
                                    <Text className={formData.date ? "text-black ml-2" : "text-gray-500 ml-2"}>
                                        {formData.date ? formData.date : "Date"}
                                    </Text>
                                </TouchableOpacity>

                                {showDatePicker && (
                                    <DateTimePicker
                                        value={new Date()}
                                        mode="date"
                                        onChange={handleDateChange}
                                    />
                                )}

                                <TouchableOpacity
                                    onPress={() => setShowTimePicker(true)}
                                    className="flex-row items-center border border-gray-300 rounded-md p-2 flex-1"
                                >
                                    <Icon name="access-time" size={20} color="gray" />
                                    <Text className={formData.time ? "text-black ml-2" : "text-gray-500 ml-2"}>
                                        {formData.time ? formData.time : "Time"}
                                    </Text>
                                </TouchableOpacity>

                                {showTimePicker && (
                                    <DateTimePicker
                                        value={new Date()}
                                        mode="time"
                                        onChange={handleTimeChange}
                                    />
                                )}
                            </View>

                            <View className="flex-row justify-between space-x-2 mb-2">
                                <TextInput
                                    className="w-1/2 border border-gray-300 rounded-md p-2 mr-2"
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


                            <View className="flex-row justify-between">
                                <TouchableOpacity className="bg-green-500 rounded-md p-3 flex-1" onPress={handleSaveOrUpdate}>
                                    <Text className="text-white text-center font-bold">{editingId ? "Update" : "Save"}</Text>
                                </TouchableOpacity>

                                {editingId && (
                                    <TouchableOpacity className="bg-red-500 rounded-md p-3 flex-1 ml-2" onPress={() => deleteActivityTrack(editingId)}>
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
                    <Text className="font-black text-center">Activity</Text>
                    <Text className="font-black text-center mr-4">Duration</Text>
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
                                className="flex-row justify-between bg-white p-2 border border-gray-200 rounded-md"
                            >
                                <Text className="flex-1">{item.date}</Text>
                                <Text className="flex-1 text-center">{item.time}</Text>
                                <Text className="flex-1 text-center">{item.activity}</Text>
                                <Text className="flex-1 text-center">{item.duration}</Text>
                                <View className="">
                                    <TouchableOpacity onPress={() => handleEdit(item)}>
                                        <Icon name="edit" size={20} color="red" />
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
