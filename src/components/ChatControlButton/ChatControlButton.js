function ChatControlButton({ onClick, children }) {
  return (
    <button
      className="h-14 w-14 flex items-center justify-center rounded-full bg-slate-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ChatControlButton;
