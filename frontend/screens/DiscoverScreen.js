import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Layout from '../components/Layout'
import ExploreSection from '../components/ExploreSection'

const DiscoverScreen = ({ navigation }) => {
  
  return (
    <Layout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>     
        {/* Explore Section */}
        <ExploreSection navigation={navigation}/>
      </ScrollView>
    </Layout>
  )
}

export default DiscoverScreen

const styles = StyleSheet.create({})
