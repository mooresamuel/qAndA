import QuestionReadSentence from "../components/QuestionReadSentence/QuestionReadSentence";
import QuestionRepeatWord from "../components/QuestionRepeatWord/QuestionRepeatWord";
import QuestionRepeatWords from "../components/QuestionRepeatWords/QuestionRepeatWords";

const mockQuestion = {
  question_number: 1,
  question_type: "read-sentence",
  prompts: ["Read the following sentence"],
  data: ["Does it help if I transfer some cash to your bank?"],
  answers: ["Does it help if I transfer some cash to your bank?"],
};

function ExerciseEntryPoint() {
  if (mockQuestion.question_type === "repeat-words")
    return <QuestionRepeatWords question={mockQuestion} />;

  if (mockQuestion.question_type === "repeat-word")
    return <QuestionRepeatWord question={mockQuestion} />;

  if (mockQuestion.question_type === "read-sentence")
    return <QuestionReadSentence question={mockQuestion} />;
}

export default ExerciseEntryPoint;
