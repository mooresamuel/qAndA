import { SendHorizontal } from "lucide-react";

function ChatSendButton({ onClick }) {
  return (
    <button
      className="h-14 w-14 flex items-center justify-center rounded-full bg-slate-300"
      onClick={onClick}
    >
      <SendHorizontal />
    </button>
  );
}

export default ChatSendButton;
