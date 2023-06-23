import React, { createContext, useState } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {

    const [isQuizInProgress, setQuizInProgress] = useState(false);
    // const [totalQuizPlayed, setTotalQuizPlayed] = useState(0);
    // const [totalCorrectAnswers, setTotalCorrectTrueAnswers] = useState(0);
    // const [totalIncorrectAnswers, setTotalIncorrectAnswers] = useState(0);

    const startQuiz = () => setQuizInProgress(true);
    const stopQuiz = () => setQuizInProgress(false);

    // const addTotalQuizPlayed = () => setTotalQuizPlayed(totalQuizPlayed + 1);

    // const recordAnswers = (quizAnswer) =>  {
    //     return quizAnswer
    //         ? setTotalCorrectTrueAnswers(totalCorrectAnswers + 1)
    //         : setTotalIncorrectAnswers(totalIncorrectAnswers + 1);
    // }

    const value = {
        isQuizInProgress,
        stopQuiz,
        startQuiz,
        // recordAnswers,
        // totalIncorrectAnswers,
        // totalCorrectAnswers,
        // totalQuizPlayed,
        // addTotalQuizPlayed
    };

    return (
        <QuizContext.Provider value={value}>
            {children}
        </QuizContext.Provider>
    );
};