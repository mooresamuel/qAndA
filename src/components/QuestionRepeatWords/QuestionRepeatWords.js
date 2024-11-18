import { useExerciseData } from "../../Contexts/ExerciseContext";
import NextButtonRight from "../NextButtonRight/NextButtonRight";
import RepeatText from "../RepeatText/RepeatText";

function QuestionRepeatWords({ question }) {
  const { handleNextQuestion } = useExerciseData();

  return (
    <div className="mt-4 space-y-8 px-8">
      <h2 className="text-center text-4xl font-semibold">
        {question.prompts[0]}
      </h2>
      <div className="flex flex-wrap gap-3 justify-center">
        {question.data.map((el) => (
          <RepeatText key={el} text={el} />
        ))}
      </div>
      <NextButtonRight onClick={handleNextQuestion} />
    </div>
  );
}

export default QuestionRepeatWords;
