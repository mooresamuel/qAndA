import { Mic, X } from "lucide-react";

function ChatWindow({ onClose }) {
  console.log("ChatWindow open");
  return (
    <div className="fixed bottom-0 w-full h-full bg-slate-200 px-8 py-4 flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <p className="m-0 text-2xl text-highlight font-semibold">Chat</p>
        <button onClick={onClose}>
          <X />
        </button>
      </div>
      <div className="flex-grow bg-white"></div>
      <div className="h-24 flex justify-center">
        <button className="h-14 w-14 flex items-center justify-center bg-slate-300 rounded-full">
          <Mic />
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
