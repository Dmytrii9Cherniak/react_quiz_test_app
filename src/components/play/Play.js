import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../../hoc/quizProvider';
import { quizService } from '../../services/quizService';
import '../play/Play.scss';

function Play() {

    const [testQuestions, setTestQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuizCategory] = useState(JSON.parse(localStorage.getItem('category')));
    const { isQuizInProgress, startQuiz, stopQuiz, addTotalQuizPlayed } = useContext(QuizContext);
    const navigate = useNavigate();

    useEffect(() => {
        currentQuizCategory && quizService
            .getAllTestsQuestions(currentQuizCategory.id)
            .then((data) => setTestQuestions(data.results));
    }, [currentQuizCategory]);

    useEffect(() => {
        console.log(isQuizInProgress)
    }, [isQuizInProgress])

    const goHome = () => navigate('/home');

    const nextQuestion = () => {
        if (currentQuestionIndex !== 9) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    }

    const startMyCurrentQuiz = () => {
        startQuiz();
    };

    const cancelMyCurrentQuiz = () => {
        stopQuiz();
        navigate('/home')
    };

    const finishQuiz = () => {
        stopQuiz();
        addTotalQuizPlayed();
        navigate('/results');
    }

    return (
        <main>
            {!isQuizInProgress && (
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
                )}
            {isQuizInProgress && testQuestions.length > 0 && (
                <div>
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
                                    value={testQuestions[currentQuestionIndex].correct_answer}
                                />
                                <label className="form-check-label" htmlFor="rightAnswer">
                                    {testQuestions[currentQuestionIndex].correct_answer}
                                </label>
                            </div>
                        </div>
                        {testQuestions[currentQuestionIndex].incorrect_answers.map((answer, index) => (
                            <div className="form-check" key={index}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id={answer + index}
                                    value={answer}
                                />
                                <label className="form-check-label" htmlFor={answer + index}>
                                    {answer}
                                </label>
                            </div>
                            )
                        )}
                        {currentQuestionIndex !== 9 && (
                            <button className="btn btn-secondary" onClick={nextQuestion}>
                                Next question
                            </button>
                        )}
                        {currentQuestionIndex === 9 && (
                            <button className="btn btn-light" onClick={finishQuiz}>
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