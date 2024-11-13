import QuestionRepeatWord from "../components/QuestionRepeatWord/QuestionRepeatWord";
import QuestionRepeatWords from "../components/QuestionRepeatWords/QuestionRepeatWords";

const mockQuestion = {
  question_number: 1,
  question_type: "repeat-word",
  prompts: ["letter"],
  data: ["letter"],
  answers: ["letter"],
};

function ExerciseEntryPoint() {
  if (mockQuestion.question_type === "repeat-words")
    return <QuestionRepeatWords question={mockQuestion} />;

  if (mockQuestion.question_type === "repeat-word")
    return <QuestionRepeatWord question={mockQuestion} />;
}

export default ExerciseEntryPoint;
