import { useEffect, useState } from "react";
import { useExerciseData } from "../Contexts/ExerciseContext";
import ExerciseExplain from "../components/ExerciseExplain/ExerciseExplain";
import ExerciseEntryPoint from "./ExerciseEntryPoint";
import ExerciseChatEntry from "../components/ExerciseChatEntry/ExerciseChatEntry";
import { fetchAIEndExerciseAnswers } from "../services/AIChatAPI";
import ExerciseFinished from "../components/ExerciseFinished/ExerciseFinished";
import ChatWaitingIndicator from "../components/ChatWaitingIndicator/ChatWaitingIndicator";

function NewExerciseFlow() {
  const [data, setData] = useState([{ type: "explain" }]);
  const [chat, setChat] = useState([
    { role: "user", content: "evaluate the exercise" },
    {
      role: "assistant",
      content: `
        <evaluation>Great effort! I see you struggled with the words "pay" and "train". This shows good attention to getting the pronunciation just right. While you read through the remaining words smoothly, I'd be happy to provide some additional practice with similar 'ay' and 'ai' words if you'd like to strengthen those patterns even further. Would you like to try practice a few more similar words?</evaluation><add_words>day, play, stay, way, say</add_words>`,
    },
    { role: "user", content: "evaluate the exercise" },
    {
      role: "assistant",
      content: `I see you got all the questions right, great job!`,
    },
  ]);
  const {
    questionIndex,
    exercise,
    isLoading,
    mistakes,
    handleMoveToNextQuestion,
    resetMistakes,
    getMistakesCurrentQuestion,
    currentQuestion,
  } = useExerciseData();

  //   useEffect(
  //     function () {
  //       setInterval(function () {
  //         window.scrollTo(0, document.body.scrollHeight);
  //       }, 200);
  //     },
  //     [data]
  //   );

  const [isSending, setIsSending] = useState();

  const handleQuestionCompleted = async () => {
    setIsSending(true);
    try {
      const prompt = {
        exercise_details: getMistakesCurrentQuestion(),
      };

      const data = await fetchAIEndExerciseAnswers({
        chat: [...chat, { role: "user", content: prompt }],
        ...prompt,
      });
      setChat((curr) => [...curr, prompt]);
      setChat((curr) => [...curr, data]);
      setData((chat) => [
        ...chat,
        { type: "chat", message: data.response, data: data },
      ]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSending(false);
    }
  };

  function handleAddAiQuestion(newQuestion) {
    resetMistakes();
    setData((data) => [...data, { type: "question", question: newQuestion }]);
  }

  function handleAddPrePlannedQuestion() {
    resetMistakes();

    if (questionIndex === exercise.questions.length - 1) {
      handleAddFinalStep();
    } else {
      const question = handleMoveToNextQuestion();
      setData((data) => [...data, { type: "question", question: question }]);
    }
  }

  function handleAddFinalStep() {
    setData((data) => [...data, { type: "final" }]);
  }

  if (isLoading) return null;

  return (
    <div className="bg-slate-50">
      {data.map((el, i) => {
        if (el.type === "explain")
          return <ExerciseExplain key={i} setData={setData} />;
        if (el.type === "question")
          return (
            <ExerciseEntryPoint
              onComplete={handleQuestionCompleted}
              question={el.question}
              key={i}
            />
          );
        if (el.type === "chat")
          return (
            <ExerciseChatEntry
              data={el.data}
              handleAddAiQuestion={handleAddAiQuestion}
              handleAddPrePlannedQuestion={handleAddPrePlannedQuestion}
              key={i}
              message={el.message}
            />
          );

        if (el.type === "final") return <ExerciseFinished key={i} />;
        return null;
      })}
      <div className="flex justify-center my-4 scale-125">
        {isSending && <ChatWaitingIndicator />}
      </div>
    </div>
  );
}

export default NewExerciseFlow;
