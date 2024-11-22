import TextToSpeech from "../TextToSpeech/TextToSpeech";

function ChatBubble({ message }) {
  return (
    <div className="">
      <p
        className={`m-0 px-2 indent-2 py-1 rounded-lg w-fit max-w-[75%]  ${
          message.sent === "user"
            ? "justify-self-end text-slate-700 bg-slate-200"
            : "justify-self-start text-white bg-hightlight/80"
        }`}
      >
        {message.message}
        {message.sent === "bot" && (
          <div className="justify-items-end mt-3">
            <TextToSpeech sentence={message.message.replace(/<[^>]*>/g, "")} />
          </div>
        )}
      </p>
    </div>
  );
}

export default ChatBubble;
