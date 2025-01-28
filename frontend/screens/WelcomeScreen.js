import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View className="flex-1 justify-center items-center bg-[#FAF9F6]">

      {/* Image Container */}
      <View className="w-80 h-80 rounded-full overflow-hidden mt-10">
        <Image
          source={require('../assets/images/welcomeImage.png')}
          className="w-full h-full"
        />
      </View>

      {/* Title */}
      <Text className="text-4xl font-bold pt-12">NutriMind</Text>
      <Text className="text-lg text-gray-500 opacity-60 mb-24">Map your nutrition journey</Text>

      {/* Sign-in Button */}
      <TouchableOpacity
        className="bg-[#aad3ff] w-4/5 py-2.5 rounded-xl h-14 items-center justify-center"
        onPress={() => navigation.navigate('HomeScreen')}
      >
        <Text className="text-xl text-black font-semibold">Start</Text>
      </TouchableOpacity>

    </View>
  );
};

export default WelcomeScreen;