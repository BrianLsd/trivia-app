import './Main.css';
import {useState} from "react";
import HomePage from './Pages/HomePage';
import QuestionPage from './Pages/QuestionPage';
import ResultPage from './Pages/ResultPage';
import {TriviaContext} from './Components/Contexts';

function Main() {
    const [gameState, setGameState] = useState('home');
    const [currentPlayerName, setCurrentPlayerName] = useState('');

    return (
        <div>
            <TriviaContext.Provider 
            value={{gameState, setGameState, currentPlayerName, setCurrentPlayerName}}>
                {gameState === 'home' && <HomePage/>}
                {gameState === 'question' && <QuestionPage/>}
                {gameState === 'result' && <ResultPage/>}
            </TriviaContext.Provider>
        </div>
    );
    
}

export default Main;
