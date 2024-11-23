import { useExerciseData } from "../Contexts/ExerciseContext";
import QuestionCompleteSentence from "../components/QuestionCompleteSentence/QuestionCompleteSentence";
import QuestionReadSentence from "../components/QuestionReadSentence/QuestionReadSentence";
import QuestionRepeatWord from "../components/QuestionRepeatWord/QuestionRepeatWord";
import QuestionRepeatWords from "../components/QuestionRepeatWords/QuestionRepeatWords";
import QuestionFindingMatchingWords from "../components/QuestionFindingMatchingWords/QuestionFindingMatchingWords";
import QuestionVowelLength from "../components/QuestionVowelLength/QuestionVowelLength";
// import QuestionBasicComprehension from "../components/QuestionBasicComprehension/QuestionBasicComprehension";
import QuestionCompleteWordLetters from "../components/QuestionCompleteWordLetters/QuestionCompleteWordLetters";
import QuestionFindWord from "../components/QuestionFindWord/QuestionFindWord";
import Chat from "../components/Chat/Chat";

function ExerciseEntryPoint({ onComplete, question }) {
  return (
    <>
      {question.question_type === "find_word" && (
        <QuestionFindWord onComplete={onComplete} question={question} />
      )}
      {question.question_type === "repeat_words" && (
        <QuestionRepeatWords onComplete={onComplete} question={question} />
      )}
      {question.question_type === "repeat_word" && (
        <QuestionRepeatWord onComplete={onComplete} question={question} />
      )}
      {question.question_type === "repeat_sentence" && (
        <QuestionReadSentence onComplete={onComplete} question={question} />
      )}
      {question.question_type === "complete_sentence" && (
        <QuestionCompleteSentence onComplete={onComplete} question={question} />
      )}
      {question.question_type === "find_matching_words" && (
        <QuestionFindingMatchingWords
          onComplete={onComplete}
          question={question}
        />
      )}
      {question.question_type === "vowel_length" && (
        <QuestionVowelLength onComplete={onComplete} question={question} />
      )}
      {question.question_type === "complete_spelling" && (
        <QuestionCompleteWordLetters
          onComplete={onComplete}
          question={question}
        />
      )}
      {/* {question.question_type === "basic_comprehension" && (
        <QuestionBasicComprehension question={question} /> */}
      {/* )} */}
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
