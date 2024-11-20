import QuestionCompleteSentence from "../components/QuestionCompleteSentence/QuestionCompleteSentence";
import QuestionReadSentence from "../components/QuestionReadSentence/QuestionReadSentence";
import QuestionRepeatWord from "../components/QuestionRepeatWord/QuestionRepeatWord";
import QuestionRepeatWords from "../components/QuestionRepeatWords/QuestionRepeatWords";
import QuestionFindingMatchingWords from "../components/QuestionFindingMatchingWords/QuestionFindingMatchingWords";
import QuestionVowelLength from "../components/QuestionVowelLength/QuestionVowelLength";
import QuestionBasicComprehension from "../components/QuestionBasicComprehension/QuestionBasicComprehension";
import { useExerciseData } from "../Contexts/ExerciseContext";

function ExerciseEntryPoint() {
  const { currentQuestion, isLoading } = useExerciseData();

  if (isLoading) return null;

  if (currentQuestion.question_type === "repeat_words")
    return <QuestionRepeatWords question={currentQuestion} />;

  if (currentQuestion.question_type === "repeat_word")
    return <QuestionRepeatWord question={currentQuestion} />;

  if (currentQuestion.question_type === "read_sentence")
    return <QuestionReadSentence question={currentQuestion} />;

  if (currentQuestion.question_type === "complete_sentence")
    return <QuestionCompleteSentence question={currentQuestion} />;

  if (currentQuestion.question_type === "find_matching_words")
    return <QuestionFindingMatchingWords question={currentQuestion} />;
  // currentLevel={0} totalLevel={5} should come from the "API question" to work with the ProgressBar component
  // you can name currentLevel totalLevel accordingly to the "API question"
  // Ideally currentLevel should be 0 and totalLevel the max amount stages the level contains

  if (currentQuestion.question_type === "vowel_length")
    return <QuestionVowelLength question={currentQuestion} />;

  if (currentQuestion.question_type === "basic_comprehension")
    return <QuestionBasicComprehension question={currentQuestion} />;
}

export default ExerciseEntryPoint;
