import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons/faMicrophone'
import './AudioTranscription.css';
import { findByDisplayValue } from '@testing-library/react';

const AudioTranscription = ({setQuestion, isWaiting, setIsWaiting, chat, setChat, setUserQuestion, speakText}) => {

  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');
  const [transcript, setTranscript] = useState('');
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [recognition] = useState(new (window.webkitSpeechRecognition || window.SpeechRecognition)());
  // const source = 'https://samalmoore1.eu.pythonanywhere.com/';
  const source = 'http://127.0.0.1:8001/'

  // useEffect(() => {
  //   if (window.SpeechRecognition || window.webkitSpeechRecognition) {
  //     recognition.continuous = true;
  //     recognition.interimResults = true;
  //     recognition.lang = 'en-UK';
  //   } else {
  //     setError('Speech recognition is not supported in this browser.');
  //   }

  //   return () => {
  //     if (recognition) {
  //       recognition.stop();
  //     }
  //   };
  // }, [recognition]);

  // recognition.onerror = (event) => {
  //   if (event.error === 'not-allowed') {
  //     setError('Please enable microphone access in your browser settings and refresh the page.');
  //   } else {
  //     setError(`Error: ${event.error}`);
  //   }
  //   setIsListening(false);
  // };

  const fetchResponse = useCallback((newChat, finalTranscript) => {
    fetch(`${source}answer_question`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'question': finalTranscript,
        'chat': newChat
      })
    })
    .then(response => response.json())
    .then(data => {
      // console.log('Response data:', data);
      setQuestion(data.message);
      recognition.stop();
      setChat(chat => {
        const newChat = [...chat];
        newChat.push({ user: 'assistant', message: data.message });
        return newChat;
      });
    // Get the text fields
    const textField1 = data.text_field_1;
    const textField2 = data.text_field_2;

    // Display the text fields (e.g., add them to the DOM)
    // document.getElementById('text1').innerText = textField1;
    // document.getElementById('text2').innerText = textField2;

    // Decode and play the audio
    const audioData = data.audio;
    const audioBlob = new Blob([Uint8Array.from(atob(audioData), c => c.charCodeAt(0))], { type: 'audio/mp3' });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
    audio.onended = () => {
      setIsWaiting(false);
      setIsListening(false);
    }
  })
    .catch(error => {
      console.error('Error:', error);
    });
  });

  // recognition.onresult = (event) => {
  //   if (!isListening) return;
  //   let finalTranscript = '';
  //   let interimTranscript = '';

  //   for (let i = event.resultIndex; i < event.results.length; i++) {
  //     const transcript = event.results[i][0].transcript;
  //     if (event.results[i].isFinal) {
  //       finalTranscript += transcript + ' ';
  //       if (finalTranscript === "")  {
  //         return;
  //       }
  //       if (debounceTimeout) {
  //         clearTimeout(debounceTimeout);
  //       }
  //       // Set a new debounce timeout
  //       const timeout = setTimeout(() => {
  //         setChat(chat => {
  //           const newChat = [...chat];
  //           newChat.push({ 'role': "user", 'message': finalTranscript });
  //           console.log('Updated chat:', newChat);
  //           fetchResponse(newChat, finalTranscript);
  //           return newChat;
  //         });
  //         console.log('transcript: ', finalTranscript);
  //         setIsWaiting(true);
  //         setIsListening(false);
  //       }, 1500); // Adjust the debounce delay as needed (500ms in this example)
  //       setDebounceTimeout(timeout);
  //     } else {
  //       interimTranscript += transcript;
  //     }
  //   }
  //   setTranscript((prev) => finalTranscript + interimTranscript);
  // };

  // useEffect(() => {
  //   if (window.SpeechRecognition || window.webkitSpeechRecognition) {
  //   } else {
  //     setError('Speech recognition is not supported in this browser.');
  //   }

  //   return () => {
  //     if (recognition) {
  //       recognition.stop();
  //     }
  //   };
  // }, []);

  // const toggleListening = useCallback(() => {
  //   if (!recognition) return;

  //   if (isListening) {
  //     recognition.stop();
  //     setIsListening(false);
  //     setIsWaiting(true);
  //   } else {
  //     setError('');
  //     try {
  //       recognition.start();
  //       setIsListening(true);
  //     } catch (err) {
  //       setError('Failed to start recording. Please refresh and try again.');
  //     }
  //   }
  // }, [isListening, recognition, setIsListening]);

  return (
    <div className="voice-input">
      {error && (<div className="error-div">{error}</div>)}
      {!error && (<div className="speech-box">
        <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
          {transcript || ''}
        </p>
      </div>)}
    <button onClick={toggleListening} disabled={isWaiting}  color={isListening ? '#4CAF50' : '#4CAF50'} className="microphone">
      {!isListening && !isWaiting && (<FontAwesomeIcon color='#3A9F50' icon={faMicrophone} height="100%" />)}
      {isListening && (<FontAwesomeIcon className="pulsing" color='#3A9F50' icon={faMicrophone} height="100%" />)}
      {isWaiting && (<div className="spinner-border spinner-border-sm text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>)}
    </button>
    </div>
  );
};

export default AudioTranscription;