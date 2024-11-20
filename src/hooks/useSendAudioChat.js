import { useEffect, useState } from "react";
import { useRecordAudio } from "./useRecordAudio";

export function useSendAudioChat() {
  const { isRecording, audioUrl, startRecording, stopRecording } =
    useRecordAudio();
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(
    function () {
      async function action() {
        //call function that sends audio
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

      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      //   const data = await AIChatApi(formData);
      //   setResponses(data);
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
    startRecording,
    stopRecording,
    responses,
    error,
    isLoading,
  };
}
