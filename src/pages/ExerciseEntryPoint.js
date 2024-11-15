import { useAPIData } from "../Contexts/APIContext";
import QuestionCompleteSentence from "../components/QuestionCompleteSentence/QuestionCompleteSentence";
import QuestionReadSentence from "../components/QuestionReadSentence/QuestionReadSentence";
import QuestionRepeatWord from "../components/QuestionRepeatWord/QuestionRepeatWord";
import QuestionRepeatWords from "../components/QuestionRepeatWords/QuestionRepeatWords";
import QuestionFindingMatchingWords from "../components/QuestionFindingMatchingWords/QuestionFindingMatchingWords";
import QuestionVowelLength from "../components/QuestionVowelLength/QuestionVowelLength";

// const questions = {
//   question_number: 1,
//   question_type: "complete-sentence",
//   prompts: ["I had a new %//shirt//% for my %//birthday//%"],
//   data: ["birthday", "shirt"],
//   answers: ["shirt", "birthday"],
// };

function ExerciseEntryPoint() {
  const { questions, currentLevel, maxLevel } = useAPIData();

  console.log("entry piint currentlevle :", currentLevel, " now we look at maxLevel ", maxLevel);

  if (questions[currentLevel].question_type === "repeat_words")
    return <QuestionRepeatWords question={questions[currentLevel]} />;

  if (questions[currentLevel].question_type === "repeat_word")
    return <QuestionRepeatWord question={questions[currentLevel]} />;

  if (questions[currentLevel].question_type === "read_sentence")
    return <QuestionReadSentence question={questions[currentLevel]} />;

  if (questions[currentLevel].question_type === "complete_sentence")
    return <QuestionCompleteSentence question={questions[currentLevel]} />;

  if (questions[currentLevel].question_type === "find_matching_words")
    return (
      <QuestionFindingMatchingWords
        question={questions[currentLevel]}
        currentLevel={currentLevel}
        totalLevel={maxLevel}
      />
    );
  // currentLevel={currentLevel} totalLevel={maxLevel} should come from the "API question" to work with the ProgressBar component
  // you can name currentLevel totalLevel accordingly to the "API question"
  // Ideally currentLevel should be currentLevel and totalLevel the max amount stages the level contains

  if (questions[currentLevel].question_type === "vowel_length")
    return (
      <QuestionVowelLength 
        question={questions[currentLevel]}
        currentLevel={currentLevel}
        totalLevel={maxLevel}
      />
    );
}

export default ExerciseEntryPoint;
