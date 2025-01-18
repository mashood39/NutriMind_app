import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { baseURL } from '../lib/api'

const HomeCard = ({ title, image, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image
          source={{ uri: `${baseURL}${image}` }}
          style={styles.cardImage}
        />
        <Text style={styles.cardTitle}>
          {title.length > 20 ? title.slice(0, 20) + '...' : title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 10, // Provides spacing between cards
  },
  card: {
    width: 170,
    // height: '150',  // Fixed width for cards
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    // marginTop: 5,
  },
  cardImage: {
    width: '100%',
    height: 90,  // Fixed height for images
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default HomeCard;
