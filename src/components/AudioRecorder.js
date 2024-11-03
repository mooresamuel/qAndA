import React, { useState, useRef } from 'react';
import { Mic, Square, Send } from 'lucide-react';
import './AudioRecorder.css';

const AudioRecorder = ({source}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [phrase, setPhrase] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          channelCount: 1,
          sampleRate: 16000,
        } 
      });
      
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm;codecs=opus' });
        setAudioBlob(blob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Error accessing microphone. Please ensure you have granted permission.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const sendRecording = async () => {
    if (!audioBlob || !phrase) {
      alert('Please record audio and enter a phrase first');
      return;
    }

    setIsLoading(true);
    try {
      // Create FormData and append the blob directly
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');
      formData.append('phrase', phrase);

      const response = await fetch(`${source}get_word`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error sending recording:', error);
      alert('Error sending recording. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="input-form">
      <div className="margin-bottom">
        <label htmlFor="phrase" className="input-form-label">
          Enter Word Hint
        </label>
        <input
          id="phrase"
          type="text"
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          className="input-form-input"
          placeholder="Enter the word to record..."
        />
      </div>

      <div className="sound-buttons">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="start"
            disabled={isLoading}
          >
            <Mic size={20} />
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="stop-recording"
          >
            <Square size={20} />
            Stop Recording
          </button>
        )}

        <button
          onClick={sendRecording}
          className="send-recording"
          disabled={!audioBlob || isLoading}
        >
          <Send size={20} />
          {isLoading ? 'Sending...' : 'Send Recording'}
        </button>
      </div>

      {audioBlob && (
        <div className="mb-4">
          <audio controls src={URL.createObjectURL(audioBlob)} className="play-recording" />
        </div>
      )}

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-medium mb-2">Result:</h3>
          <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;