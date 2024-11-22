import { useExerciseData } from "../../Contexts/ExerciseContext";
import NextButtonRight from "../NextButtonRight/NextButtonRight";
import ProgressBar from "../ProgressBar/ProgressBar";
import QuestionMarkSVG from "../QuestionMarkSVG/QuestionMarkSVG";
import RepeatText from "../RepeatText/RepeatText";

function QuestionRepeatWords({ question }) {
  const { handleNextQuestion } = useExerciseData();

  return (
    <div 
      style={{ backgroundColor: "#8CB036" }} 
      className="pt-4 pb-1 space-y-8 px-8 h-full"
    >
      <div className="w-full grid grid-cols-[95%_5%] items-center gap-2">
        <ProgressBar />
        <QuestionMarkSVG />
      </div>

      <h2 className="text-center text-4xl font-semibold">
        {question.prompts[0]}
      </h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {question.data.map((el) => (
          <RepeatText key={el} text={el} />
        ))}
      </div>
      <NextButtonRight onClick={handleNextQuestion} />
    </div>
  );
}

export default QuestionRepeatWords;
