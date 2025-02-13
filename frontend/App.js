import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './screens/WelcomeScreen';
import SigninScreen from './screens/SigninScreen';
import HomeScreen from './screens/HomeScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import BlogScreen from './screens/BlogScreen';
import SettingScreen from './screens/SettingScreen';
import MindMapScreen from './screens/MindMapScreen';
import ProfileScreen from './screens/ProfileScreen';
import QuizScreen from './screens/QuizScreen';
import MealPlanScreen from './screens/MealPlanScreen';
import FoodTrackScreen from './screens/FoodTrackScreen';
import ActivityTrackScreen from './screens/ActivityTrackScreen';

import { AuthProvider } from './context/AuthContext';


import "./global.css";
import RewardScreen from './screens/RewardScreen';
import GlossaryScreen from './screens/GlossaryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
          <Stack.Screen name="SignIn" options={{ headerShown: false }} component={SigninScreen} />
          <Stack.Screen name="HomeScreen" options={{ headerShown: false }} component={HomeScreen} />
          <Stack.Screen name="DiscoverScreen" options={{ headerShown: false }} component={DiscoverScreen} />
          <Stack.Screen name="BlogScreen" options={{ headerShown: false }} component={BlogScreen} />
          <Stack.Screen name="SettingScreen" options={{ headerShown: false }} component={SettingScreen} />
          <Stack.Screen name="MindMapScreen" options={{ headerShown: false }} component={MindMapScreen} />
          <Stack.Screen name="QuizScreen" options={{ headerShown: false }} component={QuizScreen} />
          <Stack.Screen name="ProfileScreen" options={{ headerShown: false }} component={ProfileScreen} />
          <Stack.Screen name="MealPlanScreen" options={{ headerShown: false }} component={MealPlanScreen} />
          <Stack.Screen name="FoodTrackScreen" options={{ headerShown: false }} component={FoodTrackScreen} />
          <Stack.Screen name="ActivityTrackScreen" options={{ headerShown: false }} component={ActivityTrackScreen} />
          <Stack.Screen name="RewardScreen" options={{ headerShown: false }} component={RewardScreen} />
          <Stack.Screen name="GlossaryScreen" options={{ headerShown: false }} component={GlossaryScreen} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}
