import { useEffect, useState } from "react";
import { useExerciseData } from "../../Contexts/ExerciseContext";
import useTextToSpeech from "../../hooks/useTextToSpeech";
import NextButtonRight from "../NextButtonRight/NextButtonRight";
import ProgressBar from "../ProgressBar/ProgressBar";
import QuestionMarkSVG from "../QuestionMarkSVG/QuestionMarkSVG";
import RepeatText from "../RepeatText/RepeatText";

function QuestionRepeatWords({ question, onComplete }) {
  const { speak } = useTextToSpeech();
  const { handleNextQuestion } = useExerciseData();
  const [showButton, setShowButton] = useState(true);

  function handleNext() {
    setShowButton(false);
    onComplete();
  }

  useEffect(function () {
    speak("Please try reading the following words");
  }, []);

  return (
    <div className="pt-4 pb-1 space-y-8 px-8 h-full">
      <h2 className="text-center text-4xl font-semibold">
        {question.prompts[0]}
      </h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {question.data.map((el) => (
          <RepeatText key={el} text={el} />
        ))}
      </div>
      {showButton && <NextButtonRight onClick={handleNext} />}
    </div>
  );
}

export default QuestionRepeatWords;
