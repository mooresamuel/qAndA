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
  const [isWaiting, setIsWaiting] = useState(false);
  const [chat, setChat] = useState([]);
  const [userQuestion, setUserQuestion] = useState('');
  const [synth] = useState(window.speechSynthesis);
  const [selectedVoice, setSelectedVoice] = useState(null);

  // useEffect(() => {
  //   const loadVoices = () => {
  //     const availableVoices = synth.getVoices();
      
  //     if (!selectedVoice && availableVoices.length > 0) {
  //       const defaultVoice = availableVoices.find(
  //         voice => voice.voiceURI === 'Google UK English Female'
  //       ) || availableVoices[0];        
  //       setSelectedVoice(defaultVoice);
  //       console.log('Default voice set to:', defaultVoice.name);
  //     }
  //   };
  //   loadVoices();
  //   synth.addEventListener('voiceschanged', loadVoices);
  //   synth.cancel();

  //   return () => {
  //     synth.removeEventListener('voiceschanged', loadVoices);
  //   };
  // }, []);

  // Debug effect to monitor selectedVoice changes
  // useEffect(() => {
  //   if (selectedVoice) {
  //     console.log('Selected voice updated:', selectedVoice.name);
  //   }
  // }, [question]);

  // const closeEverything = () => {
  //   if (synth) {
  //     synth.cancel();
  //     console.log('Speech synthesis canceled');
  //   }
  //   // setIsPlaying(false);
  //   // setIsWaiting(false);
  //   // setIsInitialized(false);
  //   // setIsButtonVisible(true);
  //   // setUserQuestion('');
  //   // setChat([]);
  // };

  return (
    <div className="main-screen">

      <TextReader               question={question} 
                                isWaiting={isWaiting}
                                setIsWaiting={setIsWaiting}
                                chat={chat}
                                setChat={setChat}
                                userQuestion={userQuestion}
                                setUserQuestion={setUserQuestion}
                                synth={synth}
                                selectedVoice={selectedVoice}
                                setQuestion={setQuestion}
                                />
      <AudioTranscription setQuestion={setQuestion} 
                                isWaiting={isWaiting}
                                setIsWaiting={setIsWaiting}
                                chat={chat}
                                setChat={setChat}
                                setUserQuestion={setUserQuestion}
                                synth={synth}/>
      {/* <button onClick={closeEverything}>Close Everything</button> */}

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
