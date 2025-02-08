import { Text, View, ScrollView } from 'react-native'
import React from 'react'
import Layout from '../components/Layout'
import { useEffect, useState } from 'react'
import api from '../lib/api'

const RewardScreen = () => {

    const [submissions, setSubmissions] = useState([])
    const [quizzes, setQuizzes] = useState([])
    const [quizResults, setQuizResults] = useState([])

    const fetchSubmissions = async () => {
        try {
            const response = await api.get('/api/submissions');
            setSubmissions(response.data.submission)
        } catch (error) {
            console.error("error in fetching the submissions.", error.message)
        }
    }

    const fetchQuizzes = async () => {
        try {
            const response = await api.get('/api/quizzes')
            setQuizzes(response.data)
        } catch (error) {
            console.error("error in fetching the quizzes", error.message)
        }
    }

    useEffect(() => {
        fetchSubmissions();
        fetchQuizzes();
    }, [])

    useEffect(() => {
        if (submissions.length > 0 && quizzes.length > 0) {
            const mergedData = submissions.filter(submission => submission.score > 0).map(submission => {
                const quiz = quizzes.find(q => q._id === submission.quizId)
                return {
                    quizTitle: quiz.title,
                    score: submission.score
                }
            })
            setQuizResults(mergedData)
        }
    }, [submissions, quizzes])

    return (
        <Layout>
            <ScrollView showsVerticalScrollIndicator={false} className="px-4">
                <Text className="text-xl font-bold text-gray-800 mb-3">Rewards</Text>
                <View className='pt-4'>
                    {quizResults.map((quiz, index) => (
                        <View key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-300 mb-2">
                            <View className='flex-row '>
                                <Text className='leading-6'>🎁</Text>
                                <Text className='ml-2 leading-6'>You have earned<Text className="font-bold"> {quiz.score} points </Text>
                                    for completing the quiz -
                                    <Text className="font-bold"> {quiz.quizTitle}.</Text>
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </Layout>
    )
}

export default RewardScreen