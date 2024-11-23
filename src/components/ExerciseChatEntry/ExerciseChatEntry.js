import { useEffect, useState } from "react";
import useTextToSpeech from "../../hooks/useTextToSpeech";
import SpokenText from "../SpokenText/SpokenText";
import NextButtonRight from "../NextButtonRight/NextButtonRight";

function ExerciseChatEntry({
  data,
  message,
  handleAddPrePlannedQuestion,
  handleAddAiQuestion,
}) {
  const [showButton, setShowButton] = useState(true);
  const { speak } = useTextToSpeech();

  function handleButtonClicked() {
    setShowButton(false);
    if (data.includes_questions) {
      handleAddAiQuestion(data.question);
    } else {
      handleAddPrePlannedQuestion();
    }
  }

  useEffect(function () {
    speak(message);
  }, []);

  return (
    <div className="py-5 space-y-4">
      <SpokenText text={message} />
      {showButton && <NextButtonRight onClick={handleButtonClicked} />}
    </div>
  );
}

export default ExerciseChatEntry;
