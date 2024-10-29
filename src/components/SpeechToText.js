import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const SOCKET_SERVER_URL =  "http://localhost:5000";

const SpeechToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [error, setError] = useState("");
  const socketRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  
  // Initialize socket connection
  useEffect(() => {
    const connectSocket = () => {
      socketRef.current = io(SOCKET_SERVER_URL, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: maxReconnectAttempts,
        reconnectionDelay: 1000,
        timeout: 10000,
      });

      socketRef.current.on("connect", () => {
        console.log("Connected to server");
        setIsConnected(true);
        setError("");
        reconnectAttempts.current = 0;
      });

      socketRef.current.on("disconnect", () => {
        console.log("Disconnected from server");
        setIsConnected(false);
        if (isRecording) {
          stopRecording();
        }
      });

      socketRef.current.on("connection_status", (data) => {
        console.log("Connection status:", data.status);
      });

      socketRef.current.on("stream_started", (data) => {
        console.log("Stream started:", data.status);
      });

      socketRef.current.on("stream_stopped", (data) => {
        console.log("Stream stopped:", data.status);
      });

      socketRef.current.on("transcription", (data) => {
        setTranscription((prev) => {
          const lastTranscription = prev.trim();
          const newTranscription = data.transcript.trim();
          return lastTranscription === newTranscription ? prev : data.transcript + " ";
        });
      });

      socketRef.current.on("error", (data) => {
        setError(data.message);
        if (isRecording) {
          stopRecording();
        }
      });

      socketRef.current.on("connect_error", (error) => {
        console.error("Connection error:", error);
        setError(`Connection error: ${error.message}`);
        reconnectAttempts.current += 1;
        
        if (reconnectAttempts.current >= maxReconnectAttempts) {
          setError("Maximum reconnection attempts reached. Please refresh the page.");
        }
      });
    };

    connectSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      if (!isConnected) {
        throw new Error("Not connected to server");
      }

      setError("");
      setIsRecording(true);
      setTranscription("");

      // Get audio stream
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        }
      });
      
      streamRef.current = stream;

      // Create and configure MediaRecorder
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      // Notify server to start listening
      socketRef.current.emit("start_audio_stream");

      // Handle audio data
      mediaRecorderRef.current.ondataavailable = async (event) => {
        if (event.data.size > 0 && socketRef.current?.connected) {
          const reader = new FileReader();
          reader.onload = () => {
            const base64Audio = reader.result.split(',')[1];
            socketRef.current.emit("audio_chunk", { audio: base64Audio });
          };
          reader.readAsDataURL(event.data);
        }
      };

      mediaRecorderRef.current.start(250); // Capture in 250ms chunks
    } catch (err) {
      setError(`Failed to start recording: ${err.message}`);
      setIsRecording(false);
      cleanup();
    }
  };

  const cleanup = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    streamRef.current = null;
    mediaRecorderRef.current = null;
  };

  const stopRecording = () => {
    setIsRecording(false);

    if (socketRef.current?.connected) {
      socketRef.current.emit("stop_audio_stream");
    }

    cleanup();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center space-y-6">
        <h1 className="text-2xl font-bold">Real-Time Speech-to-Text</h1>
        
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <div 
              className={`w-3 h-3 rounded-full ${
                isConnected ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
            <span className="text-sm text-gray-600">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>

          <button
            onClick={startRecording}
            disabled={isRecording || !isConnected}
            className={`px-4 py-2 rounded ${
              isRecording || !isConnected
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Start Recording
          </button>
          
          <button
            onClick={stopRecording}
            disabled={!isRecording}
            className={`px-4 py-2 rounded ${
              !isRecording 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            Stop Recording
          </button>
        </div>

        {error && (
          <div className="text-red-500 p-4 bg-red-50 rounded">
            {error}
          </div>
        )}

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Transcription:</h2>
          <div className="p-4 bg-gray-50 rounded min-h-[100px] text-left whitespace-pre-wrap">
            {transcription || "Start speaking to see transcription..."}
          </div>
        </div>
      </div>
    </div>
  )};
export default SpeechToText;