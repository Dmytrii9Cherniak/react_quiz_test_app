import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext }  from '../../hoc/quizProvider';
import '../results/Results.scss';

function Results() {

    const [currentQuizCategory] = useState(JSON.parse(localStorage.getItem('category')));
    const navigate = useNavigate();
    const {
        totalIncorrectAnswers,
        totalCorrectAnswers,
        totalQuizPlayed
    } = useContext(QuizContext);

    const goHome = () => navigate('/home');

    return (
        <div className="resultsPage">
            <div>
                <h4> Last played quiz - {currentQuizCategory.name} </h4>
            </div>

            <ul className="list-group">
                <li className="list-group-item"> Total quiz played - {totalQuizPlayed} </li>
                <li className="list-group-item"> Total incorrect answers - {totalIncorrectAnswers} </li>
                <li className="list-group-item"> Total correct answers - {totalCorrectAnswers} </li>
            </ul>

            <button className="btn btn-primary" onClick={goHome}>
                Back to quiz list
            </button>
        </div>
    );
}

export default Results;