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

function EndExerciseChat() {
  const { mistakes } = useExerciseData();
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [displayAcceptQuestions, setDisplayAcceptQuestions] = useState(false);

  useEffect(function () {
    async function fetch() {
      //   await createChatContext();
      //   const data = await fetchAIEndExerciseAnswers(mistakes);
      //   setChat((current) => [
      //     ...current,
      //     { sent: "bot", message: data.response },
      //   ]);
      // Change to real name
      //   if (data.has_questions) {
      //     setDisplayAcceptQuestions(true);
      //   } else {
      //     setDisplayAcceptQuestions(false);
      //   }
      setIsLoading(false);
    }
    fetch();
  }, []);

  function handleUseNewExercises() {
    console.log("handleUseNewExercises");
  }

  if (isLoading) return <FullPageSpinner />;

  return (
    <div className="flex flex-col justify-between h-full">
      <div></div>
      <div className="flex-grow bg-white flex flex-col gap-3 py-4 px-3 overflow-y-auto">
        {chat.map((message, i) => (
          <ChatBubble message={message} key={i} />
        ))}
        {isSending && <ChatWaitingIndicator />}
      </div>
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
