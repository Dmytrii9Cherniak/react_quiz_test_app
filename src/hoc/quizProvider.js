import React, {createContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {

    const [isQuizInProgress, setQuizInProgress] = useState(false);
    const [totalQuizPlayed, setTotalQuizPlayed] = useState(0);
    const [totalCorrectAnswers, setTotalCorrectTrueAnswers] = useState(0);
    const [totalIncorrectAnswers, setTotalIncorrectAnswers] = useState(0);
    const navigate = useNavigate();

    const startQuiz = () => setQuizInProgress(true);
    const stopQuiz = () => setQuizInProgress(false);

    const addTotalQuizPlayed = () => setTotalQuizPlayed(totalQuizPlayed + 1);

    const recordAnswers = (quizAnswer) =>  {
        return quizAnswer
            ? setTotalCorrectTrueAnswers(totalCorrectAnswers + 1)
            : setTotalIncorrectAnswers(totalIncorrectAnswers + 1);
    }

    useEffect(() => {
        isQuizInProgress && navigate('/play')
    }, [isQuizInProgress, navigate])

    useEffect(() => {
        const handlePopstate = () => {
            isQuizInProgress && navigate('/play');
        };

        window.addEventListener('popstate', handlePopstate);

        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, [isQuizInProgress, navigate]);

    const value = {
        isQuizInProgress,
        stopQuiz,
        startQuiz,
        addTotalQuizPlayed,
        recordAnswers,
        totalIncorrectAnswers,
        totalCorrectAnswers,
        totalQuizPlayed,
    };

    return (
        <QuizContext.Provider value={value}>
            {children}
        </QuizContext.Provider>
    );
};