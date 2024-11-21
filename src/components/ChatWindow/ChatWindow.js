import { useEffect, useState } from "react";
import { useExerciseData } from "../../Contexts/ExerciseContext";
import { X } from "lucide-react";
import ChatQuestionRecording from "../ChatQuestionRecording/ChatQuestionRecording";
import { fetchAIChatAnswer, createChatContext } from "../../services/AIChatAPI";
import ChatBubble from "../ChatBubble/ChatBubble";
import ChatWaitingIndicator from "../ChatWaitingIndicator/ChatWaitingIndicator";

function ChatWindow({ onClose }) {
  const [chat, setChat] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const { exercise, currentQuestion } = useExerciseData();

  useEffect(function () {
    async function createChat() {
      const data = await createChatContext();
      console.log(data);
    }
    createChat();
  }, []);

  async function handleSend(user_input) {
    setIsSending(true);
    setChat((chat) => [...chat, { sent: "user", message: user_input }]);
    try {
      const prompt = {
        exercise_details: {
          prompts: currentQuestion.prompts,
          exercise_name: exercise.exercise_name,
          data: currentQuestion.data,
          question_type: currentQuestion.question_type,
          description: exercise.description,
        },
        sight_words: exercise.sight_words,
        user_request: user_input,
      };

      const data = await fetchAIChatAnswer(prompt);
      setChat((chat) => [...chat, { sent: "bot", message: data.response }]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="fixed inset-0 md: bg-slate-200 px-4 py-4 flex flex-col justify-between">
      <div className="flex justify-between items-center py-4 px-2">
        <p className="m-0 text-hightlight text-lg font-semibold">
          {exercise.exercise_name}
        </p>
        <button className="" onClick={onClose}>
          <X />
        </button>
      </div>
      <div className="flex-grow bg-white flex flex-col gap-3 py-4 px-3 overflow-y-auto">
        {chat.map((message, i) => (
          <ChatBubble message={message} key={i} />
        ))}
        {isSending && <ChatWaitingIndicator />}
      </div>
      <div>
        <ChatQuestionRecording disabled={isSending} onSend={handleSend} />
      </div>
    </div>
  );
}

export default ChatWindow;
