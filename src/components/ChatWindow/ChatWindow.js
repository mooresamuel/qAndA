import { useState } from "react";
import { useExerciseData } from "../../Contexts/ExerciseContext";
import { X } from "lucide-react";
import ChatQuestionRecording from "../ChatQuestionRecording/ChatQuestionRecording";
import { fetchAIChatAnswer } from "../../services/AIChatAPI";

function ChatWindow({ onClose }) {
  const [isSending, setIsSending] = useState(false);
  const { exercise, currentQuestion } = useExerciseData();
  console.log(exercise);

  async function handleSend(user_input) {
    setIsSending(true);
    try {
      const prompt = {
        exercise_details: {
          exercise_name: exercise.exercise_name,
          data: currentQuestion.data,
          question_type: currentQuestion.question_type,
          description: exercise.description,
        },
        sight_words: exercise.sight_words,
        user_request: user_input,
      };

      const data = await fetchAIChatAnswer(prompt);
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSending(false);
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
        <ChatQuestionRecording disabled={isSending} onSend={handleSend} />
      </div>
    </div>
  );
}

export default ChatWindow;
