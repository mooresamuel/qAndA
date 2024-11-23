import { useEffect, useState } from "react";
import ChatWaitingIndicator from "../ChatWaitingIndicator/ChatWaitingIndicator";
import { useExerciseData } from "../../Contexts/ExerciseContext";
import { fetchAIEndQuestion } from "../../services/AIChatAPI";
import { useNavigate } from "react-router-dom";
import QuestionBasicComprehension from "../QuestionBasicComprehension/QuestionBasicComprehension";

function ExerciseFinished() {
  const { wordsMistaken } = useExerciseData();
  const [noErrors, setNoErrors] = useState(false);
  const [isSending, setIsSending] = useState(true);
  const [question, setQuestion] = useState([]);
  const navigate = useNavigate();

  useEffect(function () {
    async function fetch() {
      console.log(wordsMistaken);
      const arr = Array.from(wordsMistaken.current);
      console.log(arr);
      if (arr.length === 0) {
        setNoErrors(false);
        navigate("/");
        return;
      }
      const data = await fetchAIEndQuestion({ hard_words: arr });
      setQuestion(data);
      setIsSending(false);
    }
    fetch();
  }, []);

  console.log(question);

  return (
    <div>
      {question.length !== 0 && (
        <QuestionBasicComprehension question={question} />
      )}
      {isSending && <ChatWaitingIndicator />}
    </div>
  );
}

export default ExerciseFinished;
