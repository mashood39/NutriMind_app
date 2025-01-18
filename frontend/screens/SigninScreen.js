import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useAuthContext } from '../context/AuthContext';
import api from '../lib/api'

const SigninScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useAuthContext();

    useEffect(() => {
        // Check if the token exists
        const checkToken = async () => {
            const token = await SecureStore.getItemAsync('jwtToken');
            if (token) {
                setMessage('Redirecting to home page .......')
                navigation.navigate('HomeScreen')
            }
        };
        checkToken();
    }, []);

    const handleRegister = async () => {
        try {
            const response = await api.post('/api/user/register', { email, password });
            setMessage(response.data.message || "Registration successful!");
            setEmail('');
            setPassword('');
        } catch (error) {
            console.log(error)
            setMessage(error.response?.data?.message || "Something went wrong");
        }
    };

    const handleLogin = async () => {
        try {
            await login({ email, password });
        } catch (error) {
            console.error(error);
            setMessage("Login failed. Please check your credentials.");
        }
    };
    // const handleLogout = async () => {
    //     await SecureStore.deleteItemAsync('jwtToken');
    //     setMessage('Logged out successfully!');
    // };

    return (
        <View className="flex-1 justify-center items-center p-5 bg-gray-100">
            <View className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <Text className="text-2xl font-bold text-center text-indigo-600 mb-4">Welcome to NutriMind</Text>

                <View>
                    <TextInput
                        className="mb-4 p-3 border border-gray-300 rounded-md"
                        placeholder="Enter Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        className="mb-4 p-3 border border-gray-300 rounded-md"
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity
                        className="mb-2 bg-blue-500 p-3 rounded-md"
                        onPress={handleRegister}
                    >
                        <Text className="text-white text-center">Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-green-500 p-3 rounded-md"
                        onPress={handleLogin}
                    >
                        <Text className="text-white text-center">Login</Text>
                    </TouchableOpacity>
                    <Text className="text-center text-red-500 mt-4">{message}</Text>
                </View>
            </View>
        </View>
    );
};

export default SigninScreen;