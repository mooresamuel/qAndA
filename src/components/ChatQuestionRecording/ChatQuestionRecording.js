import { SendHorizontal, X } from "lucide-react";
import { useState } from "react";
import ChatStreamingAudioTranscription from "../ChatStreamingAudioTranscription/ChatStreamingAudioTranscription";
import ChatControlButton from "../ChatControlButton/ChatControlButton";
import { useExerciseData } from "../../Contexts/ExerciseContext";
import SpokenText from "../SpokenText/SpokenText";

function ChatQuestionRecording({ onSend, disabled }) {
  const [transcript, setTranscript] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const { usedAiInExercise } = useExerciseData();

  function handleSend() {
    usedAiInExercise.current = true;
    onSend(transcript);
    setTranscript("");
  }

  return (
    <div className="min-h-40 py-4 flex flex-col gap-3 items-center justify-center">
      {transcript ? (
        <p className="indent-5 m-0 w-full text-start font-semibold px-2 bg-white py-2">
          {transcript}
        </p>
      ) : (
        <SpokenText
          containerClass={"items-center text-lg"}
          text={"record a message for help"}
        />
      )}
      <div className="flex gap-3">
        {transcript && !isWaiting && (
          <ChatControlButton
            disabled={disabled}
            onClick={() => setTranscript("")}
          >
            <X />
          </ChatControlButton>
        )}
        <ChatStreamingAudioTranscription
          disabled={disabled}
          transcript={transcript}
          setTranscript={setTranscript}
          isWaiting={isWaiting}
          setIsWaiting={setIsWaiting}
        />
        {transcript && !isWaiting && (
          <ChatControlButton disabled={disabled} onClick={handleSend}>
            {" "}
            <SendHorizontal />
          </ChatControlButton>
        )}
      </div>
    </div>
  );
}

export default ChatQuestionRecording;
