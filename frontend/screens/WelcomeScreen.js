import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/welcomeImage.png')}
          style={styles.image}
        />
      </View>

      <Text style={styles.title}>NutriMind</Text>
      <Text style={styles.subtitle}>Map your nutrition journey</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.buttonText} >Sign in</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF9F6',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 75,
    overflow: 'hidden',
    marginTop: 40,
    // marginBottom: 20,
    // backgroundColor: 'red'
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    paddingTop: 50,
  },
  subtitle: {
    fontSize: 16,
    // color: '#555',
    opacity: 0.4,
    marginBottom: 100,
  },
  button: {
    backgroundColor: '#aad3ff',
    width: '80%',
    paddingVertical: 10,
    // paddingHorizontal: 20,
    borderRadius: 14,
    height: 45,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center'
  },
});

export default WelcomeScreen;

