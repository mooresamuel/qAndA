// import "./App.css";
// import Layout from "./layouts/Layout";

// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// // import TextReader from './components/TextReader';
// // import NewVoiceRecorder from './components/NewVoiceRecorder';
// import WordHelper from "./components/WordHelper";
// // import WordHint from './components/WordHint';
// import WordScores from "./components/WordScores";
// import SentenceHint from "./test/SentenceHint";
// import { useState } from "react";
// import { Route, Routes } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBookOpen } from "@fortawesome/free-solid-svg-icons/faBookOpen";
// import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";

// function MainScreen() {
//   //   const [question, setQuestion] = useState('');
//   const [isWaiting, setIsWaiting] = useState(false);
//   //   const [chat, setChat] = useState([]);

//   // const source = 'https://samuelmoore.cc/'
//   const source = "http://127.0.0.1:5000/";

//   // const speakText = useCallback((message) => {
//   //   console.log('Speaking text:', message);
//   //   fetch(`${source}speak_text`, {
//   //     method: 'POST',
//   //     headers: {
//   //       'Accept': 'application/json',
//   //       'Content-Type': 'application/json'
//   //     },
//   //     body: JSON.stringify({
//   //       'message': message
//   //     })
//   //   })
//   //   .then(response => response.json())
//   //   .then(data => {
//   //     console.log('Response data:', data);
//   //         const audioData = data.audio;
//   //         const audioBlob = new Blob([Uint8Array.from(atob(audioData), c => c.charCodeAt(0))], { type: 'audio/mp3' });
//   //         const audioUrl = URL.createObjectURL(audioBlob);
//   //         const audio = new Audio(audioUrl);
//   //         audio.onended = () => {
//   //           setIsWaiting(false);
//   //           }
//   //         audio.play();

//   //     })
//   //     .catch(error => {
//   //       console.error('Error:', error);
//   //     }
//   //     );
//   //   }, [setIsWaiting]);

//   return (
//     <div className="main-screen">
//       {/* <WordHelper source={source}/>  */}
//       {/* <TextReader               setIsWaiting={setIsWaiting}
//                                 chat={chat}
//                                 setChat={setChat}
//                                 question={question}
//                                 setQuestion={setQuestion}
//                                 speakText={speakText}
//                                 /> */}
//       {/* <AudioTranscription setQuestion={setQuestion}
//                                 isWaiting={isWaiting}
//                                 setIsWaiting={setIsWaiting}
//                                 chat={chat}
//                                 setChat={setChat}
//                                 setUserQuestion={setUserQuestion}
//                                 synth={synth}/>  */}
//       {/* <SpeechToText setQuestion={setQuestion}/> */}
//       <SentenceHint source={source} />
//       {/* <WordScores source={source}/> */}
//       {/* <NewVoiceRecorder isWaiting={isWaiting} setIsWaiting={setIsWaiting}
//                       source={source}
//                       question={question}
//                       setQuestion={setQuestion}/>  */}

//       {/* <button onClick={closeEverything}>Close Everything</button> */}
//     </div>
//   );
// }

// // function App() {
// //   return (
// //     <div className="bground">
// //       <Router>
// //         <Container>
// //         <Row>
// //           <Col md={3}></Col>
// //           <Col md={6}>
// //             <Navbar bg="light-bg-subtle" variant="dark" className="navbar-top">
// //                 <Navbar.Brand href="#home"><FontAwesomeIcon icon={faBookOpen} /> Turning Pages </Navbar.Brand>
// //                 <Nav className="ms-auto">
// //                   <Nav.Link href="#pricing"><FontAwesomeIcon icon={faBars} /></Nav.Link>
// //                 </Nav>
// //             </Navbar>
// //           </Col>
// //           <Col  md={2}></Col>
// //         </Row>
// //           <Row>
// //           <Col sam={1} md={3}></Col>
// //           <Col sam={10} md={6}>
// //             <MainScreen />

// //             </Col>
// //           <Col sm={1} md={3}></Col>
// //           </Row>
// //         </Container>
// //       </Router>
// //     </div>
// //   );
// // }

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";

import HomePage from "./pages/HomePage";
import SelectCoachOrNot from "./pages/SelectCoachOrNot";
import Explain from "./pages/Explain";
import ExerciseEntryPoint from "./pages/ExerciseEntryPoint";
import ExerciseProvider from "./Contexts/ExerciseContext";
import GlobalProvider from "./Contexts/GlobalContext";
import QuestionCompleteWordLetters from "./components/QuestionCompleteWordLetters/QuestionCompleteWordLetters";

function App() {
  return (
    <GlobalProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/exercise/:exercise_id" element={<ExerciseProvider />}>
            <Route
              path="select-with-coach-or-not"
              element={<SelectCoachOrNot />}
            />
            <Route path="explain" element={<Explain />} />
            <Route path="steps/:step_number" element={<ExerciseEntryPoint />} />
          </Route>
        </Route>
      </Routes>
    </GlobalProvider>
  );
}

export default App;
