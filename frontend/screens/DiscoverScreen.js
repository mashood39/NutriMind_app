import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Layout from '../components/Layout'
import ExploreSection from '../components/ExploreSection'

const DiscoverScreen = ({ navigation }) => {

  return (
    <Layout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} className='px-4' >
        {/* Explore Section */}
        <ExploreSection navigation={navigation} />
        <TouchableOpacity onPress={() => navigation.navigate('GlossaryScreen')} className="w-full bg-blue-500 rounded-full p-2 mt-4">
          <Text className="text-xl text-center text-white font-bold">Glossary</Text>
        </TouchableOpacity>
      </ScrollView>
    </Layout>
  )
}

export default DiscoverScreen

const styles = StyleSheet.create({})
