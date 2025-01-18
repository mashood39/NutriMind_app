import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from "../components/Loadingscreen";
import api from "../lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigation = useNavigation();

    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    async function loadUserFromStorage() {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const { data } = await api.get('/api/user/profile');
            if (data?.user?.email) {
                setUser({ email: data.user.email });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadUserFromStorage();
    }, []);

    const login = async (data) => {
        try {
            const response = await api.post("/api/user/login", {
                email: data.email,
                password: data.password,
            });

            if (response.status == 200) {
                await AsyncStorage.setItem('token', response.data.token);
                api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

                const userProfile = await api.get('api/user/profile');
                if (userProfile.data.user.email) {
                    setUser({ email: userProfile.data.user.email });
                    navigation.navigate('HomeScreen');
                }
            } else if (response.data.success == false) {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setUser(null);
        delete api.defaults.headers.common["Authorization"];
        navigation.navigate('SigninScreen');
    };

    return (
        <AuthContext.Provider
            value={{ user, login, logout, isLoading, isAuthenticated: !!user }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const ProtectedRoute = ({ children }) => {
    const navigation = useNavigation();
    const { isLoading, isAuthenticated } = useAuthContext();

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (!isAuthenticated) {
        navigation.navigate('SigninScreen');
        return null;
    }

    return children;
};
