import React, { useState, useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import { Mic, MicOff, Activity } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons/faMicrophone'
import './AudioTranscription.css'; 


const VoiceRecorder = ({isWaiting, setIsWaiting, source, question, setQuestion}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const [chat, setChat] = useState([]);
  const socketRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const transcriptRef = useRef(transcript);
  const questionRef = useRef(question);


  const updateTranscript = useCallback((data) => {
    setTranscript((prev) => {
      const newTranscription = data.transcript.trim();
      // console.log('newTranscription:', newTranscription);
      if (newTranscription === '') {
        return prev;
      }
      transcriptRef.current = newTranscription;
      return newTranscription + " ";  
    });
    // console.log('trasncriptref  :', transcriptRef.current);
    // console.log('transcript:', transcript);
  }, []);

  useEffect(() => {
    transcriptRef.current = transcript;
  }, [transcript]);
  
  useEffect(() => {
    questionRef.current = question;
  }, [question]);

  useEffect(() => {
    // Connect to WebSocket server
    socketRef.current = io(source);

    socketRef.current.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to server');
    });

    let ignore = false;
    socketRef.current.on('timeout', (data) => {
      console.log('timeout event received:');
      if (ignore) {
        console.log('Ignoring timeout event');
        return;
      }
      ignore = true;
      setIsRecording(e => false);
      setIsWaiting(e => true);
      sendData();
      setTimeout(() => {
        ignore = false;
      }, 5000);
    });

    socketRef.current.on('transcription', (data) => {
      updateTranscript(data);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [updateTranscript]);

  const sendData = useCallback (() => {
    setChat(prevChat => {
      const newChat = [...prevChat];
      // setChat(chat => {
      //   const newChat = [...chat];
        newChat.push({ user: 'assistant', message: questionRef.current });
      //   return newChat;
      // });
      newChat.push({ user: 'user', message: transcriptRef.current });
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
      // if (transcript && transcript.length > 0) {
      // console.log('transcriptref current:', transcriptRef.current);
      // console.log('newChat:', newChat);
        fetchResponse(newChat, transcriptRef.current);
      // }
      return newChat;
    });
  }, [transcript, transcriptRef, chat]);

  const fetchResponse = useCallback((newChat, finalTranscript) => {
    console.log('final transcript:', finalTranscript);
    console.log('newChat:', newChat);
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

    // Get the text fields
    setQuestion(data.message);
    // console.log('Response data:', data);
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
    //   setIsListening(false);
    }
  })
    .catch(error => {
      console.error('Error:', error);
    });
  });

  const startRecording = async () => {
    setIsRecording(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Set up audio analysis
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      // Configure analyzer
      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      // Set up MediaRecorder with specific MIME type
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0 && socketRef.current) {
          // Convert blob to base64 and send to server
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result.split(',')[1];
            socketRef.current.emit('audio_chunk', { audio: base64data });
          };
          reader.readAsDataURL(event.data);
        }
      };

      // Start recording with small time slices 
      mediaRecorderRef.current.start(100); // Send data every 100ms

      // setTranscript(''); // Clear previous transcript
      // Notify server to start stream
      socketRef.current.emit('start_audio_stream');

      // Start audio level monitoring
      const checkAudioLevel = () => {
        analyserRef.current.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / bufferLength;
        setAudioLevel(average);
        animationFrameRef.current = requestAnimationFrame(checkAudioLevel);
      };
      
      checkAudioLevel();

    } catch (err) {
      console.error('Error accessing microphone:', err);
      setIsRecording(false);
      setIsWaiting(false);
    }
  };


const stopRecording = (transcript) => {
  // Prevent duplicate calls with same transcript
  setIsRecording(false);
  if (!transcript || transcript.length === 0) {
    return;
  }
  setIsWaiting(true);
  // if (lastTranscript === transcript) {
  //   console.log('Duplicate transcript detected, stopping');
  //   setIsWaiting(false);
  //   return;
  // }
  
  // If already stopping, return immediately
  // if (ignore || isStoppingInProgress) {
  //   console.log('Already stopping, ignoring call');
  //   return;
  // }
  
  console.log('Starting stop recording process');
  // isStoppingInProgress = true;
  // lastTranscript = transcript;
  // setIgnore(true);

  try {
    // if (!audioContextRef.current) {
    //     setIsWaiting(false);
    //   return;
    // }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    setAudioLevel(0);
    // console.log('transcript:', transcript);
    if (transcript && transcript.length > 0) {
      // Use a local variable to prevent closure issues
      const currentTranscript = transcript;
      
      setChat(prevChat => {
        // // Check if this transcript was already added
        // const isDuplicate = prevChat.some(
        //   msg => msg.user === 'user' && msg.message === currentTranscript
        // );
        
        // if (isDuplicate) {
        //   console.log('Transcript already in chat, skipping');
        //   setIsWaiting(false);

        //   return prevChat;
        // }

        const newChat = [...prevChat];
        newChat.push({ user: 'user', message: currentTranscript });
        
        // Move fetchResponse outside of setState to prevent multiple calls
        // setTimeout(() => {
          fetchResponse(newChat, currentTranscript);
        // }, 0);
        
        return newChat;
      });
    }
    setIsWaiting(false);

    socketRef.current.emit('stop_audio_stream');
  } finally {
    // Reset the flags after a short delay
    // setTimeout(() => {
    //   isStoppingInProgress = false;
    //   lastTranscript = null;
    // }, 5100);
  }
};

//   const toggleListening = useCallback(() => {

//     if (isRecording) {
//     //   recognition.stop();
//         stopRecording();
//     } else {
//         setError('');
//       try {
//         // recognition.start();
//         startRecording();
//         // setIsRecording(true);
//     }   catch (err) {
//         console.error('Error starting recording:', err);
//         setError('Error accessing microphone. Please check your browser settings.');
//       }
//     }
//   }, [isRecording, setIsRecording]);

    return (
    <div className="voice-input">
      {error && (<div className="error-div">{error}</div>)}
      {!error && (<div className="speech-box">
        <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
          {transcript || ''}
        </p>
      </div>)}
    <button onClick={startRecording} disabled={isWaiting}  color={isRecording ? '#4CAF50' : '#4CAF50'} className="microphone">
      {!isRecording && !isWaiting && (<FontAwesomeIcon className="" color='#3A9F50' icon={faMicrophone} height="100%" />)}
      {isRecording && (<FontAwesomeIcon className="pulsing" color='#3A9F50' icon={faMicrophone} height="100%" />)}
      {isWaiting && (<div className="spinner-border spinner-border-sm text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>)}
    </button>
    </div>
  );
};

export default VoiceRecorder;