import React, {useContext, useEffect, useState} from 'react';
import { QuizContext }  from '../../hoc/quizProvider';
import { useNavigate } from 'react-router-dom';
import '../results/Results.scss';

function Results() {

    const navigate = useNavigate();
    // const {
    //     totalIncorrectAnswers,
    //     totalCorrectAnswers,
    //     totalQuizPlayed
    // } = useContext(QuizContext);
    //
    // useEffect(() => {
    //
    // }, [totalIncorrectAnswers, totalCorrectAnswers, totalQuizPlayed]);

    const goHome = () => navigate('/home');

    return (
        <div className="resultsPage">
            <div>
                <h4> Results page -  quiz </h4>
            </div>

            <ul className="list-group">
                <li className="list-group-item"> Total quiz played -  </li>
                <li className="list-group-item"> Total incorrect answers -  </li>
                <li className="list-group-item"> Total correct answers -  </li>
            </ul>

            <button className="btn btn-primary" onClick={goHome}>
                Back to quiz list
            </button>
        </div>
    );
}

export default Results;