import Filler from '../Components/Filler'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, useContext, useRef} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {TriviaContext} from '../Components/Contexts';
import QuizTimer from '../Components/Timer';

function QuestionPage () {
    const {setGameState, currentPlayerName} = useContext(TriviaContext);
    const [questions, setQuestions] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [optionChosen, setOptionChosen] = useState('');
    const score = useRef(0);

    useEffect( () => {
        fetch("/api/questions")
        .then(response => response.json())
        .then(setQuestions)
        .catch(e => console.log(e))
    }, []);

    if (questions === '') {
        return <h1 className='rainbow'>Preparing your questions...please wait</h1>};

    const handleClick = () => {
        if (currentQuestion === questions.data.length - 1) {
            if (optionChosen === questions.data[currentQuestion].answer){
                score.current = score.current + 1;
            }
            const storedMapString = localStorage.getItem(currentPlayerName);
            const storedMap = new Map(Object.entries(JSON.parse(storedMapString)));
            storedMap.set("lastest score", score.current);
            if (storedMap.has("times played")) {
                storedMap.set("times played", storedMap.get("times played") + 1);
            } else {
                storedMap.set("times played", 1);
            }

            if (storedMap.has("total score")){
                storedMap.set("total score", storedMap.get("total score") + score.current);
            } else {
                storedMap.set("total score", score.current);
            }

            if (storedMap.has("times of 10/10")){
                if (score.current === 10) {
                    storedMap.set("times of 10/10", storedMap.get("times of 10/10") + 1);
                }
            } else {
                if (score.current === 10) {
                    storedMap.set("times of 10/10", 1);
                } else {
                    storedMap.set("times of 10/10", 0);
                }
            }

            localStorage.setItem(currentPlayerName, JSON.stringify(Object.fromEntries(storedMap)));
            setGameState('result');
        } else {
            if (optionChosen === questions.data[currentQuestion].answer){
                score.current = score.current + 1;
            } 
            setCurrentQuestion(currentQuestion + 1);
            setOptionChosen('');
        }
        console.log(score);
    }

    return (
        <div className='background'>
        <Filler/>
            <Container style={{justifyContent: "center"}}>
                <Row>
                    <Col>
                        <h1 className='text-center rainbow'>Pure Trivia</h1>
                    </Col>
                </Row>
                <Row style={{padding:30}}>
                    <Col>
                        <h3 className='text-center' style={{color:'RoyalBlue', fontStyle:'italic'}}>{questions.data[currentQuestion].question}</h3>
                    </Col>
                </Row>
                <Row style={{padding:10}}>
                    <Col className='text-center' style={{color:'OrangeRed', fontWeight:'bold', fontSize:'x-large'}}>
                        <QuizTimer />
                    </Col>
                </Row>
                <Row style={{padding:10}}>
                    <Col>
                        <h5 className='text-center'>Question: {currentQuestion + 1}/10</h5>
                    </Col>
                </Row>
                <div className='options'>
                <Row style={{padding:20}}>
                    <Button onClick={() => setOptionChosen("A") } className='btn btn-dark'>A: {questions.data[currentQuestion].optionA}</Button>
                </Row>
                <Row style={{padding:20}}>  
                    <Button onClick={() => setOptionChosen("B")} className='btn btn-dark'>B: {questions.data[currentQuestion].optionB}</Button>
                </Row>
                <Row style={{padding:20}}>        
                    <Button onClick={() => setOptionChosen("C")} className='btn btn-dark'>C: {questions.data[currentQuestion].optionC}</Button>
                </Row>
                <Row style={{padding:20}}>    
                    <Button onClick={() => setOptionChosen("D")} className='btn btn-dark'>D: {questions.data[currentQuestion].optionD}</Button>
                </Row>  
                </div>
                <Row className="text-center" style={{padding:10}}>
                    <Col>
                        {optionChosen === '' ? (<h5>(No answer selected)</h5>) :
                        (<h5>(Your answer: {optionChosen})</h5>)}
                    </Col>
                </Row>
                <Row>
                    {currentQuestion.current === questions.data.length - 1 ? (<div style={{display: "flex", justifyContent: "center"}}>
                        <Button variant="danger" onClick={handleClick}>Finish</Button>
                    </div>) : (<div style={{display: "flex", justifyContent: "center"}}>
                        <Button variant="danger" onClick={handleClick}>Next</Button>
                    </div>)}
                </Row>
                <Row>
                    <Col>
                        <div>
                            <br/>
                            <br/>
                            <h6 className="text-center">Version: 1.0 - 04/10/2023</h6>
                        </div>
                    </Col>
                </Row>
            </Container>
        <div className='footer'>
            <Filler/>
        </div>
        </div>
    )
}

export default QuestionPage;