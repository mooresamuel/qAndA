import { useState, useEffect } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import QuestionMarkSVG from "../QuestionMarkSVG/QuestionMarkSVG";
import Word from "../Word/Word";
import NextButtonRight from "../NextButtonRight/NextButtonRight";
import { useExerciseData } from "../../Contexts/ExerciseContext";

function QuestionFindingMatchingWords({ question }) {
  const [picks, setPicks] = useState([]);
  const [correct, setCorrect] = useState(false);
  const { handleNextQuestion } = useExerciseData();

  const handleClick = (word) => {
    setPicks((prevPicks) => {
      if (prevPicks.includes(word)) {
        return prevPicks.filter((w) => w !== word);
      } else {
        return [...prevPicks, word];
      }
    });
  };

  useEffect(() => {
    if (picks.length > 0) {
      if (question.answers.every((word) => picks.includes(word))) {
        setCorrect(true);
      } else {
        setCorrect(false);
      }
    }
  }, [picks]);

  return (
    <div
      style={{ backgroundColor: "#8CB036" }}
      className="h-full p-5 flex flex-col gap-14 items-center"
    >
      <div className="w-full grid grid-cols-[95%_5%] items-center gap-2 px-4">
        <ProgressBar />
        <QuestionMarkSVG />
      </div>

      <h2 className="font-bold text-center">{question.prompts[0]}</h2>

      <div className="flex flex-col gap-3 p-4 w-full items-center">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {question.data.length > 0 &&
            question.data.map((word, i) => (
              <Word
                key={i + word}
                word={word}
                sound={question.prompts[0]}
                clicked={picks.includes(word)}
                onClick={() => handleClick(word)}
              />
            ))}
        </div>
        <NextButtonRight
          isEnabled={correct}
          className={"mt-28"}
          onClick={handleNextQuestion}
        />
      </div>
    </div>
  );
}

export default QuestionFindingMatchingWords;
