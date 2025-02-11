import { View, Image, TouchableOpacity, SafeAreaView, Text } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useEffect, useState } from 'react';
import api from '../lib/api';

const Layout = ({ children }) => {
  const navigation = useNavigation();
  const route = useRoute();

  const isHomePage = route.name === 'HomeScreen';
  const [score, setScore] = useState([])
  const [totalScore, setTotalScore] = useState(0)

  const fetchScore = async () => {
    try {
      const response = await api.get('/api/submissions')
      const scores = response.data.submission
      setScore(scores)

      const sum = scores.reduce((acc, submission) => acc + submission.score, 0)
      setTotalScore(sum)
    } catch (error) {
      console.error("error in fetching the score", error.message)
    }
  }

  useEffect(() => {
    fetchScore();
  }, [score])

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View className="flex-1 pt-10 bg-white">
        {/* Header */}
        <View className="flex-row justify-between items-center px-3">
          <View>
            {isHomePage ? (
              <Image source={require('../assets/icons/icon_app.png')} />
            ) : (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={25} color="black" />
              </TouchableOpacity>
            )}
          </View>

          <View className="flex-row gap-x-2">
            <View className="flex-row items-center border border-gray-300 rounded-full px-4 py-1 mx-2 bg-white ">
              <Image
                className="w-6 h-6 mr-2"
                source={require('../assets/icons/coin.png')}
              />
              <Text className="font-semibold text-lg text-gray-800">{totalScore}</Text>
            </View>

            {/* <TouchableOpacity onPress={() => navigation.navigate('SettingScreen')}>
              <Image source={require('../assets/icons/icon_gear.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../assets/icons/icon_bell.png')} />
            </TouchableOpacity> */}
          </View>
        </View>

        {/* Content */}
        <View className="flex-1">{children}</View>

        {/* Footer */}
        <View className="h-20 flex-row justify-around items-center border-t border-gray-300">
          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
            <Image
              source={require('../assets/icons/icon_home.png')}
              className="w-7 h-7"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
            <Image
              source={require('../assets/icons/icon_profile.png')}
              className="w-7 h-7"
            />
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
};

export default Layout;
