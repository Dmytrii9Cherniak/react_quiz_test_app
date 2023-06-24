import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../../../hoc/quizProvider';
import '../quizHeader/QuizHeader.scss';

function QuizHeader() {

    const [currentQuizCategory] = useState(JSON.parse(localStorage.getItem('category')));
    const navigate = useNavigate();
    const { startQuiz } = useContext(QuizContext);

    const goHome = () => navigate('/home');

    const startMyCurrentQuiz = () => {
        startQuiz();
    };

    return (
        <div className="startQuiz">
            <h1>Welcome to the Quiz!</h1>
            <h2>Quiz Title - {currentQuizCategory.name}</h2>
            <h2>Number of questions in the quiz - 10</h2>
            <article>
                <button className="btn btn-primary" onClick={goHome}>
                    Change Category
                </button>
                <button onClick={startMyCurrentQuiz} className="btn btn-secondary">
                    Play
                </button>
            </article>
        </div>
    );
}

export default QuizHeader;