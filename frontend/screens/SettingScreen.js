import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Layout from '../components/Layout';

const ProfileScreen = ({ navigation }) => {
    return (
        <Layout>
            <ScrollView style={styles.container}>
                {/* Profile Header */}
                <View style={styles.profileHeader}>
                    <Image
                        source={require('../assets/images/image_1.png')}
                        style={styles.profileImage}
                    />
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>Joe Jacob</Text>
                        <Text style={styles.profileBio}>Learning to eat healthy</Text>
                    </View>
                    <TouchableOpacity style={styles.editButton}>
                        <Image source={require('../assets/icons/pen_icon.png')} />
                    </TouchableOpacity>
                </View>

                {/* Settings Section */}
                <Text style={styles.sectionTitle}>Edit profile settings</Text>
                <View style={styles.settingsList}>
                    {[
                        { icon: '👤', label: 'Personal information', route: 'PersonalInfo' },
                        { icon: '🔔', label: 'Notification settings', route: 'NotificationSettings' },
                        { icon: '🔒', label: 'Security settings', route: 'SecuritySettings' },
                        { icon: '🎧', label: 'Help center', route: 'HelpCenter' },
                    ].map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.settingItem}
                            onPress={() => navigation.navigate(item.route)}
                        >
                            <View style={styles.settingIconContainer}>
                                <Text style={styles.settingIcon}>{item.icon}</Text>
                            </View>
                            <Text style={styles.settingLabel}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Sign Out Button */}
                <TouchableOpacity style={styles.signOutButton}>
                    <Text style={styles.signOutText}>Sign out</Text>
                </TouchableOpacity>
            </ScrollView>
        </Layout>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#f9f9f9',
        // padding: 20,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    profileBio: {
        fontSize: 14,
        color: '#777',
    },
    editButton: {
        padding: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 10,
    },
    settingsList: {
        marginBottom: 20,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        elevation: 1,
    },
    settingIconContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#e0e0e0',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    settingIcon: {
        fontSize: 18,
    },
    settingLabel: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    signOutButton: {
        backgroundColor: '#add8e6',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    signOutText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});
