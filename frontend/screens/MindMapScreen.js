import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import Layout from '../components/Layout';

const MindMapScreen = ({ route }) => {
    const { id, title } = route.params;

    const [loading, setLoading] = useState(true);

    return (
        <Layout>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>

                {loading && (
                    <ActivityIndicator
                        size="large"
                        color="#4a90e2"
                        style={styles.loader}
                    />
                )}

                <WebView
                    source={{ uri: `https://coggle.it/diagram/${id}/t/${title}` }}
                    style={styles.webview}
                    onLoadStart={() => setLoading(true)}  // Show loader when loading starts
                    onLoadEnd={() => setLoading(false)}   // Hide loader when loading ends
                    onError={() => setLoading(false)}     // Hide loader if there's an error
                />
            </View>
        </Layout>
    );
};

export default MindMapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Center content vertically
        // alignItems: 'center',      // Center content horizontally
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    webview: {
        flex: 1,
        width: '100%',

    },
    loader: {
        zIndex: 100,
        position: 'absolute',  // Position the loader over the WebView
        top: '50%',            // Center vertically
        left: '50%',           // Center horizontally
        marginLeft: -25,       // Offset the spinner's width
        marginTop: -25,        // Offset the spinner's height
    },
});
