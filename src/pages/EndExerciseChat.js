import { useEffect, useState } from "react";
import {
  createChatContext,
  fetchAIEndExerciseAnswers,
} from "../services/AIChatAPI";
import FullPageSpinner from "../components/FullPageSpinner/FullPageSpinner";
import { useExerciseData } from "../Contexts/ExerciseContext";
import ChatQuestionRecording from "../components/ChatQuestionRecording/ChatQuestionRecording";
import ChatBubble from "../components/ChatBubble/ChatBubble";
import ChatWaitingIndicator from "../components/ChatWaitingIndicator/ChatWaitingIndicator";
import AcceptGeneratedExercises from "../components/AcceptGeneratedExercises/AcceptGeneratedExercises";
import SpokenText from "../components/SpokenText/SpokenText";
import { useNavigate } from "react-router-dom";

function EndExerciseChat() {
  const navigate = useNavigate();
  const { mistakes, handleUseGeneratedQuestions } = useExerciseData();
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [displayAcceptQuestions, setDisplayAcceptQuestions] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState(null);

  useEffect(
    function () {
      async function fetch() {
        if (chat.length !== 0) return;
        await createChatContext();
        const data = await fetchAIEndExerciseAnswers({
          exercise_details: mistakes,
          message: "Please evaluate this exercise",
        });

        console.log(data);
        setChat((current) => [
          ...current,
          { sent: "bot", message: data.response },
        ]);
        if (data.includes_questions) {
          setDisplayAcceptQuestions(true);
          console.log("data.question", data.question);
          setGeneratedQuestions(data.question);
        } else {
          setDisplayAcceptQuestions(false);
          setGeneratedQuestions(data.question);
        }
        setIsLoading(false);
      }
      fetch();
    },
    [chat]
  );

  if (isLoading) return <FullPageSpinner />;

  return (
    <div className="flex flex-col justify-between h-full py-4">
      <div>
        <SpokenText
          containerClass={"items-center text-3xl"}
          text={"Review your performance"}
        />
      </div>
      <div className="flex-grow bg-white flex flex-col gap-3 py-4 px-3 overflow-y-auto">
        {chat.map((message, i) => (
          <ChatBubble message={message} key={i} />
        ))}

        {isSending && <ChatWaitingIndicator />}
      </div>
      <div className="pb-4">
        {displayAcceptQuestions ? (
          <AcceptGeneratedExercises
            onAccept={() => handleUseGeneratedQuestions(generatedQuestions)}
            onChatbot={() => setDisplayAcceptQuestions(false)}
          />
        ) : (
          <div className="flex flex-col gap-2">
            <ChatQuestionRecording />
            <div className=" flex gap-3 justify-center">
              <button
                onClick={() => navigate("/")}
                className="border-1 rounded-md text-hightlight font-semibold border-hightlight px-4 py-2 w-fit hover:text-white hover:bg-hightlight"
              >
                Leave
              </button>
              {generatedQuestions && (
                <button
                  onClick={() =>
                    handleUseGeneratedQuestions(generatedQuestions)
                  }
                  className="border-1 rounded-md bg-hightlight text-white  font-semibold border-hightlight px-4 py-2 w-fit"
                >
                  Practice more
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EndExerciseChat;
