import Card from 'react-bootstrap/Card';

function Filler() {
    return (
        <Card style={{backgroundColor: 'orange', height: '50%'}}>
            <Card.Body></Card.Body>
            <Card.Body></Card.Body>
        </Card>
    );
}

export default Filler;