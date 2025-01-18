import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Layout from '../components/Layout';
import api from '../lib/api';

const QuizScreen = ({ route }) => {
    const { quizId } = route.params;

    const [quiz, setQuiz] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [previousSubmission, setPreviousSubmission] = useState(null);
    // const [userId, setUserId] = useState(null);

    useEffect(() => {
        fetchQuiz();
        fetchPreviousSubmission();
        // getUserId(); // Fetch the user ID from AsyncStorage
    }, []);

    // const getUserId = async () => {
    //     try {
    //         const storedUserId = await AsyncStorage.getItem('userId'); // Assuming you've stored it
    //         if (storedUserId) {
    //             setUserId(storedUserId);
    //         }
    //         console.log(storedUserId)
    //         console.log("fetch user di scucess.")
    //     } catch (error) {
    //         console.error('Error fetching user ID from AsyncStorage', error.message);
    //     }
    // };

    const fetchQuiz = async () => {
        try {
            const response = await api.get(`/api/quizzes/${quizId}`);
            setQuiz(response.data.quiz);
        } catch (error) {
            console.error('Error fetching quiz:', error.message);
        }
    };

    const fetchPreviousSubmission = async () => {
        // if (!userId) return; // Avoid making request if userId is not available yet
        try {
            const response = await api.get(`/api/submissions/${quizId}`);
            setPreviousSubmission(response.data)
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log('No previous submission found for this quiz.');
                setPreviousSubmission(null);
            }
            else {
                console.error('Error fetching previous submission:', error.message);
            }
        }
    };

    const handleAnswer = (index) => {
        if (quiz.questions[currentQuestion].correctAnswer === index) {
            setScore(score + 1);
        }
        setSelectedOption(index);
    };

    const nextQuestion = () => {
        if (currentQuestion < quiz.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
        } else {
            submitQuiz();
        }
    };

    const submitQuiz = async () => {
        // if (!userId) return; // Ensure userId is available before submitting
        try {
            await api.post(`api/submissions/${quizId}/submit`, {
                // userId,
                score,
            });
            setIsSubmitted(true);
            Alert.alert('Quiz submitted!', `Your score: ${score}`);
        } catch (error) {
            console.error('Error submitting quiz:', error.message);
        }
    };

    const resetQuiz = async () => {
        // if (!userId) return; // Ensure userId is available before resetting
        try {
            // await api.post(`api/submissions/${quizId}/reset`, { userId });
            await api.post(`api/submissions/${quizId}/reset`);
            setCurrentQuestion(0);
            setScore(0);
            setSelectedOption(null);
            setIsSubmitted(false);
            setPreviousSubmission(null);
        } catch (error) {
            console.error('Error resetting quiz:', error.message);
        }
    };

    if (!quiz) return <Text>Loading...</Text>;

    if (previousSubmission && !isSubmitted) {
        return (
            <Layout>
                <View className="flex-1 items-center justify-center">
                    <Text className="text-lg font-bold">You already attempted this quiz!</Text>
                    <Text className="text-base">Previous Score: {previousSubmission.score}</Text>
                    <TouchableOpacity
                        className="mt-4 p-4 bg-blue-500 rounded-lg"
                        onPress={resetQuiz}
                    >
                        <Text className="text-white">Reset Quiz</Text>
                    </TouchableOpacity>
                </View>
            </Layout>
        );
    }

    const question = quiz.questions[currentQuestion];

    return (
        <Layout>
            <ScrollView className="flex-1 bg-gray-100 p-4">
                <Text className="text-lg font-medium mb-4">{question.question}</Text>
                {question.options.map((option, index) => {
                    const isCorrect = index === question.correctAnswer;
                    const isSelected = index === selectedOption;

                    return (
                        <TouchableOpacity
                            key={index}
                            className={`p-4 rounded-lg mb-2 ${isSelected
                                ? isCorrect
                                    ? 'bg-green-500'
                                    : 'bg-red-500'
                                : isCorrect && selectedOption !== null
                                    ? 'bg-green-500'
                                    : 'bg-gray-200'
                                }`}
                            onPress={() => handleAnswer(index)}
                            disabled={selectedOption !== null}
                        >
                            <Text className="text-base">{option}</Text>
                        </TouchableOpacity>
                    );
                })}
                {selectedOption !== null && (
                    <TouchableOpacity
                        className="p-4 bg-blue-500 rounded-lg mt-4"
                        onPress={nextQuestion}
                    >
                        <Text className="text-white">Next</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </Layout>
    );
};

export default QuizScreen;
