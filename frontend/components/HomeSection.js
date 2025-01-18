import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import HomeCard from './HomeCard';

const HomeSection = ({ title, navigation }) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <HomeCard
                items={[
                    {
                        image: require('../assets/images/image_2.png'),
                        title: 'How much protein..',
                        subtitle: 'Muscle building',
                    },
                    {
                        image: require('../assets/images/image_3.png'),
                        title: 'Are carb-rich foods..',
                        subtitle: 'Vitamins guide',
                    },
                ]}
            />
        </View>
    );
}

export default HomeSection

const styles = StyleSheet.create({
    section: {
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});
