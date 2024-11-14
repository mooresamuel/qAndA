import QuestionCompleteSentence from "../components/QuestionCompleteSentence/QuestionCompleteSentence";
import QuestionReadSentence from "../components/QuestionReadSentence/QuestionReadSentence";
import QuestionRepeatWord from "../components/QuestionRepeatWord/QuestionRepeatWord";
import QuestionRepeatWords from "../components/QuestionRepeatWords/QuestionRepeatWords";

const mockQuestion = {
  question_number: 1,
  question_type: "complete-sentence",
  prompts: ["I had a new %//shirt//% for my %//birthday//%"],
  data: ["birthday", "shirt"],
  answers: ["shirt", "birthday"],
};

function ExerciseEntryPoint() {
  if (mockQuestion.question_type === "repeat-words")
    return <QuestionRepeatWords question={mockQuestion} />;

  if (mockQuestion.question_type === "repeat-word")
    return <QuestionRepeatWord question={mockQuestion} />;

  if (mockQuestion.question_type === "read-sentence")
    return <QuestionReadSentence question={mockQuestion} />;

  if (mockQuestion.question_type === "complete-sentence")
    return <QuestionCompleteSentence question={mockQuestion} />;
}

export default ExerciseEntryPoint;
