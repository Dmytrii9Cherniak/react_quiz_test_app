import React, { useEffect, useState } from 'react';
import { quizService } from '../../services/quizService';
import '../home/Home.scss';

function Home() {
    const [quizCategories, setQuizCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getRandomQuizCategory = () => {
        const randomIndex = Math.floor(Math.random() * quizCategories.length);
        const randomCategory = quizCategories[randomIndex];
        console.log('Random Quiz Category:', randomCategory);
    };

    useEffect(() => {
        quizService.getAllTestCategories().then(data => {
            setIsLoading(true);
            setQuizCategories(data.trivia_categories);
            setIsLoading(false);
            console.log('Quiz Categories:', data);
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
                        {quizCategories.map(category => (
                            <li key={category.id} className="list-group-item">
                                {category.name}
                                <button className="btn btn-success">Select Category</button>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
}

export default Home;