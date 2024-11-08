import { useState } from "react";
import { textToSpeechAPI } from "../services/text2SpeechAPI";

export default function useTextToSpeech() {
  const [isLoading, setIsLoading] = useState(false);

  async function speak(text) {
    setIsLoading(true);
    const audioData = await textToSpeechAPI(text);
    console.log(audioData);
    const audioBlob = new Blob(
      [Uint8Array.from(atob(audioData), (c) => c.charCodeAt(0))],
      { type: "audio/mp3" }
    );
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
    setIsLoading(false);
  }

  return { isLoading, speak };
}
