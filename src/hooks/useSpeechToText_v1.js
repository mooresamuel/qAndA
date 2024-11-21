import { useEffect, useRef, useState } from "react";
import { wordScoresAPI } from "../services/wordScoresApi";

export function useSpeechToText(text) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [result, setResult] = useState("");
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
      console.log("Requesting microphone access...");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
        },
      });
      console.log("Microphone access granted");

      mediaStreamRef.current = stream;

      // Check available MIME types
      const mimeType = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : MediaRecorder.isTypeSupported("audio/mp4")
        ? "audio/mp4"
        : "audio/ogg";

      console.log("Using MIME type:", mimeType);

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: mimeType,
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        console.log("Data available:", event.data.size, "bytes");
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstart = () => {
        console.log("Recording started");
        audioChunksRef.current = [];
      };

      mediaRecorderRef.current.onstop = async () => {
        console.log("Recording stopped, processing chunks...");
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        console.log("Created blob of size:", audioBlob.size, "bytes");

        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
        }

        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        await sendRecording(url);

        if (audioElementRef.current) {
          audioElementRef.current.load();
        }
      };

      mediaRecorderRef.current.onerror = (event) => {
        console.error("MediaRecorder error:", event.error);
        setError("Recording error: " + event.error.message);
      };

      setIsStreamReady(true);
      setError(null);
    } catch (error) {
      console.error("Error initializing audio stream:", error);
      setError("Error accessing microphone: " + error.message);
      setIsStreamReady(false);
    }
  };

  const cleanupAudioStream = () => {
    console.log("Cleaning up audio stream...");
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => {
        track.stop();
        console.log("Track stopped:", track.kind);
      });
    }
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setIsStreamReady(false);
    setAudioUrl(null);
    setIsRecording(false);
    console.log("Cleanup complete");
  };

  const startRecording = async () => {
    try {
      if (!isStreamReady) {
        await initAudioStream();
      }

      if (
        !mediaRecorderRef.current ||
        mediaRecorderRef.current.state === "inactive"
      ) {
        console.log("Starting recording...");
        audioChunksRef.current = [];
        mediaRecorderRef.current.start(1000); // Collect data every second
        setIsRecording(true);
        setError(null);
      }
    } catch (error) {
      console.error("Error starting recording:", error);
      setError("Error starting recording: " + error.message);
    }
  };

  const stopRecording = async () => {
    try {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        console.log("Stopping recording...");
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    } catch (error) {
      console.error("Error stopping recording:", error);
      setError("Error stopping recording: " + error.message);
    }
  };

  const sendRecording = async (url) => {
    if (!audioUrl && !url) {
      // || !phrase) {
      setError("Please record audio and enter a phrase first");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(audioUrl || url);
      const audioBlob = await response.blob();
      console.log("Sending blob of size:", audioBlob.size, "bytes");

      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");
      formData.append("phrase", text);
      console.log("recording being sent");
      const data = await wordScoresAPI(formData);
      setResult(data);
      console.log("Result:", data);
      setError(null);
    } catch (error) {
      console.error("Error sending recording:", error);
      setError("Error sending recording: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isRecording,
    isLoading,
    audioUrl,
    result,
    error,
    startRecording,
    stopRecording,
    sendRecording,
  };
}
