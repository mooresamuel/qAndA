import { useEffect, useRef, useState } from "react";
import { wordScoresAPI } from "../services/wordScoresApi";
import { useRecordAudio } from "./useRecordAudio";

export function useSpeechToText(text) {
  const {
    isRecording,
    audioUrl,
    startRecording: startRec,
    stopRecording,
  } = useRecordAudio();
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(
    function () {
      async function action() {
        await sendRecording();
      }

      action();
    },
    [audioUrl]
  );

  const sendRecording = async () => {
    if (!audioUrl) {
      // || !phrase) {
      setError("Please record audio and enter a phrase first");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(audioUrl);
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

  const startRecording = async () => {
    setResult("");
    await startRec();
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
