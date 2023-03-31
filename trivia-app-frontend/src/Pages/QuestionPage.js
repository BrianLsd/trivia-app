import Filler from '../Components/Filler'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Button} from 'react-bootstrap';

function QuestionPage (props) {
    const handleClick = () => {

    }

    return (
        <div className='background'>
        <Filler/>
            <Container style={{justifyContent: "center"}}>
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