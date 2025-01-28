import { View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Layout = ({ children }) => {
  const navigation = useNavigation();
  const route = useRoute();

  // Check if the current route is the home page
  const isHomePage = route.name === 'HomeScreen';

  return (
    <View className="flex-1 pt-3 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-3 py-2 mb-2">
        <View>
          {isHomePage ? (
            <Image source={require('../assets/icons/icon_app.png')} />
          ) : (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={25} color="black" />
            </TouchableOpacity>
          )}
        </View>

        {/* <View className="flex-row gap-x-2">
          <TouchableOpacity onPress={() => navigation.navigate('SettingScreen')}>
            <Image source={require('../assets/icons/icon_gear.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../assets/icons/icon_bell.png')} />
          </TouchableOpacity>
        </View> */}
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
  );
};

export default Layout;
