import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Send } from 'lucide-react';

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

      const apiResponse = await fetch(`${source}get_word`, {
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
        <input
          id="phrase"
          type="text"
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter the word to record..."
        />
      </div>

      <div className="flex gap-4 mb-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            <Mic size={20} />
            {isStreamReady ? 'Start Recording' : 'Initializing...'}
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            <Square size={20} />
            Stop Recording
          </button>
        )}

        <button
          onClick={sendRecording}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          disabled={!audioUrl || isLoading}
        >
          <Send size={20} />
          {isLoading ? 'Sending...' : 'Send Recording'}
        </button>
      </div>

      {audioUrl && (
        <div className="mb-4">
          <audio 
            ref={audioElementRef}
            controls 
            src={audioUrl} 
            className="w-full"
            preload="metadata"
          />
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-medium mb-2">Result:</h3>
          <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      {!isStreamReady && !error && (
        <div className="text-yellow-600 mt-2">
          Initializing audio stream...
        </div>
      )}
    </div>
  );
};

export default WordHint;