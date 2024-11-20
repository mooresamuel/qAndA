import { MessageCircleQuestion } from "lucide-react";

function ChatButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 right-5 bg-black w-14 h-14 rounded-full flex justify-center items-center"
    >
      <MessageCircleQuestion color="#fff" />
    </button>
  );
}

export default ChatButton;
