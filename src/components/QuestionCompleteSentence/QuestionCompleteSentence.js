import { useEffect, useState } from "react";
import { useExerciseData } from "../../Contexts/ExerciseContext";
import TextToSpeech from "../TextToSpeech/TextToSpeech";
import NextButtonRight from "../NextButtonRight/NextButtonRight";
import ProgressBar from "../ProgressBar/ProgressBar";

function QuestionCompleteSentence({ question }) {
  const { handleNextQuestion, handleAddMistake } = useExerciseData();

  const [answers, setAnswers] = useState(
    Array.from(question.answers, () => false)
  );
  const [correct, setCorrect] = useState(false);
  const splitSentence = question.prompts[0].split("%");
  const correctSentence = question.prompts[0]
    .replaceAll("%//", "")
    .replaceAll("//%", "");

  let currentIndex = 0;

  function handleAnswerPicked(answer) {
    let indexPlaced = false;
    setAnswers((current) =>
      [...current].map((el, i) => {
        if (indexPlaced) return el;
        if (el === false) {
          indexPlaced = `${i}`;
          return answer;
        } else {
          return el;
        }
      })
    );
    if (question.answers[+indexPlaced] !== answer) {
      console.log("insideFlow");
      handleAddMistake({
        mistake: `word ${answer} placed in gap ${+indexPlaced + 1}`,
      });
    }
  }

  function removeAnswer(index) {
    setAnswers((current) =>
      [...current].map((el, i) => (i === index ? false : el))
    );
  }

  useEffect(() => {
    if (answers.length > 0) {
      if (
        [...question.answers].sort().toString() ===
        [...answers].sort().toString()
      ) {
        setCorrect(true);
      } else {
        setCorrect(false);
      }
    }
  }, [answers]);

  return (
    <div className="flex flex-col h-full justify-between items-center">
      <ProgressBar />
      <div className="space-y-16">
        <div className="flex items-center gap-3 text-lg px-3 py-5 bg-gray-100">
          <TextToSpeech sentence={correctSentence} />
          <p className="m-0 align-middle text-hightlight">
            {splitSentence.map((chunk, i) => {
              if (chunk.startsWith("//") && chunk.endsWith("//")) {
                let index = currentIndex; // prevent index to be incremented when onClick is called
                currentIndex++;
                return (
                  <button
                    key={i}
                    className="w-20 border-2 h-16 border-hightlight shadow-md rounded-md align-middle"
                    onClick={() => removeAnswer(index)}
                  >
                    {answers[index]}
                  </button>
                );
              } else {
                return (
                  <span key={i} className="align-middle">
                    {chunk}
                  </span>
                );
              }
            })}
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          {question.data.map((option, i) => (
            <button
              onClick={() => handleAnswerPicked(option)}
              className="flex items-center gap-3"
            >
              <TextToSpeech key={i} sentence={option} />
              <p className="text-hightlight font-semibold m-0 px-2 py-3 rounded-md shadow-md h-full">
                {option}
              </p>
            </button>
          ))}
        </div>
      </div>
      <NextButtonRight
        isEnabled={correct}
        className={"mt-28"}
        onClick={handleNextQuestion}
      />
    </div>
  );
}

export default QuestionCompleteSentence;
