import Filler from '../Components/Filler'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import {Container, Row, Button} from 'react-bootstrap';

function QuestionPage (props) {
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
            props.setGameState('result');
        } else {
            if (optionChosen === questions.data[currentQuestion].answer){
                setCurrentQuestion(currentQuestion + 1);
            }
            setCurrentQuestion(currentQuestion + 1);
        }
    }

    return (
        <div className='background'>
        <Filler/>
            <Container style={{justifyContent: "center"}}>
                <Row>
                    <h1>Today's category is "{questions.category}"</h1>
                </Row>
                <Row>
                    <h3>{questions.data[currentQuestion].question}</h3>
                </Row>
                <Row>
                    <Button onClick={() => setOptionChosen("A")}>{questions.data[currentQuestion].optionA}</Button>
                </Row>
                <Row>  
                    <Button onClick={() => setOptionChosen("B")}>{questions.data[currentQuestion].optionB}</Button>
                </Row>
                <Row>        
                    <Button onClick={() => setOptionChosen("C")}>{questions.data[currentQuestion].optionC}</Button>
                </Row>
                <Row>    
                    <Button onClick={() => setOptionChosen("D")}>{questions.data[currentQuestion].optionD}</Button>
                </Row>  
                <Row>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button variant="danger" onClick={handleClick}>Next</Button>
                    </div>
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