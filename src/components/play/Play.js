import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../../hoc/quizProvider';
import { quizService } from '../../services/quizService';
import '../play/Play.scss';
import QuizHeader from "./quizHeader/QuizHeader";

function Play() {

    const [testQuestions, setTestQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuizCategory] = useState(JSON.parse(localStorage.getItem('category')));
    const [isRadioButtonSelected, setIsRadioButtonSelected] = useState(false);
    const {
        isQuizInProgress,
        stopQuiz,
        addTotalQuizPlayed,
        recordAnswers,
    } = useContext(QuizContext);
    const navigate = useNavigate();

    useEffect(() => {
        currentQuizCategory &&
        quizService
            .getAllTestsQuestions(currentQuizCategory.id)
            .then((data) => setTestQuestions(data.results));
    }, [currentQuizCategory]);

    const nextQuestion = () => {
        currentQuestionIndex !== 9 &&
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setIsRadioButtonSelected(false);
    };

    const cancelMyCurrentQuiz = () => {
        stopQuiz();
        navigate('/home');
    };

    const finishQuiz = () => {
        stopQuiz();
        addTotalQuizPlayed();
        navigate('/results');
    };

    const radioButtonGetValue = (value) => {
        const isTrue = value === testQuestions[currentQuestionIndex].correct_answer;
        setIsRadioButtonSelected(!isRadioButtonSelected);
        recordAnswers(isTrue);
    };

    return (
        <main>
            {!isQuizInProgress && (<QuizHeader />)}
            {isQuizInProgress && testQuestions.length > 0 && (
                <div className="form">
                    <nav>
                        <h2>Question {currentQuestionIndex + 1}</h2>
                        <button className="btn btn-warning" onClick={cancelMyCurrentQuiz}>
                            Cancel quiz
                        </button>
                    </nav>
                    <article className="articleAnswers">
                        <p>{testQuestions[currentQuestionIndex].question}</p>
                        <div className="answersBlock">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="rightAnswer"
                                    name="answerSelection"
                                    checked={isRadioButtonSelected}
                                    onChange={() =>
                                        radioButtonGetValue(
                                            testQuestions[currentQuestionIndex].correct_answer
                                        )
                                    }
                                    value={testQuestions[currentQuestionIndex].correct_answer}
                                />
                                <label className="form-check-label" htmlFor="rightAnswer">
                                    {testQuestions[currentQuestionIndex].correct_answer}
                                </label>
                            </div>
                            {testQuestions[currentQuestionIndex].incorrect_answers.map(
                                (answer, index) => (
                                    <div className="form-check" key={index}>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            id={answer + index}
                                            name="answerSelection"
                                            checked={isRadioButtonSelected}
                                            onChange={() => radioButtonGetValue(answer)}
                                            value={answer}
                                        />
                                        <label className="form-check-label" htmlFor={answer + index}>
                                            {answer}
                                        </label>
                                    </div>
                                )
                            )}
                        </div>
                        {currentQuestionIndex !== 9 && (
                            <button
                                className="btn btn-secondary"
                                onClick={nextQuestion}
                                disabled={!isRadioButtonSelected}
                            >
                                Next question
                            </button>
                        )}
                        {currentQuestionIndex === 9 && (
                            <button
                                className="btn btn-light"
                                onClick={finishQuiz}
                                disabled={!isRadioButtonSelected}
                            >
                                Finish
                            </button>
                        )}
                    </article>
                </div>
            )}
        </main>
    );
}

export default Play;