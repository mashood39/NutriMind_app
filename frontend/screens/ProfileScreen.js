import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Layout from '../components/Layout'

const ProfileScreen = ({ navigation }) => {
  return (
    <Layout>
      <View>
        <View className="flex-row items-center mb-8">
          <Image
            source={require('../assets/images/image_1.png')}
            className="w-16 h-16 rounded-full mr-4"
          />
          <Text className="text-lg font-bold text-gray-800" >Joe Jacob</Text>
        </View>

        <Text className="text-lg font-bold text-gray-800 mb-4">My dashboard</Text>

        <View className="flex-row justify-between">
          <View className="flex-row flex-wrap justify-between">
            <TouchableOpacity className="w-[28%] bg-blue-200 p-4 rounded-lg items-center mb-4">
              <Image
                source={require('../assets/icons/mind_icon.png')} // Replace with mind map icon
                className="w-8 h-8 mb-2"
              />
              <Text className="text-sm font-medium text-gray-800">Mind maps</Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-[28%] bg-blue-200 p-4 rounded-lg items-center mb-4">
              <Image
                source={require('../assets/icons/meal.png')} // Replace with meal plan icon
                className="w-8 h-8 mb-2"
              />
              <Text className="text-sm font-medium text-gray-800">Meal plan</Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-[28%] bg-blue-200 p-4 rounded-lg items-center mb-4">
              <Image
                source={require('../assets/icons/reward_icon.png')} // Replace with rewards icon
                className="w-8 h-8 mb-2"
              />
              <Text className="text-sm font-medium text-gray-800">Rewards</Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-[28%] bg-blue-200 p-4 rounded-lg items-center mb-4">
              <Image
                source={require('../assets/icons/whatsapp_icon.png')}// Replace with chat icon
                className="w-8 h-8 mb-2"
              />
              <Text className="text-sm font-medium text-gray-800">Chat</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text className="text-lg font-bold text-gray-800 mb-4">My trackers</Text>

        <View>
          <View>
            <View>
              <TouchableOpacity
                className="flex-row items-center bg-gray-200 p-4 rounded-lg mb-4"
                onPress={() => navigation.navigate('FoodTrackScreen')}
              >
                <Image
                  source={require('../assets/icons/no_food.png')}
                  className="w-10 h-10 mr-4"
                />
                <Text className="text-sm font-medium text-gray-800">
                  Daily consumption of food/drinks
                </Text>

              </TouchableOpacity>
            </View>

            {/* Tracker Item 2 */}
            <View>
              <TouchableOpacity
                className="flex-row items-center bg-gray-200 p-4 rounded-lg"
                onPress={() => navigation.navigate('ActivityTrackScreen')}
              >
                <Image
                  source={require('../assets/icons/pulse_icon.png')} // Replace with activity icon
                  className="w-10 h-10 mr-4"
                />
                <Text className="text-sm font-medium text-gray-800">
                  Daily physical activity
                </Text>

              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
    </Layout>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})