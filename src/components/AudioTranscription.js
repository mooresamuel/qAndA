import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons/faMicrophone'
import './AudioTranscription.css';

const AudioTranscription = ({setQuestion, isWaiting, setIsWaiting}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const [recognition, setRecognition] = useState(null);

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
            console.log('transcript: ', finalTranscript);
            recognitionInstance.stop();
            setIsListening(false);
            setIsWaiting(true);
            fetch(`https://samalmoore1.eu.pythonanywhere.com/answer_question`, {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  question: finalTranscript,
              })
            })
            .then(response => {
                const responseText = response.text();
                // return response.json();
                return responseText;
            })
            .then(data => {
                console.log('Response:', data);
                setQuestion(q => data);
            });
            return;
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
  }, []);

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
          {transcript || 'Ask the assistant a question...'}
        </p>
      </div>)}
    <button onClick={toggleListening} disabled={isWaiting}  color={isListening ? '#4CAF50' : '#4CAF50'} className="microphone">
      {!isListening && !isWaiting && (<FontAwesomeIcon color={isListening ? '#222' : '#3A9F50'} icon={faMicrophone} height="100%" />)}
      {isListening && (<div class="spinner-border spinner-border-sm text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>)}
      {isWaiting && (<div className="spinner-border spinner-border-sm text-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>)}
    </button>
    </div>
  );
};

export default AudioTranscription;