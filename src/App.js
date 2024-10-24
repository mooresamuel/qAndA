import logo from './logo.svg';
import './App.css';
// import ReadingAssistant from './components/assistant';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import TextReader from './components/TextReader';
import SimpleAudioTranscription from './components/SimpleAudioTranscription';
import { useEffect, useState } from 'react';

function MainScreen() {
  const [question, setQuestion] = useState('');
  const [init, setInit] = useState(false);

  useEffect(() => {
    setInit(true);
  }, []);
  return (
    <div className="main-screen">
      <SimpleAudioTranscription setQuestion={setQuestion}/>
      <TextReader init={init} question={question}/>
    </div>
  );
}

function App() {
  return (
    <div className="bground">
      <Container>
      <Navbar bg="primary" className="navbar-top">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
      </Navbar>
        <Row>
        <Col sam={1} md={2}></Col>
        <Col sam={10} md={8}>
          <MainScreen />

          </Col>
        <Col sm={1} md={2}></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
