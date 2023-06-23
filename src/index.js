import { BrowserRouter } from 'react-router-dom';
import { QuizProvider } from './hoc/quizProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <QuizProvider>
            <App />
        </QuizProvider>
    </BrowserRouter>
);