import { Mic, Octagon, X } from "lucide-react";
import { useSendAudioChat } from "../../hooks/useSendAudioChat";
import { Spinner } from "react-bootstrap";
import NewVoiceRecorder from "../NewVoiceRecorder";
import ChatQuestionRecording from "../ChatQuestionRecording/ChatQuestionRecording";

function ChatWindow({ onClose }) {
  const { isRecording, startRecording, stopRecording, isLoading } =
    useSendAudioChat();

  function handleMicrophoneClick() {
    if (isLoading) {
      return;
    }

    if (!isRecording) {
      startRecording();
      return;
    } else {
      stopRecording();
      return;
    }
  }

  return (
    <div className="fixed bottom-0 w-full h-full bg-slate-200 px-8 py-4 flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <p className="m-0 text-2xl text-highlight font-semibold">Chat</p>
        <button onClick={onClose}>
          <X />
        </button>
      </div>
      <div className="flex-grow bg-white"></div>
      <div>
        <ChatQuestionRecording />
      </div>
    </div>
  );
}

export default ChatWindow;
