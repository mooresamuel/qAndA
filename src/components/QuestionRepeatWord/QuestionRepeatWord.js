import { useExerciseData } from "../../Contexts/ExerciseContext";
import NextButtonRight from "../NextButtonRight/NextButtonRight";
import ProgressBar from "../ProgressBar/ProgressBar";
import TextToSpeech from "../TextToSpeech/TextToSpeech";

function QuestionRepeatWord({ question }) {
  const { handleNextQuestion } = useExerciseData();

  

  return (
    <div className="h-full flex flex-col justify-between items-center gap-3">
      <div className="w-full py-3 space-y-5">
        <ProgressBar />

        <h2 className="text-center">{question.prompts[0]}</h2>
      </div>

      <div className="flex flex-col gap-3 w-full items-center">
        <TextToSpeech sentence={question.data[0]} label={"play sound"} />
        <NextButtonRight onClick={handleNextQuestion} />
      </div>
    </div>
  );
}

export default QuestionRepeatWord;
