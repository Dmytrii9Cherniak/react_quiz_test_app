import React, { createContext, useState } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [isQuizInProgress, setQuizInProgress] = useState(false);
    const [currentQuizCategory, setCurrentQuizCategory] = useState(null);

    const startQuiz = () => setQuizInProgress(true);
    const stopQuiz = () => setQuizInProgress(false);
    const setCertainQuizCategory = (category) => setCurrentQuizCategory(category);

    const value = {
        isQuizInProgress,
        startQuiz,
        stopQuiz,
        currentQuizCategory,
        setCertainQuizCategory
    };

    return (
        <QuizContext.Provider value={value}>
            {children}
        </QuizContext.Provider>
    );
};