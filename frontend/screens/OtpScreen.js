import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const OtpScreen = ({ navigation }) => {
  const [otp, setOtp] = useState('');

  const handleOtpChange = (text) => {
    setOtp(text);
  };



  return (
    <View style={styles.container}>
      <View style={styles.mainArea}>
        <Text style={styles.welcomeText}>Welcome to NutriMind</Text>
        <Text style={styles.otpText}>Enter the OTP</Text>

        <View style={styles.otpInputContainer}>
          <TextInput
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={handleOtpChange}
          />
          <TextInput
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={handleOtpChange}
          />
          <TextInput
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={handleOtpChange}
          />
          <TextInput
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={handleOtpChange}
          />
        </View>

        <TouchableOpacity style={styles.goButton} onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.buttonText}>Go!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#fff',
  },
  mainArea: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#ece7e7',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 40,
    borderRadius: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  otpText: {
    fontSize: 16,
    marginBottom: 10,
  },
  otpInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  otpInput: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    marginHorizontal: 5,
    backgroundColor: '#ccc',
    borderRadius: 10,

  },
  goButton: {
    width: '80%',
    backgroundColor: '#87cefa',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    // color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default OtpScreen;