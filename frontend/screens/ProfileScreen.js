import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Layout from '../components/Layout'
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = ({ navigation }) => {
  return (
    <Layout>
      <View className="px-4">
        <View className="flex-row items-center mb-8">
          <Image
            source={require('../assets/images/image_1.png')}
            className="w-16 h-16 rounded-full mr-4"
          />
          <Text className="text-lg font-bold text-gray-800" >Joe Jacob</Text>
        </View>

        <Text className="text-lg font-bold text-gray-800 mb-4">My dashboard</Text>

        <View className="flex-row flex-wrap justify-center">
          <TouchableOpacity
            className="w-[45%] bg-blue-200 p-4 rounded-lg items-center mb-4 mx-2"

          >
            <Image
              source={require('../assets/icons/mind_icon.png')}
              className="w-8 h-8 mb-2"
            />
            <Text className="text-sm font-medium text-gray-800">Mind maps</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-[45%] bg-blue-200 p-4 rounded-lg items-center mb-4 mx-2"
          >
            <Image
              source={require('../assets/icons/meal.png')}
              className="w-8 h-8 mb-2"
            />
            <Text className="text-sm font-medium text-gray-800">Meal plan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-[45%] bg-blue-200 p-4 rounded-lg items-center mb-4 mx-2"
            onPress={() => navigation.navigate('RewardScreen')}
          >
            <Image
              source={require('../assets/icons/reward_icon.png')}
              className="w-8 h-8 mb-2"
            />
            <Text className="text-sm font-medium text-gray-800">Rewards</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-[45%] bg-blue-200 p-4 rounded-lg items-center mb-4 mx-2">
            <Image
              source={require('../assets/icons/whatsapp_icon.png')}
              className="w-8 h-8 mb-2"
            />
            <Text className="text-sm font-medium text-gray-800">Chat</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-lg font-bold text-gray-800 mb-4">My trackers</Text>

        <View>
          <View>
            <View>
              <TouchableOpacity
                className="flex-row items-center bg-gray-200 p-4 rounded-lg mb-4"
                onPress={() => navigation.navigate('FoodTrackScreen')}
              >
                <Icon name="fastfood" size={35} color="black" className="mr-4" />
                <Text className="text-sm font-semibold text-gray-800">
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
                <Icon name="pool" size={35} color="black" className="mr-4" />
                <Text className="text-sm font-semibold text-gray-800">
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