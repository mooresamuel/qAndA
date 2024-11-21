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

function EndExerciseChat() {
  const { mistakes } = useExerciseData();
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [displayAcceptQuestions, setDisplayAcceptQuestions] = useState(false);

  console.log(mistakes);

  useEffect(function () {
    async function fetch() {
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
      } else {
        setDisplayAcceptQuestions(false);
      }
      setIsLoading(false);
    }
    fetch();
  }, []);

  function handleUseNewExercises() {
    console.log("handleUseNewExercises");
  }

  console.log(chat);

  if (isLoading) return <FullPageSpinner />;

  return (
    <div className="flex flex-col justify-between h-full py-4">
      <div>
        <SpokenText
          containerClass={"items-center text-3xl"}
          text={"Review your performance"}
        />
      </div>
      {/* <div className="flex-grow bg-white flex flex-col gap-3 py-4 px-3 overflow-y-auto">
        {chat.map((message, i) => (
          <ChatBubble message={message} key={i} />
        ))}
        {isSending && <ChatWaitingIndicator />}
      </div> */}
      <div className="pb-4">
        {displayAcceptQuestions ? (
          <AcceptGeneratedExercises onAccept={handleUseNewExercises} />
        ) : (
          <ChatQuestionRecording />
        )}
      </div>
    </div>
  );
}

export default EndExerciseChat;
