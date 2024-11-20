import { useState } from "react";
import ChatButton from "../ChatButton/ChatButton";
import ChatWindow from "../ChatWindow/ChatWindow";

function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <ChatButton onClick={() => setIsOpen(true)} />
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
    </div>
  );
}

export default Chat;
