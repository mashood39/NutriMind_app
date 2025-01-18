import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const LatestBlogCard = ({ image, title , navigation}) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('BlogScreen')}>
            <View style={styles.container}>
                <Text style={styles.title}>Read latest blog</Text>
                <Image source={image} style={styles.image} />
                <View style={styles.overlay}>
                    <Text style={styles.blogTitle}>{title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default LatestBlogCard;

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#d8f4ef',
        padding: 15,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    blogTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
});
