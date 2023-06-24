import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../../hoc/quizProvider';
import { quizService } from '../../services/quizService';
import QuizHeader from './quizHeader/QuizHeader';
import '../play/Play.scss';

function Play() {

    const [testQuestions, setTestQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isRadioButtonSelected, setIsRadioButtonSelected] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [currentQuizCategory] = useState(JSON.parse(localStorage.getItem('category')));
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
        recordAnswers(selectedAnswer === testQuestions[currentQuestionIndex].correct_answer);

        currentQuestionIndex !== 9 &&
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsRadioButtonSelected(false);
        setSelectedAnswer(null);
    };

    const cancelMyCurrentQuiz = () => {
        stopQuiz();
        navigate('/home');
    };

    const finishQuiz = () => {
        stopQuiz();
        addTotalQuizPlayed();
        recordAnswers(selectedAnswer === testQuestions[currentQuestionIndex].correct_answer);
        navigate('/results');
    };

    const radioButtonGetValue = (value) => {
        setIsRadioButtonSelected(true)
        setSelectedAnswer(value);
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
                                    checked={selectedAnswer === testQuestions[currentQuestionIndex].correct_answer}
                                    onChange={() => radioButtonGetValue(testQuestions[currentQuestionIndex].correct_answer)}
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
                                            checked={selectedAnswer === answer}
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