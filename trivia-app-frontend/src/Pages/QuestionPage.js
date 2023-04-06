import Filler from '../Components/Filler'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, useContext} from 'react';
import {Container, Row, Button} from 'react-bootstrap';
import {TriviaContext} from '../Components/Contexts';

function QuestionPage () {
    const {setGameState, currentPlayerName} = useContext(TriviaContext);
    const [questions, setQuestions] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [optionChosen, setOptionChosen] = useState('');
    const [score, setScore] = useState(0);

    useEffect( () => {
        fetch("/api/questions")
        .then(response => response.json())
        .then(setQuestions)
        .catch(e => console.log(e))
    }, []);

    if (questions === '') {
        return <h1>Preparing your questions...please wait</h1>};

    const handleClick = () => {
        if (currentQuestion === questions.data.length - 1) {
            const storedMapString = localStorage.getItem(currentPlayerName);
            const storedMap = new Map(Object.entries(JSON.parse(storedMapString)));
            storedMap.set("lastest score", score);
            if (storedMap.has("times played")) {
                storedMap.set("times played", storedMap.get("times played") + 1);
            } else {
                storedMap.set("times played", 1);
            }

            if (storedMap.has("total score")){
                storedMap.set("total score", storedMap.get("total score") + score);
            } else {
                storedMap.set("total score", score);
            }

            if (storedMap.has("times of 10/10")){
                if (score === 10) {
                    storedMap.set("times of 10/10", storedMap.get("times of 10/10") + 1);
                }
            } else {
                if (score === 10) {
                    storedMap.set("times of 10/10", 1);
                } else {
                    storedMap.set("times of 10/10", 0);
                }
            }

            localStorage.setItem(currentPlayerName, JSON.stringify(Object.fromEntries(storedMap)));
            setGameState('result');
        } else {
            if (optionChosen === questions.data[currentQuestion].answer){
                setCurrentQuestion(currentQuestion + 1);
                setScore(score + 1);
            }
            setCurrentQuestion(currentQuestion + 1);
            setOptionChosen('');
        }
    }

    return (
        <div className='background'>
        <Filler/>
            <Container style={{justifyContent: "center"}}>
                <Row>
                    <h1 className='text-center'>Today's category is "{questions.category}"</h1>
                </Row>
                <Row style={{padding:30}}>
                    <h3 className='text-center'>{questions.data[currentQuestion].question}</h3>
                </Row>
                <Row style={{padding:30}}>
                    <h5 className='text-center'>Question: {currentQuestion + 1}/10</h5>
                </Row>
                <div className='options'>
                <Row style={{padding:20}}>
                    <Button onClick={() => setOptionChosen("A") }>A: {questions.data[currentQuestion].optionA}</Button>
                </Row>
                <Row style={{padding:20}}>  
                    <Button onClick={() => setOptionChosen("B")}>B: {questions.data[currentQuestion].optionB}</Button>
                </Row>
                <Row style={{padding:20}}>        
                    <Button onClick={() => setOptionChosen("C")}>C: {questions.data[currentQuestion].optionC}</Button>
                </Row>
                <Row style={{padding:20}}>    
                    <Button onClick={() => setOptionChosen("D")}>D: {questions.data[currentQuestion].optionD}</Button>
                </Row>  
                </div>
                <Row className="text-center" style={{padding:10}}>
                    {optionChosen === '' ? (<h5>(Unchosen)</h5>) :
                    (<h5>(Your answer: {optionChosen})</h5>)}
                </Row>
                <Row>
                    {currentQuestion === questions.data.length - 1 ? (<div style={{display: "flex", justifyContent: "center"}}>
                        <Button variant="danger" onClick={handleClick}>Finish</Button>
                    </div>) : (<div style={{display: "flex", justifyContent: "center"}}>
                        <Button variant="danger" onClick={handleClick}>Next</Button>
                    </div>)}
                </Row>
                <Row>
                    <div>
                        <br/>
                        <br/>
                        <h6 className="text-center">Version: 1.0 - 04/07/2023</h6>
                    </div>
                </Row>
            </Container>
        <div className='footer'>
            <Filler/>
        </div>
        </div>
    )
}

export default QuestionPage;