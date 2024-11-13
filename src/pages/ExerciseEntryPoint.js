import QuestionRepeatWord from "../components/QuestionRepeatWord/QuestionRepeatWord";

const mockQuestion = {
  question_number: 1,
  question_type: "repeat-word",
  prompts: ["ai, ay"],
  data: ["pay", "train", "wait", "tray", "gay", "chain", "tail"],
  answers: ["pay", "train", "wait", "tray", "gay", "chain", "tail"],
};

function ExerciseEntryPoint() {
  if (mockQuestion.question_type === "repeat-word")
    return <QuestionRepeatWord question={mockQuestion} />;

  if (mockQuestion.question_type === "read-sentence") {
    // return QuestionReadSentence question={mockQuestion} />;
  }
}

export default ExerciseEntryPoint;
