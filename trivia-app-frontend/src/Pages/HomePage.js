import Filler from '../Components/Filler'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import logo from '../trivia-logo.svg';

const HomePage = () => {
    return (
    <div className='background'>
    <Filler/>
        <Container style={{justifyContent: "center"}}>
            <Row>
                <h1 className="text-center">Welcome to Pure Trivia</h1>
            </Row>
            <Row>
                <h3 className="text-center">Let's see how many questions you can get right!</h3>
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
                        />
                    </InputGroup>
                </div>
            </Row>
            <Row>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="danger">Gooo !</Button>
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
    );
}

export default HomePage;