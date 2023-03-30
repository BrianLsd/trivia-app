import './Main.css';
import {useState} from "react";
import HomePage from './Pages/HomePage';
import QuestionPage from './Pages/QuestionPage';
import ResultPage from './Pages/ResultPage';

function Main() {
    const [gameState, setGameState] = useState('home');

    if (gameState === 'home'){
        return (
            <HomePage setGameState={setGameState}/>
        )
    } else if (gameState === 'question'){
        return (
            <QuestionPage setGameState={setGameState}/>
        )
    } else if (gameState === 'result'){
        return (
            <ResultPage setGameState={setGameState}/>
        )
    }
}

export default Main;
