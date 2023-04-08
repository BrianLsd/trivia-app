import Filler from '../Components/Filler'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Form, InputGroup, Button, Alert} from 'react-bootstrap';
import {useState, useRef, useContext} from "react";
import logo from '../trivia-logo.svg';
import {TriviaContext} from '../Components/Contexts';

function HomePage(){
    const {setGameState, setCurrentPlayerName} = useContext(TriviaContext);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const nameRef = useRef();

    const handleClick = () => {
        let playerName = nameRef.current.value.trim();
        setCurrentPlayerName(playerName);
        if (playerName !== ''){
            if (localStorage.getItem(playerName) !== null){ // existing player
                const storedMapString = localStorage.getItem(playerName);
                const storedMap = new Map(Object.entries(JSON.parse(storedMapString)));
                if ((new Date() - new Date(storedMap.get("lastPlayed"))) / (1000 * 60 * 60 * 24) >= 1) {
                    // able to play
                    storedMap.set("lastPlayed", new Date()) // update the login time
                    const mapObject = Object.fromEntries(storedMap.entries());
                    localStorage.setItem(playerName, JSON.stringify(mapObject));
                    setGameState('question');
                } else {
                    // unable to play
                    setShowAlert(true);
                    setAlertMessage('You can only play once a day');
                }
            } else { // new player
                const mapTobeStored = new Map();
                mapTobeStored.set("lastPlayed", new Date());
                const mapObject = Object.fromEntries(mapTobeStored.entries());
                localStorage.setItem(playerName, JSON.stringify(mapObject));
                setGameState('question');
            }
        } else {
            setShowAlert(true);
            setAlertMessage('You must enter your name to play');
        }
    }

    return (
    <div className='background'>
    <Filler/>
        <Container style={{justifyContent: "center"}}>
            <Row>
                <h1 className="text-center rainbow">Welcome to Pure Trivia</h1>
            </Row>
            <Row>
                <h3 className="text-center" style={{fontFamily:'Courier New'}}>"Let's see how many questions you can get right!"</h3>
            </Row>
            <Row>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <img src={logo} className="logo" alt="logo" />
                </div>
            </Row>
            <Row>
                <div className="d-flex justify-content-center">
                    <InputGroup className="mb-3" style={{ width: '30%'}}>
                        <InputGroup.Text id="basic-addon1">Your Name</InputGroup.Text>
                        <Form.Control
                        placeholder="Name"
                        aria-label="Name"
                        aria-describedby="basic-addon1"
                        ref={nameRef}
                        />
                    </InputGroup>
                </div>
            </Row>
            <Row>
                <div style={{ display: "flex", justifyContent: "center", paddingBottom: "20px"}}>
                    <Button variant="danger" onClick={handleClick}>Gooo!</Button>
                </div>
            </Row>
            <Row>
                {showAlert && <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                <Alert.Heading>Oops!</Alert.Heading>
                <p>
                    {alertMessage}
                </p>
                </Alert>}
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
    );
}

export default HomePage;