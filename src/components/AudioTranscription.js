import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons/faMicrophone'
import './AudioTranscription.css';

const AudioTranscription = ({setQuestion, isWaiting, setIsWaiting, chat, setChat, setUserQuestion}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const [recognition, setRecognition] = useState(null);
  

// const source = 'https://samalmoore1.eu.pythonanywhere.com/';
  const source = 'http://127.0.0.1:8001/'
  
  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-UK';
      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
            recognitionInstance.stop();
            setChat(chat => {
              const newChat = [...chat];
              newChat.push({'role': "user", 'message': finalTranscript});
              console.log('Updated chat:', newChat);
              // Perform the fetch call inside the setState function to ensure it uses the updated state
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
                recognitionInstance.stop();
                console.log('Response data:', data);
                setQuestion(data['message']);
                setIsListening(false);
                setIsWaiting(true);
              })
              .catch(error => {
                console.error('Error:', error);
              });
              return newChat;
            });
            console.log('transcript: ', finalTranscript);

          } else {
            interimTranscript += transcript;
          }
        }
        setTranscript((prev) => finalTranscript + interimTranscript);
      };

      recognitionInstance.onerror = (event) => {
        if (event.error === 'not-allowed') {
          setError('Please enable microphone access in your browser settings and refresh the page.');
        } else {
          setError(`Error: ${event.error}`);
        }
        setIsListening(false);
      };
      setRecognition(recognitionInstance);
    } else {
      setError('Speech recognition is not supported in this browser.');
    }
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [recognition, setChat, setQuestion, setIsWaiting]);

  const toggleListening = useCallback(() => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setError('');
      try {
        recognition.start();
        setIsListening(true);
      } catch (err) {
        setError('Failed to start recording. Please refresh and try again.');
      }
    }
  }, [isListening, recognition]);

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