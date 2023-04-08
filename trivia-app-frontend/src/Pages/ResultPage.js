import Filler from '../Components/Filler'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Button} from 'react-bootstrap';
import {useContext} from 'react';
import {TriviaContext} from '../Components/Contexts';
import Card from 'react-bootstrap/Card';


function ResultPage () {
    const {setGameState, currentPlayerName} = useContext(TriviaContext);
    const storedMapString = localStorage.getItem(currentPlayerName);
    const storedMap = new Map(Object.entries(JSON.parse(storedMapString)));

    const name = currentPlayerName;
    const timesPlayed = storedMap.get("times played");
    const totalScore = storedMap.get("total score");
    const timesOfTen = storedMap.get("times of 10/10");
    const latestScore = storedMap.get("lastest score");
    const averageScore = Math.round(totalScore / timesPlayed * 100) / 100;


    const handleClick = () => {
        setGameState('home');
    }

    return (
        <div className='background'>
        <Filler/>
            <Container style={{justifyContent: "center"}}>
                <Row className="justify-content-center" style={{padding:30}}>
                <Card style={{ width: '60%', backgroundColor:'lightyellow', fontWeight:'bold', padding:30}}>
                    <Card.Body>
                        <Card.Title className='text-center' style={{padding:10, fontSize:30}}>See you tomorrow!</Card.Title>
                        <Card.Text className='text-center' style={{color:'Tomato', fontSize:20}}>◆ Name: {name}</Card.Text>
                        <Card.Text className='text-center' style={{color:'Tomato', fontSize:20}}>◆ Your Score: {latestScore}/10</Card.Text>
                        <Card.Text className='text-center' style={{color:'Tomato', fontSize:20}}>◆ Average Score: {averageScore}/10</Card.Text>
                        <Card.Text className='text-center' style={{color:'Tomato', fontSize:20}}>◆ Times Played: {timesPlayed}</Card.Text>
                        <Card.Text className='text-center' style={{color:'Tomato', fontSize:20}}>◆ Times of 10/10: {timesOfTen}</Card.Text>
                    </Card.Body>
                </Card>
                </Row>
                <Row>
                    <div style={{ display: "flex", justifyContent: "center", padding:30}}>
                        <Button variant="danger" onClick={handleClick}>Exit</Button>
                    </div>
                </Row>
                <Row>
                    <div>
                        <br/>
                        <br/>
                        <h6 className="text-center">Version: 1.0 - 04/10/2023</h6>
                    </div>
                </Row>
            </Container>
        <div className='footer'>
            <Filler/>
        </div>
        </div>
    )
}

export default ResultPage;