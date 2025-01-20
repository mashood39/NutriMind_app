import { View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

const Layout = ({ children }) => {
  const navigation = useNavigation();
  const route = useRoute();

  // Check if the current route is the home page
  const isHomePage = route.name === 'HomeScreen';

  return (
    <View className="flex-1 mt-5 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-2 mb-2">
        <View>
          {isHomePage ? (
            <Image source={require('../assets/icons/icon_app.png')} />
          ) : (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/icons/back_icon.png')}
                className="w-6 h-6"
              />
            </TouchableOpacity>
          )}
        </View>

        <View className="flex-row gap-x-2">
          <TouchableOpacity onPress={() => navigation.navigate('SettingScreen')}>
            <Image source={require('../assets/icons/icon_gear.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../assets/icons/icon_bell.png')} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1">{children}</View>

      {/* Footer */}
      <View className="h-16 flex-row justify-around items-center border-t border-gray-300">
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
  );
};

export default Layout;
