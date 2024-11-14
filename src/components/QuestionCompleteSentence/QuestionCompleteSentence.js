import { useState } from "react";
import TextToSpeech from "../TextToSpeech/TextToSpeech";
import NextButton from "../NextButton/NextButton";

function QuestionCompleteSentence({ question }) {
  const [answers, setAnswers] = useState(
    Array.from(question.answers, () => false)
  );
  const splitSentence = question.prompts[0].split("%");
  const correctSentence = question.prompts[0]
    .replaceAll("%//", "")
    .replaceAll("//%", "");

  let currentIndex = 0;

  function handleAnswerPicked(answer) {
    let end = false;
    setAnswers((current) =>
      [...current].map((el) => {
        if (end) return el;
        if (el === false) {
          end = true;
          return answer;
        } else {
          return el;
        }
      })
    );
  }

  function removeAnswer(index) {
    setAnswers((current) =>
      [...current].map((el, i) => (i === index ? false : el))
    );
  }

  return (
    <div className="flex flex-col h-full justify-between items-center">
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
      <NextButton disabled={true} />
    </div>
  );
}

export default QuestionCompleteSentence;
