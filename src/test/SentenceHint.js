import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Send } from 'lucide-react';
import WordResults from '../components/WordResults';
import '../components/WordScores.css'
const WordHint = ({source}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [phrase, setPhrase] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreamReady, setIsStreamReady] = useState(false);
  const [error, setError] = useState(null);
  
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioElementRef = useRef(null);

  useEffect(() => {
    initAudioStream();
    return () => {
      cleanupAudioStream();
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, []);

  const initAudioStream = async () => {
    try {
      console.log('Requesting microphone access...');
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
        }
      });
      console.log('Microphone access granted');
      
      mediaStreamRef.current = stream;

      // Check available MIME types
      const mimeType = MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : MediaRecorder.isTypeSupported('audio/mp4')
          ? 'audio/mp4'
          : 'audio/ogg';
      
      console.log('Using MIME type:', mimeType);

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: mimeType
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        console.log('Data available:', event.data.size, 'bytes');
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstart = () => {
        console.log('Recording started');
        audioChunksRef.current = [];
      };

      mediaRecorderRef.current.onstop = () => {
        console.log('Recording stopped, processing chunks...');
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        console.log('Created blob of size:', audioBlob.size, 'bytes');
        
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
        }
        
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        if (audioElementRef.current) {
          audioElementRef.current.load();
        }
      };

      mediaRecorderRef.current.onerror = (event) => {
        console.error('MediaRecorder error:', event.error);
        setError('Recording error: ' + event.error.message);
      };

      setIsStreamReady(true);
      setError(null);
    } catch (error) {
      console.error('Error initializing audio stream:', error);
      setError('Error accessing microphone: ' + error.message);
      setIsStreamReady(false);
    }
  };

  const cleanupAudioStream = () => {
    console.log('Cleaning up audio stream...');
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => {
        track.stop();
        console.log('Track stopped:', track.kind);
      });
    }
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setIsStreamReady(false);
    setAudioUrl(null);
    setIsRecording(false);
    console.log('Cleanup complete');
  };

  const startRecording = async () => {
    try {
      if (!isStreamReady) {
        await initAudioStream();
      }

      if (!mediaRecorderRef.current || mediaRecorderRef.current.state === 'inactive') {
        console.log('Starting recording...');
        audioChunksRef.current = [];
        mediaRecorderRef.current.start(1000); // Collect data every second
        setIsRecording(true);
        setError(null);
      }
    } catch (error) {
      console.error('Error starting recording:', error);
      setError('Error starting recording: ' + error.message);
    }
  };

  const stopRecording = () => {
    try {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        console.log('Stopping recording...');
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    } catch (error) {
      console.error('Error stopping recording:', error);
      setError('Error stopping recording: ' + error.message);
    }
  };

  const sendRecording = async () => {
    if (!audioUrl || !phrase) {
      setError('Please record audio and enter a phrase first');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(audioUrl);
      const audioBlob = await response.blob();
      console.log('Sending blob of size:', audioBlob.size, 'bytes');

      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');
      formData.append('phrase', phrase);

      const apiResponse = await fetch(`${source}get_sentence`, {
        method: 'POST',
        body: formData
      });

      if (!apiResponse.ok) {
        throw new Error(`Server responded with ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      setResult(data);
      setError(null);
    } catch (error) {
      console.error('Error sending recording:', error);
      setError('Error sending recording: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="phrase" className="block text-sm font-medium mb-2">
          Enter Word Hint
        </label>
        <textArea
          id="phrase"
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter the word to record..."
        />
      </div>

      <div className="audio-recorder">
      <div className="button-group">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className={`record-button ${isLoading ? 'disabled' : ''}`}
            disabled={isLoading}
          >
            <Mic size={20} />
            <span>{isStreamReady ? 'Start Recording' : 'Initializing...'}</span>
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="stop-button"
          >
            <Square size={20} />
            <span>Stop Recording</span>
          </button>
        )}

        <button
          onClick={sendRecording}
          className={`send-button ${(!audioUrl || isLoading) ? 'disabled' : ''}`}
          disabled={!audioUrl || isLoading}
        >
          <Send size={20} />
          <span>{isLoading ? 'Sending...' : 'Send Recording'}</span>
        </button>
      </div>

      {/* {audioUrl && (
        <div className="audio-player">
          <audio 
            ref={audioElementRef}
            controls 
            src={audioUrl} 
            preload="metadata"
          />
        </div>
      )} */}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {result && <WordResults result={result} />}

      {!isStreamReady && !error && (
        <div className="stream-status">
          Initializing audio stream...
        </div>
      )}
    </div>
    </div>
  );
};

export default WordHint;