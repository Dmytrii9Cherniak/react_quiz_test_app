import React, { useContext, useEffect, useState } from 'react';
import { quizService } from '../../services/quizService';
import { QuizContext } from '../../hoc/quizProvider';
import { useNavigate } from 'react-router-dom';
import '../home/Home.scss';

function Home() {

    const [quizCategories, setQuizCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const getRandomQuizCategory = () => {
        const randomIndex = Math.floor(Math.random() * quizCategories.length);
        const randomCategory = quizCategories[randomIndex];
        localStorage.setItem('category', JSON.stringify(randomCategory));
        playQuiz();
    };

    const playQuiz = () => navigate('/play');

    const selectCategory = (id, name) => {
        const selectedCategory = {
            id: id,
            name: name
        };
        localStorage.setItem('category', JSON.stringify(selectedCategory));
        playQuiz();
    };

    useEffect(() => {
        setIsLoading(true);
        quizService.getAllTestCategories().then((data) => {
            setQuizCategories(data.trivia_categories);
            setIsLoading(false);
        });
    }, []);

    return (
        <div className="homeComponent">
            <div>
                <h4>Hi! Select your quiz category or choose a random one</h4>
                <button className="btn btn-success" onClick={getRandomQuizCategory}>
                    I'm lucky
                </button>
            </div>
            <main>
                {isLoading ? (
                    <div className="spinner">
                        <h4>Loading</h4>
                        <div className="spinner-border text-secondary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <ul>
                        {quizCategories.map((category) => (
                            <li key={category.id} className="list-group-item">
                                {category.name}
                                <button className="btn btn-success"
                                        onClick={() => selectCategory(category.id, category.name)}>
                                    Select Category
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
}

export default Home;