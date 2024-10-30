import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import TextReader from './components/TextReader';
import VoiceRecorder from './components/VoiceRecorder';
import WordHelper from './components/WordHelper';
import { useCallback, useEffect, useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons/faBookOpen'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'

function MainScreen() {
  const [question, setQuestion] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);
  const [chat, setChat] = useState([]);
  
    // const source = 'http://35.214.34.183:5000/';
    //   const source = 'http://35.214.34.183:5000/';
      // const source = 'http://34.147.246.152:5000/';
      // const source = 'http://34.147.246.152:5000/';

    // const source = 'wss://34.173.135.229:5000/';
    // const source = 'https://samalmoore1.eu.pythonanywhere.com:5000/';
  // const source = 'http://127.0.0.1:5000/'
  const source = '://35.214.34.183:5000/'


  const speakText = useCallback((message) => {
    console.log('Speaking text:', message);
    fetch(`http${source}speak_text`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'message': message
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Response data:', data);
          const audioData = data.audio;
          const audioBlob = new Blob([Uint8Array.from(atob(audioData), c => c.charCodeAt(0))], { type: 'audio/mp3' });
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          audio.play();
          audio.onended = () => {
          setIsWaiting(false);
          }
    })
    .catch(error => {
      console.error('Error:', error);
    }
    );
  }, [setIsWaiting]);

  return (
    <div className="main-screen">

      {/* <WordHelper source={source}/> */}
       <TextReader               setIsWaiting={setIsWaiting}
                                chat={chat}
                                setChat={setChat}
                                question={question}
                                setQuestion={setQuestion}
                                speakText={speakText}
                                />
       {/* <AudioTranscription setQuestion={setQuestion} 
                                isWaiting={isWaiting}
                                setIsWaiting={setIsWaiting}
                                chat={chat}
                                setChat={setChat}
                                setUserQuestion={setUserQuestion}
                                synth={synth}/>  */}
      {/* <SpeechToText setQuestion={setQuestion}/> */}
      <VoiceRecorder isWaiting={isWaiting} setIsWaiting={setIsWaiting}
                      source={source}
                      question={question}
                      setQuestion={setQuestion}/> 
       
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
