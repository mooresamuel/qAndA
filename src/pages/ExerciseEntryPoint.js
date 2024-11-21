import { useExerciseData } from "../Contexts/ExerciseContext";
import QuestionCompleteSentence from "../components/QuestionCompleteSentence/QuestionCompleteSentence";
import QuestionReadSentence from "../components/QuestionReadSentence/QuestionReadSentence";
import QuestionRepeatWord from "../components/QuestionRepeatWord/QuestionRepeatWord";
import QuestionRepeatWords from "../components/QuestionRepeatWords/QuestionRepeatWords";
import QuestionFindingMatchingWords from "../components/QuestionFindingMatchingWords/QuestionFindingMatchingWords";
import QuestionVowelLength from "../components/QuestionVowelLength/QuestionVowelLength";
import QuestionBasicComprehension from "../components/QuestionBasicComprehension/QuestionBasicComprehension";
import QuestionCompleteWordLetters from "../components/QuestionCompleteWordLetters/QuestionCompleteWordLetters";
import QuestionFindWord from "../components/QuestionFindWord/QuestionFindWord";
import Chat from "../components/Chat/Chat";

function ExerciseEntryPoint() {
  const { currentQuestion, isLoading } = useExerciseData();

  if (isLoading) return null;

  return (
    <>
      {currentQuestion.question_type === "find_word" && (
        <QuestionFindWord question={currentQuestion} />
      )}
      {currentQuestion.question_type === "repeat_words" && (
        <QuestionRepeatWords question={currentQuestion} />
      )}
      {currentQuestion.question_type === "repeat_word" && (
        <QuestionRepeatWord question={currentQuestion} />
      )}
      {currentQuestion.question_type === "repeat_sentence" && (
        <QuestionReadSentence question={currentQuestion} />
      )}
      {currentQuestion.question_type === "complete_sentence" && (
        <QuestionCompleteSentence question={currentQuestion} />
      )}
      {currentQuestion.question_type === "find_matching_words" && (
        <QuestionFindingMatchingWords question={currentQuestion} />
      )}
      {currentQuestion.question_type === "vowel_length" && (
        <QuestionVowelLength question={currentQuestion} />
      )}
      {currentQuestion.question_type === "complete_spelling" && (
        <QuestionCompleteWordLetters question={currentQuestion} />
      )}
      {currentQuestion.question_type === "basic_comprehension" && (
        <QuestionBasicComprehension question={currentQuestion} />
      )}
      <Chat />
    </>
  );

  // if (currentQuestion.question_type === "find_matching_words")
  //   return <QuestionFindingMatchingWords question={currentQuestion} />;

  // if (currentQuestion.question_type === "vowel_length")
  //   return <QuestionVowelLength question={currentQuestion} />;

  // if (currentQuestion.question_type === "basic_comprehension")
  //   return <QuestionBasicComprehension question={currentQuestion} />;

  // if (currentQuestion.question_type === "complete_spelling")
  //   return <QuestionCompleteWordLetters question={currentQuestion} />;
}

export default ExerciseEntryPoint;
