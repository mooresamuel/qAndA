import { Spinner } from "react-bootstrap";
import { useSendAudioChat } from "../../hooks/useSendAudioChat";
import { Mic, Octagon } from "lucide-react";
import { useState } from "react";
import ChatStreamingAudioTranscription from "../ChatStreamingAudioTranscription/ChatStreamingAudioTranscription";
import ChatSendButton from "../ChatSendButton/ChatSendButton";

function ChatQuestionRecording(onSend) {
  const [message, setMessage] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);

  return (
    <div className="min-h-24 py-4 flex flex-col items-center justify-center">
      <p className="indent-5 m-0 w-full text-start font-semibold px-2">
        {message}
      </p>

      <div className="flex gap-3">
        <ChatStreamingAudioTranscription
          question={message}
          setQuestion={setMessage}
          isWaiting={isWaiting}
          setIsWaiting={setIsWaiting}
        />
        {message && <ChatSendButton onClick={() => onSend(message)} />}
      </div>
    </div>
  );
}

export default ChatQuestionRecording;
