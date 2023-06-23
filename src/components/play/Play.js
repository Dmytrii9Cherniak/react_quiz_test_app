import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../../hoc/quizProvider';
import { quizService } from '../../services/quizService';
import '../play/Play.scss';

function Play() {
    const [testQuestions, setTestQuestions] = useState();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const { isQuizInProgress, startQuiz, stopQuiz, currentQuizCategory } = useContext(QuizContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(currentQuizCategory);
    }, [isQuizInProgress, currentQuizCategory]);

    useEffect(() => {
        quizService.getAllTestsQuestions(currentQuizCategory.id).then(data => setTestQuestions(data));
    }, [currentQuizCategory]);

    const goHome = () => navigate('/home');

    const startMyCurrentQuiz = () => {
        startQuiz();
    };

    const stopMyCurrentQuiz = () => {
        stopQuiz();
    };


    const getValueAndCheckCorrectAnswer = () => {
        const formValue = this.getQuizFormValue()?.value.trim();
        const quizData = testQuestions.results[currentQuestionIndex].correct_answer;
        this.isAnswerCorrect = formValue === quizData;
    };

    return (
        <main>
            {!isQuizInProgress && (
                <div className="startQuiz">
                    <h1> Welcome to the Quiz! </h1>
                    <h2> Quiz Title - {currentQuizCategory?.name} </h2>
                    <h2> Number of questions in the quiz - 10 </h2>
                    <article>
                        <button className="btn btn-primary" onClick={goHome}>
                            Change Category
                        </button>
                        <button onClick={startMyCurrentQuiz} className="btn btn-secondary">
                            Play
                        </button>
                    </article>
                </div>
            )}
            {isQuizInProgress && (
                <div>
                    top) <button onClick={stopMyCurrentQuiz}> Cancel quiz </button>{' '}
                </div>
            )}
        </main>
    );
}

export default Play;
