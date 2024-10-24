import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import TextReader from './components/TextReader';
import AudioTranscription from './components/AudioTranscription';
import { useEffect, useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons/faBookOpen'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'

function MainScreen() {
  const [question, setQuestion] = useState('');
  const [init, setInit] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    setInit(true);
  }, []);
  return (
    <div className="main-screen">
      <AudioTranscription setQuestion={setQuestion} 
                                isWaiting={isWaiting}
                                setIsWaiting={setIsWaiting}/>
      <TextReader init={init} question={question} 
                                isWaiting={isWaiting}
                                setIsWaiting={setIsWaiting}/>
    </div>
  );
}

function App() {
  return (
    <div className="bground">
      <Router>
        <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <Navbar bg="light-bg-subtle" variant="dark" className="navbar-top">
                <Navbar.Brand href="#home"><FontAwesomeIcon icon={faBookOpen} /> Turning Pages </Navbar.Brand>
                <Nav className="ms-auto">
                  <Nav.Link href="#pricing"><FontAwesomeIcon icon={faBars} /></Nav.Link>
                </Nav>
            </Navbar>
          </Col>  
          <Col  md={2}></Col>
        </Row>  
          <Row>
          <Col sam={1} md={3}></Col>
          <Col sam={10} md={6}>
            <MainScreen />

            </Col>
          <Col sm={1} md={3}></Col>
          </Row>
        </Container>
      </Router>
    </div>
  );
}

export default App;
