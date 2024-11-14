import QuestionReadSentence from "../components/QuestionReadSentence/QuestionReadSentence";
import QuestionRepeatWord from "../components/QuestionRepeatWord/QuestionRepeatWord";
import QuestionRepeatWords from "../components/QuestionRepeatWords/QuestionRepeatWords";
import QuestionFindingMatchingWords from "../components/QuestionFindingMatchingWords/QuestionFindingMatchingWords";

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

  if (mockQuestion.question_type === "find-matching-words")
    return <QuestionFindingMatchingWords question={mockQuestion} currentLevel={0} totalLevel={5} />;
  // currentLevel={0} totalLevel={5} should come from the "API question" to work with the ProgressBar component
  // you can name currentLevel totalLevel accordingly to the "API question"
  // Ideally currentLevel should be 0 and totalLevel the max amount stages the level contains
}

export default ExerciseEntryPoint;
